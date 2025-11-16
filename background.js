// Background service worker - Manages workflow and queue

let workflowState = {
  isRunning: false,
  isPaused: false,
  prompts: [],
  type: null, // 'image' or 'video'
  settings: null,
  currentIndex: 0,
  currentRepeat: 0,
  totalTasks: 0,
  completedTasks: 0,
  successfulTasks: 0, // Track tasks that actually created media
  queue: []
};

// Message handler
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'start') {
    handleStart(message);
    sendResponse({ success: true });
  } else if (message.action === 'pause') {
    handlePause();
    sendResponse({ success: true });
  } else if (message.action === 'resume') {
    handleResume();
    sendResponse({ success: true });
  } else if (message.action === 'stop') {
    handleStop();
    sendResponse({ success: true });
  } else if (message.action === 'promptCompleted') {
    handlePromptCompleted(message.mediaFound || false);
    sendResponse({ success: true });
  } else if (message.action === 'updateProgress') {
    workflowState.completedTasks = message.completed || workflowState.completedTasks;
    notifyPopup('updateProgress', { completed: workflowState.completedTasks });
    sendResponse({ success: true });
  } else if (message.action === 'getState') {
    // Return current workflow state
    sendResponse({
      success: true,
      state: {
        isRunning: workflowState.isRunning,
        isPaused: workflowState.isPaused,
        prompts: workflowState.prompts,
        type: workflowState.type,
        completedTasks: workflowState.completedTasks,
        totalTasks: workflowState.totalTasks,
        currentIndex: workflowState.currentIndex
      }
    });
  }
  
  return true; // Keep channel open for async response
});

function handleStart(message) {
  workflowState.isRunning = true;
  workflowState.isPaused = false;
  workflowState.prompts = message.prompts || [];
  workflowState.type = message.type;
  workflowState.settings = message.settings || {};
  workflowState.currentIndex = Math.max(0, (workflowState.settings.startIndex || 1) - 1);
  workflowState.currentRepeat = 0;
  workflowState.completedTasks = 0;
  workflowState.successfulTasks = 0; // Reset successful tasks counter
  
  // Calculate total tasks
  const promptsToProcess = workflowState.prompts.slice(workflowState.currentIndex);
  const repeatCount = workflowState.settings.repeatCount || 1;
  workflowState.totalTasks = promptsToProcess.length * repeatCount;
  
  // Build queue
  buildQueue();
  
  // Start processing
  processNext();
}

function buildQueue() {
  workflowState.queue = [];
  const startIndex = workflowState.currentIndex;
  const repeatCount = workflowState.settings.repeatCount || 1;
  
  for (let i = startIndex; i < workflowState.prompts.length; i++) {
    for (let r = 0; r < repeatCount; r++) {
      workflowState.queue.push({
        promptIndex: i,
        prompt: workflowState.prompts[i],
        repeatIndex: r
      });
    }
  }
}

function handlePause() {
  workflowState.isPaused = true;
  notifyPopup('log', { type: 'warning', message: 'Đã tạm dừng' });
}

function handleResume() {
  workflowState.isPaused = false;
  notifyPopup('log', { type: 'info', message: 'Đã tiếp tục' });
  processNext();
}

function handleStop() {
  workflowState.isRunning = false;
  workflowState.isPaused = false;
  workflowState.queue = [];
  notifyPopup('log', { type: 'warning', message: 'Đã dừng' });
}

function handlePromptCompleted(mediaFound = false) {
  workflowState.completedTasks++;
  if (mediaFound) {
    workflowState.successfulTasks++;
  }
  notifyPopup('updateProgress', { completed: workflowState.completedTasks });
  
  // Check if all tasks are completed
  if (workflowState.completedTasks >= workflowState.totalTasks) {
    workflowState.isRunning = false;
    if (workflowState.successfulTasks > 0) {
      notifyPopup('log', { type: 'success', message: `✓ Hoàn thành tất cả! (${workflowState.successfulTasks}/${workflowState.totalTasks} có media)` });
    } else {
      notifyPopup('log', { type: 'error', message: '⚠ Hoàn thành nhưng không có media nào được tạo!' });
    }
    notifyPopup('status', { type: workflowState.successfulTasks > 0 ? 'success' : 'error', message: `Đã hoàn thành: ${workflowState.successfulTasks}/${workflowState.totalTasks} có media` });
  } else {
    processNext();
  }
}

async function processNext() {
  if (!workflowState.isRunning || workflowState.isPaused) {
    return;
  }
  
  if (workflowState.queue.length === 0) {
    // All done
    workflowState.isRunning = false;
    notifyPopup('log', { type: 'success', message: 'Hoàn thành tất cả!' });
    notifyPopup('status', { type: 'success', message: 'Đã hoàn thành tất cả prompts' });
    return;
  }
  
  const task = workflowState.queue.shift();
  const promptIndex = task.promptIndex;
  const isFirstPrompt = promptIndex === workflowState.currentIndex && task.repeatIndex === 0;
  const isEarlyStage = promptIndex < workflowState.currentIndex + 5;
  
  // Calculate delay based on stage
  let delay = 0;
  if (isFirstPrompt) {
    // Stage 1: Send immediately
    delay = 0;
  } else if (isEarlyStage) {
    // Stage 2: Random delay 90-120s
    const min = workflowState.settings.delayMin || 90;
    const max = workflowState.settings.delayMax || 120;
    delay = getRandomDelay(min, max);
  } else {
    // Stage 3: Monitor queue + random delay
    // Check if there are items in queue on the website
    const min = workflowState.settings.delayMin || 90;
    const max = workflowState.settings.delayMax || 120;
    delay = getRandomDelay(min, max);
  }
  
  if (delay > 0) {
    notifyPopup('log', { 
      type: 'info', 
      message: `Chờ ${Math.round(delay / 1000)}s trước khi gửi prompt tiếp theo...` 
    });
    await sleep(delay);
  }
  
  // Check if still running and not paused
  if (!workflowState.isRunning || workflowState.isPaused) {
    return;
  }
  
  // Helper function to check if URL is Google Flow/Veo3
  function isFlowUrl(url) {
    if (!url) return false;
    const urlLower = url.toLowerCase();
    // Check for flow.google.com
    if (urlLower.includes('flow.google.com')) return true;
    // Check for labs.google with /flow/ or /fx/vi/tools/flow/
    if (urlLower.includes('labs.google') && (urlLower.includes('/flow/') || urlLower.includes('/fx/') || urlLower.includes('/tools/flow'))) return true;
    // Check for any google.com with flow in path
    if (urlLower.includes('google.com') && urlLower.includes('/flow')) return true;
    return false;
  }
  
  // Find Google Flow/Veo3 tab
  let tab = null;
  
  // Strategy 1: Check active tab first
  let activeTabs = await chrome.tabs.query({ active: true, currentWindow: true });
  if (activeTabs.length > 0 && isFlowUrl(activeTabs[0].url)) {
    tab = activeTabs[0];
    logToPopup('info', 'Đã tìm thấy tab Google Flow/Veo3 (active tab)');
  } else {
    // Strategy 2: Search all tabs in current window
    let allTabs = await chrome.tabs.query({ currentWindow: true });
    for (const t of allTabs) {
      if (isFlowUrl(t.url)) {
        tab = t;
        logToPopup('info', 'Đã tìm thấy tab Google Flow/Veo3 trong cửa sổ hiện tại');
        break;
      }
    }
    
    // Strategy 3: Search all tabs in all windows
    if (!tab) {
      allTabs = await chrome.tabs.query({});
      for (const t of allTabs) {
        if (isFlowUrl(t.url)) {
          tab = t;
          logToPopup('info', 'Đã tìm thấy tab Google Flow/Veo3 trong tất cả cửa sổ');
          break;
        }
      }
    }
    
    // If found a tab but it's not active, activate it
    if (tab && !tab.active) {
      try {
        await chrome.tabs.update(tab.id, { active: true });
        if (tab.windowId) {
          await chrome.windows.update(tab.windowId, { focused: true });
        }
        logToPopup('info', 'Đã chuyển sang tab Google Flow/Veo3');
        await sleep(1500); // Wait for tab to activate and load
      } catch (e) {
        logToPopup('warning', `Không thể chuyển sang tab: ${e.message}`);
      }
    }
  }
  
  if (!tab) {
    notifyPopup('log', { 
      type: 'error', 
      message: 'Không tìm thấy tab Google Flow/Veo3. Vui lòng mở trang https://flow.google.com và thử lại' 
    });
    workflowState.isRunning = false;
    notifyPopup('status', { type: 'error', message: 'Đã dừng: Không tìm thấy tab Google Flow/Veo3' });
    return;
  }
  
  if (!tab.url || !isFlowUrl(tab.url)) {
    notifyPopup('log', { 
      type: 'error', 
      message: `Tab không phải là Google Flow/Veo3. URL: ${tab.url ? tab.url.substring(0, 50) : 'unknown'}` 
    });
    return;
  }
  
  logToPopup('info', `Đang gửi prompt đến tab: ${tab.url.substring(0, 50)}...`);
  
  // Try to inject content script if needed and verify it's ready
  let contentScriptReady = false;
  let needsInjection = false;
  
  // First, try to ping content script to check if it's loaded
  try {
    const pingResponse = await chrome.tabs.sendMessage(tab.id, { action: 'ping' });
    if (pingResponse && pingResponse.loaded) {
      contentScriptReady = true;
      logToPopup('info', 'Content script đã được load sẵn');
    }
  } catch (error) {
    // Content script might not be loaded
    if (error.message && error.message.includes('Could not establish connection')) {
      needsInjection = true;
      logToPopup('info', 'Content script chưa được load, đang inject...');
    } else {
      logToPopup('warning', `Lỗi khi ping content script: ${error.message}`);
      needsInjection = true;
    }
  }
  
  // Inject if needed
  if (needsInjection) {
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['utils.js', 'content.js']
      });
      logToPopup('success', 'Đã inject content script');
      
      // Wait minimal time for script to initialize
      await sleep(300);
      
      // Verify content script is ready by pinging (minimal retries)
      let verified = false;
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const verifyResponse = await chrome.tabs.sendMessage(tab.id, { action: 'ping' });
          if (verifyResponse && verifyResponse.loaded) {
            verified = true;
            contentScriptReady = true;
            logToPopup('success', `Đã verify content script sẵn sàng (lần ${attempt + 1})`);
            break;
          }
        } catch (e) {
          if (attempt < 2) {
            logToPopup('info', `Đang chờ content script... (lần ${attempt + 1}/3)`);
            await sleep(200); // Minimal wait between retries
          }
        }
      }
      
      if (!verified) {
        logToPopup('error', 'Không thể verify content script sau khi inject');
        notifyPopup('log', { 
          type: 'error', 
          message: 'Content script đã được inject nhưng chưa sẵn sàng. Vui lòng refresh trang Google Flow/Veo3' 
        });
        setTimeout(() => {
          if (workflowState.isRunning && !workflowState.isPaused) {
            processNext();
          }
        }, 5000);
        return;
      }
    } catch (injectError) {
      logToPopup('error', `Không thể inject content script: ${injectError.message}`);
      notifyPopup('log', { 
        type: 'error', 
        message: 'Không thể inject content script. Vui lòng refresh trang Google Flow/Veo3' 
      });
      setTimeout(() => {
        if (workflowState.isRunning && !workflowState.isPaused) {
          processNext();
        }
      }, 5000);
      return;
    }
  }
  
  // Only send message if content script is ready
  if (!contentScriptReady) {
    logToPopup('error', 'Content script chưa sẵn sàng, không thể gửi prompt');
    notifyPopup('log', { type: 'error', message: 'Content script chưa sẵn sàng. Vui lòng refresh trang Google Flow/Veo3' });
    setTimeout(() => {
      if (workflowState.isRunning && !workflowState.isPaused) {
        processNext();
      }
    }, 5000);
    return;
  }
  
  // Send message to content script
  try {
    await chrome.tabs.sendMessage(tab.id, {
      action: 'processPrompt',
      prompt: task.prompt,
      type: workflowState.type,
      promptIndex: promptIndex + 1,
      totalPrompts: workflowState.prompts.length
    });
    logToPopup('success', 'Đã gửi prompt đến content script');
  } catch (error) {
    notifyPopup('log', { type: 'error', message: `Lỗi khi gửi prompt: ${error.message}` });
    // Check if content script is not injected
    if (error.message && error.message.includes('Could not establish connection')) {
      notifyPopup('log', { type: 'error', message: 'Content script mất kết nối. Vui lòng refresh trang Google Flow/Veo3' });
    }
    // Retry after delay
    setTimeout(() => {
      if (workflowState.isRunning && !workflowState.isPaused) {
        processNext();
      }
    }, 5000);
  }
}

function getRandomDelay(min, max) {
  const delaySeconds = Math.floor(Math.random() * (max - min + 1)) + min;
  return delaySeconds * 1000;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function notifyPopup(action, data) {
  chrome.runtime.sendMessage({
    action: action,
    ...data
  }).catch(() => {
    // Popup might be closed, ignore error
  });
}

function logToPopup(type, message) {
  notifyPopup('log', { type: type, message: message });
}

// Listen for download completion
chrome.downloads.onChanged.addListener((downloadDelta) => {
  if (downloadDelta.state && downloadDelta.state.current === 'complete') {
    // Notify that download completed
    notifyPopup('log', { type: 'success', message: 'Đã tải về thành công' });
  }
});
