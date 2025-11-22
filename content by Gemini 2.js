// Content script - Automates actions on Google Flow/Veo3 website

let isProcessing = false;
let currentPrompt = null;
let currentType = null;
let initialMediaSrcs = new Set();

// --- MESSAGE LISTENER ---
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'ping') {
    sendResponse({ success: true, loaded: true });
  } else if (message.action === 'processPrompt') {
    handleProcessPrompt(message);
    sendResponse({ success: true });
  }
  return true;
});

// --- DEEP DOM UTILS (SHADOW ROOT SUPPORT) ---

/**
 * Recursively searches for elements across all Shadow DOMs
 */
function deepQuerySelectorAll(selector, root = document) {
  const results = Array.from(root.querySelectorAll(selector));
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.shadowRoot) {
      results.push(...deepQuerySelectorAll(selector, node.shadowRoot));
    }
  }
  return results;
}

/**
 * Finds the prompt input using deep traversal
 */
async function findPromptInputDeep() {
  // 1. Define potential selectors
  const selectors = [
    'textarea',
    'input[type="text"]',
    '[contenteditable="true"]',
    '[role="textbox"]'
  ];

  let candidates = [];

  // 2. Collect ALL candidates across Shadow DOMs
  for (const sel of selectors) {
    const found = deepQuerySelectorAll(sel);
    candidates = [...candidates, ...found];
  }

  // 3. Filter and Score candidates
  let bestInput = null;
  let maxScore = 0;

  for (const el of candidates) {
    if (!isElementVisible(el)) continue;

    let score = 0;
    const rect = el.getBoundingClientRect();
    const area = rect.width * rect.height;
    const placeholder = (el.getAttribute('placeholder') || '').toLowerCase();
    const ariaLabel = (el.getAttribute('aria-label') || '').toLowerCase();

    // Rule 1: Must be decent size (ignore tiny search icons)
    if (area < 2000) continue; 
    
    // Rule 2: Area score (Bigger is usually the main prompt)
    score += area / 1000;

    // Rule 3: Keywords boost
    if (placeholder.includes('describe') || placeholder.includes('prompt') || placeholder.includes('mô tả')) score += 1000;
    if (ariaLabel.includes('describe') || ariaLabel.includes('prompt') || ariaLabel.includes('mô tả')) score += 1000;

    // Rule 4: Position (Top half of screen usually, but not header)
    if (rect.top > 100 && rect.top < 800) score += 200;

    // Rule 5: Tag preference
    if (el.tagName === 'TEXTAREA') score += 500;
    if (el.getAttribute('contenteditable') === 'true') score += 300;

    if (score > maxScore) {
      maxScore = score;
      bestInput = el;
    }
  }

  return bestInput;
}


// --- MAIN PROCESS ---
async function handleProcessPrompt(message) {
  if (isProcessing) return;

  isProcessing = true;
  currentPrompt = message.prompt;
  currentType = message.type;

  const fullPrompt = enhancePrompt(currentPrompt, message.characterDescription, message.sceneDescription);
  
  logToPopup('info', `Xử lý: "${fullPrompt.substring(0, 20)}..."`);

  try {
    await waitForPageReady();
    
    // 1. Snapshot media
    snapshotInitialMedia();

    window.scrollTo(0, 0);
    await sleep(500);

    // 2. Find and Fill Input (Using Deep Search)
    let inputEl = await findPromptInputDeep();
    
    if (!inputEl) {
        // Retry once after scrolling down a bit
        window.scrollTo(0, 200);
        await sleep(1000);
        inputEl = await findPromptInputDeep();
    }

    if (!inputEl) throw new Error('Không tìm thấy ô nhập prompt (Deep Search failed)');

    await fillInput(inputEl, fullPrompt);
    
    await sleep(800);

    // 3. Trigger Generation
    await triggerGenerationDeep(inputEl);

    // 4. Monitor
    logToPopup('info', 'Đang chờ kết quả...');
    const result = await monitorCompletion();

    chrome.runtime.sendMessage({
      action: 'promptCompleted',
      mediaFound: result.mediaFound
    });

  } catch (error) {
    console.error('[Flow Error]', error);
    logToPopup('error', `Lỗi: ${error.message}`);
    chrome.runtime.sendMessage({ action: 'promptCompleted', mediaFound: false });
  } finally {
    isProcessing = false;
  }
}

// --- ACTIONS ---

async function fillInput(el, text) {
  logToPopup('info', `Đã tìm thấy input: ${el.tagName}`);
  
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  await sleep(300);
  el.focus();
  
  // Clear existing
  if (el.value !== undefined) el.value = '';
  el.textContent = '';

  // Type text
  // React hack: use prototype setter
  if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
      if (nativeInputValueSetter) {
          nativeInputValueSetter.call(el, text);
      } else {
          el.value = text;
      }
  } else {
      el.textContent = text;
      el.innerHTML = text; // sometimes contenteditable needs innerHTML
  }

  // Dispatch events
  el.dispatchEvent(new Event('input', { bubbles: true }));
  el.dispatchEvent(new Event('change', { bubbles: true }));
  
  // Simulate typing a space to trigger validation
  el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
  el.dispatchEvent(new KeyboardEvent('keyup', { key: ' ' }));
  
  await sleep(200);
}

async function triggerGenerationDeep(inputEl) {
    // Strategy 1: Try Enter Key on Input
    logToPopup('info', 'Thử nhấn Enter...');
    inputEl.focus();
    inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true }));
    await sleep(1000);

    if (document.querySelector('[class*="loading" i], [class*="generating" i]')) return;

    // Strategy 2: Find button near input (Deep Search)
    logToPopup('info', 'Tìm nút tạo...');
    
    // Get all buttons deep
    const allBtns = deepQuerySelectorAll('button, [role="button"]');
    let targetBtn = null;

    // Find button containing "create", "generate", "tạo" or specific icons
    for (const btn of allBtns) {
        if (!isElementVisible(btn) || btn.disabled) continue;
        
        const txt = (btn.textContent || btn.getAttribute('aria-label') || '').toLowerCase();
        
        // High confidence text
        if (txt.includes('create') || txt.includes('generate') || txt.includes('tạo')) {
             targetBtn = btn;
             break;
        }
        
        // Icon check (send icon usually)
        const innerHTML = btn.innerHTML;
        if (innerHTML.includes('path') && (innerHTML.includes('M2.01 21L23 12 2.01 3') || innerHTML.includes('send'))) {
             targetBtn = btn;
             break;
        }
    }

    if (targetBtn) {
        logToPopup('success', 'Click nút tạo');
        targetBtn.click();
    } else {
        logToPopup('warning', 'Không tìm thấy nút tạo, hy vọng Enter đã hoạt động');
    }
}


// --- MONITORING & DOWNLOADING (Reuse logic from previous stable version) ---

function snapshotInitialMedia() {
    const existing = deepQuerySelectorAll('video, img'); // Use deep query here too
    initialMediaSrcs = new Set();
    for (const m of existing) {
        const src = m.src || m.currentSrc || '';
        if (src.length > 20) initialMediaSrcs.add(src);
    }
}

async function monitorCompletion() {
  const maxWait = currentType === 'video' ? 300000 : 180000;
  const start = Date.now();
  let downloadTriggered = false;

  while (Date.now() - start < maxWait) {
    if (downloadTriggered) { await sleep(1000); continue; }

    const newMedia = findNewMediaDeep(); // Use deep search
    
    if (newMedia) {
        if (newMedia.tagName === 'VIDEO' && newMedia.readyState < 2) {
            await sleep(1000); continue;
        }
        
        logToPopup('success', 'Phát hiện media mới. Đợi 3s...');
        await sleep(3000); 
        
        downloadTriggered = true;
        newMedia.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        await triggerDownload(newMedia);
        return { mediaFound: true };
    }
    await sleep(1000);
  }
  return { mediaFound: false };
}

function findNewMediaDeep() {
    // Deep search for media
    const els = deepQuerySelectorAll('video, img, canvas');
    
    for (const el of els) {
        if (!isElementVisible(el)) continue;
        const src = el.src || el.currentSrc || '';
        
        // Filter logic
        if ((!initialMediaSrcs.has(src) || src.startsWith('blob:')) && 
            !src.includes('banner') && !src.includes('icon') && !src.includes('profile') && !src.includes('googleusercontent')) {
            
            if (currentType === 'video' && el.tagName === 'VIDEO' && el.duration > 0.1) return el;
            if (currentType === 'image' && el.tagName === 'IMG' && el.naturalWidth > 200) return el;
        }
    }
    return null;
}

async function triggerDownload(media) {
    // 1. Search for download button nearby (Traversing up parents)
    let parent = media.parentElement;
    let foundBtn = null;

    // Look up 8 levels
    for (let i = 0; i < 8 && parent; i++) {
        const btns = parent.querySelectorAll('button, a[role="button"]');
        for (const btn of btns) {
             if (!isElementVisible(btn)) continue;
             const txt = (btn.textContent || btn.getAttribute('aria-label') || '').toLowerCase();
             // Simple check
             if (txt.includes('download') || txt.includes('tải') || btn.querySelector('svg')) {
                 if (!txt.includes('share') && !txt.includes('setting')) {
                     foundBtn = btn;
                     break;
                 }
             }
        }
        if (foundBtn) break;
        parent = parent.parentElement;
    }

    if (foundBtn) {
        logToPopup('success', 'Click nút download...');
        foundBtn.click();
        if (currentType === 'video') { await sleep(1000); await selectResolution(); }
    } else {
        // Fallback API for images
        if (currentType === 'image' && media.src.startsWith('http')) {
             chrome.runtime.sendMessage({
                 action: 'downloadMedia',
                 url: media.src,
                 filename: `flow_${Date.now()}.png`,
                 promptIndex: currentPrompt
             });
        } else {
             logToPopup('warning', 'Tự tải thủ công nhé.');
        }
    }
}

async function selectResolution() {
    // Standard selector is fine here as menus usually append to body, not shadow dom
    const menus = document.querySelectorAll('[role="menu"], [role="listbox"]');
    for (const menu of menus) {
        if (!isElementVisible(menu)) continue;
        const items = menu.querySelectorAll('[role="menuitem"], li, div[role="option"]');
        let target = Array.from(items).find(i => {
            const t = (i.textContent || '').toLowerCase();
            return !t.includes('gif');
        });
        if (target) { target.click(); target.dispatchEvent(new MouseEvent('click', { bubbles: true })); }
    }
}

// --- UTILS ---

function enhancePrompt(prompt, charDesc, sceneDesc) {
    let parts = [];
    if (charDesc && charDesc.trim()) parts.push(charDesc.trim());
    if (sceneDesc && sceneDesc.trim()) parts.push(sceneDesc.trim());
    parts.push(prompt);
    return parts.join('. ');
}

function waitForPageReady() {
  return new Promise(resolve => {
    if (document.readyState === 'complete') resolve();
    else window.addEventListener('load', resolve);
  });
}

function isElementVisible(el) {
    if (!el) return false;
    const style = window.getComputedStyle(el);
    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0' && el.offsetWidth > 0;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function logToPopup(type, msg) { chrome.runtime.sendMessage({ action: 'log', type, message: msg }).catch(()=>{}); }