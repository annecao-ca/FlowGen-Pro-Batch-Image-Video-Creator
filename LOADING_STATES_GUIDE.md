# 🎯 Hướng Dẫn Loading States & User Feedback

## 📋 Tổng Quan

Hệ thống loading states và feedback giúp người dùng:
- ✅ Biết được ứng dụng đang làm gì
- ✅ Hiểu được tiến trình của các tác vụ
- ✅ Nhận được phản hồi rõ ràng khi hoàn thành hoặc lỗi
- ✅ Có trải nghiệm mượt mà, chuyên nghiệp

---

## 🎨 1. SPINNER COMPONENTS

### Các Loại Spinner

#### 1. Circular Spinner (Mặc định)
**Khi nào dùng:**
- Buttons đang loading
- Inline loading indicators
- Small loading states

**Cách dùng:**
```html
<!-- Trong button -->
<button class="btn btn-primary loading">Đang xử lý...</button>

<!-- Standalone -->
<div class="spinner"></div>
<div class="spinner spinner-sm"></div>  <!-- Nhỏ -->
<div class="spinner spinner-lg"></div>   <!-- Lớn -->
```

**CSS Animation:**
```css
@keyframes spinner-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

**Tại sao dùng:**
- ✅ Đơn giản, dễ nhận biết
- ✅ Nhẹ, không tốn tài nguyên
- ✅ Phù hợp với mọi kích cỡ

---

#### 2. Dots Spinner
**Khi nào dùng:**
- Inline text loading
- Khi cần spinner nhỏ gọn
- Loading trong text content

**Cách dùng:**
```html
<div class="spinner-dots">
  <span></span>
  <span></span>
  <span></span>
</div>
```

**CSS Animation:**
```css
@keyframes spinner-dots-bounce {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
```

**Tại sao dùng:**
- ✅ Nhỏ gọn, không chiếm nhiều không gian
- ✅ Animation mượt mà, dễ nhìn
- ✅ Phù hợp cho inline content

---

#### 3. Pulse Spinner
**Khi nào dùng:**
- Full-page loading
- Large loading states
- Khi cần nhấn mạnh loading state

**Cách dùng:**
```html
<div class="spinner-pulse"></div>
```

**CSS Animation:**
```css
@keyframes spinner-pulse {
  0%, 100% {
    transform: scale(0.8);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.5;
  }
}
```

**Tại sao dùng:**
- ✅ Thu hút sự chú ý
- ✅ Phù hợp cho loading lớn
- ✅ Tạo cảm giác "đang hoạt động"

---

#### 4. Bars Spinner
**Khi nào dùng:**
- Progress indicators
- Audio/video loading
- Khi cần hiển thị nhiều trạng thái

**Cách dùng:**
```html
<div class="spinner-bars">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>
```

**CSS Animation:**
```css
@keyframes spinner-bars-wave {
  0%, 40%, 100% {
    transform: scaleY(0.4);
    opacity: 0.5;
  }
  20% {
    transform: scaleY(1);
    opacity: 1;
  }
}
```

**Tại sao dùng:**
- ✅ Hiện đại, độc đáo
- ✅ Phù hợp cho media loading
- ✅ Tạo cảm giác "wave"

---

## 🔘 2. BUTTON LOADING STATES

### Cách Hoạt Động

**Khi button loading:**
1. Text biến mất (transparent)
2. Spinner xuất hiện ở giữa
3. Button bị disable
4. Cursor chuyển thành `wait`

**Cách dùng:**
```javascript
// Set loading
setButtonLoading(buttonElement, true);

// Remove loading
setButtonLoading(buttonElement, false);
```

**CSS:**
```css
.btn.loading {
  position: relative;
  color: transparent;
  pointer-events: none;
  cursor: wait;
}

.btn.loading::after {
  /* Spinner ở giữa button */
}
```

**Best Practices:**
- ✅ **Luôn disable button** khi loading
- ✅ **Giữ nguyên kích cỡ** button (không thay đổi layout)
- ✅ **Restore text** sau khi loading xong
- ✅ **Show error** nếu loading fail

---

## 📝 3. INPUT LOADING STATES

### Cách Hoạt Động

**Khi input loading:**
1. Spinner xuất hiện bên phải input
2. Section chứa input có overlay loading
3. Input vẫn có thể nhìn thấy (read-only)

**Cách dùng:**
```javascript
// Set loading
setInputLoading(inputElement, true);

// Remove loading
setInputLoading(inputElement, false);
```

**Khi nào dùng:**
- ✅ Đang validate input
- ✅ Đang fetch data từ server
- ✅ Đang process input data

**Ví dụ:**
```javascript
// Import file
setInputLoading(promptInput, true);
try {
  const prompts = await parsePromptsFromFile(file);
  // Success
} catch (error) {
  // Error
} finally {
  setInputLoading(promptInput, false);
}
```

---

## 🃏 4. SECTION LOADING STATES

### Cách Hoạt Động

**Khi section loading:**
1. Overlay xuất hiện trên section
2. Spinner lớn ở giữa
3. Section bị disable (pointer-events: none)
4. Opacity giảm nhẹ

**Cách dùng:**
```javascript
// Set loading
setSectionLoading(sectionElement, true);

// Remove loading
setSectionLoading(sectionElement, false);
```

**Khi nào dùng:**
- ✅ Đang load data cho section
- ✅ Đang khởi tạo section
- ✅ Đang sync data

**Ví dụ:**
```javascript
// Initialize
setSectionLoading(container, true);
try {
  await loadSavedState();
  await loadSettings();
} finally {
  setSectionLoading(container, false);
}
```

---

## 🍞 5. TOAST NOTIFICATION SYSTEM

### Các Loại Toast

#### Success Toast
```javascript
toastManager.success('Đã import thành công!');
toastManager.success('Đã import thành công!', 'Import File');
```

#### Error Toast
```javascript
toastManager.error('Lỗi khi import file');
toastManager.error('Lỗi khi import file', 'Lỗi');
```

#### Warning Toast
```javascript
toastManager.warning('Đã tạm dừng');
toastManager.warning('Đã tạm dừng', 'Tạm dừng');
```

#### Info Toast
```javascript
toastManager.info('Đang xử lý...');
toastManager.info('Đang xử lý...', 'Thông tin');
```

### Tính Năng

**Auto-dismiss:**
- Mặc định: 4 giây
- Error: 6 giây (lâu hơn để người dùng đọc)
- Có thể set custom duration

**Progress Bar:**
- Thanh progress ở dưới toast
- Hiển thị thời gian còn lại
- Animation mượt mà

**Close Button:**
- Người dùng có thể đóng sớm
- Hover effect rõ ràng

**Stacking:**
- Tối đa 5 toasts
- Tự động xóa toast cũ nhất
- Animation slide-in/slide-out

### Best Practices

**Khi nào dùng Toast:**
- ✅ **Success**: Hoàn thành tác vụ
- ✅ **Error**: Lỗi cần thông báo
- ✅ **Warning**: Cảnh báo quan trọng
- ✅ **Info**: Thông tin cần biết

**Khi nào KHÔNG dùng Toast:**
- ❌ Lỗi validation (dùng inline error)
- ❌ Loading state (dùng spinner)
- ❌ Progress (dùng progress bar)

**Message Guidelines:**
- ✅ **Ngắn gọn**: 1-2 dòng
- ✅ **Rõ ràng**: Người dùng hiểu ngay
- ✅ **Hành động**: Nếu có lỗi, gợi ý cách fix

---

## 📊 6. PROGRESS BAR

### Cải Thiện

**Shimmer Effect:**
- Animation shimmer chạy qua progress bar
- Tạo cảm giác "đang hoạt động"
- Chỉ hiện khi đang process

**Pulse Effect:**
- Pulse animation khi active
- Tạo feedback rõ ràng
- Không làm phân tâm

**Cách dùng:**
```javascript
// Add active class khi processing
if (isProcessing && !isPaused) {
  progressBar.classList.add('active');
} else {
  progressBar.classList.remove('active');
}
```

**Best Practices:**
- ✅ **Update thường xuyên**: Mỗi khi có progress
- ✅ **Smooth transition**: Dùng CSS transition
- ✅ **Show percentage**: Người dùng biết còn bao nhiêu
- ✅ **Show count**: "5 / 10" dễ hiểu hơn "50%"

---

## 🎭 7. SMOOTH SHOW/HIDE

### Các Animation

#### Fade In/Out
```javascript
toggleElement(element, true, 'fade');   // Show
toggleElement(element, false, 'fade');  // Hide
```

**Khi nào dùng:**
- ✅ Simple show/hide
- ✅ Không cần di chuyển
- ✅ Modal, overlay

#### Slide In/Out
```javascript
toggleElement(element, true, 'slide');   // Show
toggleElement(element, false, 'slide');  // Hide
```

**Khi nào dùng:**
- ✅ Dropdown menu
- ✅ Sidebar
- ✅ Toast notifications

#### Scale In/Out
```javascript
toggleElement(element, true, 'scale');   // Show
toggleElement(element, false, 'scale'); // Hide
```

**Khi nào dùng:**
- ✅ Popup
- ✅ Tooltip
- ✅ Modal

### Best Practices

**Timing:**
- ✅ **Fade**: 300ms
- ✅ **Slide**: 300ms
- ✅ **Scale**: 200ms (nhanh hơn)

**Easing:**
- ✅ **cubic-bezier(0.4, 0, 0.2, 1)**: Mượt mà, tự nhiên
- ✅ **ease-in-out**: Cân bằng
- ❌ **linear**: Quá cứng nhắc

**Accessibility:**
- ✅ **prefers-reduced-motion**: Tắt animation nếu người dùng yêu cầu
- ✅ **Focus management**: Đảm bảo focus đúng chỗ

---

## 🎯 8. KHI NÀO DÙNG LOẠI LOADING NÀO?

### Decision Tree

```
Có biết thời gian hoàn thành?
├─ Có → Progress Bar
└─ Không → Spinner

Spinner ở đâu?
├─ Button → Button Loading State
├─ Input → Input Loading State
├─ Section → Section Loading State
└─ Inline → Circular/Dots Spinner

Cần feedback gì?
├─ Success → Toast Success
├─ Error → Toast Error
├─ Warning → Toast Warning
└─ Info → Toast Info
```

### Ví Dụ Cụ Thể

**1. Import File:**
- ✅ Button: Loading state
- ✅ Input: Loading state
- ✅ Success: Toast success
- ✅ Error: Toast error

**2. Start Processing:**
- ✅ Button: Loading state
- ✅ Progress: Progress bar với shimmer
- ✅ Info: Toast info khi bắt đầu
- ✅ Success: Toast success khi xong

**3. Pause/Resume:**
- ✅ Button: Loading state (ngắn)
- ✅ Warning/Info: Toast notification
- ✅ Progress: Update progress bar

**4. Initialize App:**
- ✅ Section: Section loading
- ✅ Progress: Nếu có thể
- ✅ Error: Toast error nếu fail

---

## 💡 9. BEST PRACTICES

### 1. Immediate Feedback
**Luôn hiển thị feedback ngay lập tức:**
```javascript
// ✅ TỐT
button.addEventListener('click', () => {
  setButtonLoading(button, true);  // Ngay lập tức
  doAsyncWork();
});

// ❌ XẤU
button.addEventListener('click', async () => {
  await doAsyncWork();  // Chờ xong mới show loading
  setButtonLoading(button, true);
});
```

### 2. Error Handling
**Luôn có error handling:**
```javascript
try {
  setButtonLoading(button, true);
  await doWork();
  toastManager.success('Thành công!');
} catch (error) {
  toastManager.error('Lỗi: ' + error.message);
} finally {
  setButtonLoading(button, false);
}
```

### 3. Timeout
**Set timeout cho loading quá lâu:**
```javascript
const timeout = setTimeout(() => {
  setButtonLoading(button, false);
  toastManager.warning('Tác vụ mất quá nhiều thời gian');
}, 30000); // 30 giây

try {
  await doWork();
  clearTimeout(timeout);
} catch (error) {
  clearTimeout(timeout);
  // Handle error
}
```

### 4. Disable During Loading
**Luôn disable controls khi loading:**
```javascript
// ✅ TỐT
setButtonLoading(button, true);  // Tự động disable
setInputLoading(input, true);   // Tự động disable

// ❌ XẤU
button.disabled = true;
// Quên enable lại
```

### 5. Progress Updates
**Update progress thường xuyên:**
```javascript
// ✅ TỐT
for (let i = 0; i < items.length; i++) {
  await processItem(items[i]);
  updateProgress(i + 1, items.length);
}

// ❌ XẤU
await processAllItems();
updateProgress(items.length, items.length);  // Chỉ update 1 lần
```

### 6. Loading Text
**Thay đổi text khi loading:**
```javascript
// ✅ TỐT
button.textContent = 'Đang import...';
setButtonLoading(button, true);

// ❌ XẤU
setButtonLoading(button, true);
// Text vẫn là "Import" → confusing
```

### 7. Multiple Loading States
**Tránh nhiều loading states cùng lúc:**
```javascript
// ✅ TỐT
setSectionLoading(section, true);
// Section loading bao gồm tất cả

// ❌ XẤU
setButtonLoading(button1, true);
setButtonLoading(button2, true);
setInputLoading(input, true);
// Quá nhiều spinners → confusing
```

---

## 🎓 10. CSS ANIMATIONS EXPLAINED

### Spinner Rotate
```css
@keyframes spinner-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```
**Tại sao:**
- `rotate(360deg)` = 1 vòng tròn
- `linear` = tốc độ đều
- `infinite` = lặp lại mãi mãi

### Dots Bounce
```css
@keyframes spinner-dots-bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}
```
**Tại sao:**
- `scale(0)` = ẩn
- `scale(1)` = hiện
- `animation-delay` = tạo hiệu ứng wave

### Progress Shimmer
```css
@keyframes progress-shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}
```
**Tại sao:**
- Gradient di chuyển từ trái sang phải
- Tạo cảm giác "shining"
- Làm progress bar sống động hơn

### Toast Slide
```css
@keyframes toast-slide-in {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```
**Tại sao:**
- `translateX(100%)` = bắt đầu từ bên phải
- `translateX(0)` = về vị trí ban đầu
- Kết hợp với `opacity` = mượt mà

---

## 📚 11. TÀI LIỆU THAM KHẢO

### Design Guidelines
- **Material Design**: Loading states
- **Apple HIG**: Progress indicators
- **Ant Design**: Feedback patterns

### CSS Animations
- **MDN**: CSS Animations
- **CSS-Tricks**: Animation guides
- **Can I Use**: Browser support

### UX Best Practices
- **Nielsen Norman**: Loading states UX
- **Smashing Magazine**: Loading patterns
- **UX Planet**: Feedback design

---

## ✅ Checklist

Khi thêm loading state, đảm bảo:

- [ ] **Immediate feedback**: Hiển thị ngay lập tức
- [ ] **Disable controls**: Không cho click nhiều lần
- [ ] **Error handling**: Có try/catch
- [ ] **Cleanup**: Remove loading state khi xong
- [ ] **Accessibility**: Screen reader friendly
- [ ] **Performance**: Animation mượt mà
- [ ] **User feedback**: Toast khi cần
- [ ] **Progress updates**: Update thường xuyên

---

## 🎯 Tóm Tắt

1. **Spinner**: Dùng đúng loại cho đúng context
2. **Button Loading**: Luôn disable và show spinner
3. **Toast**: Dùng cho feedback, không dùng cho loading
4. **Progress Bar**: Update thường xuyên, có animation
5. **Smooth Transitions**: Dùng animation mượt mà
6. **Error Handling**: Luôn có fallback
7. **User Feedback**: Rõ ràng, ngắn gọn

**Nhớ**: Loading state tốt là loading state người dùng **không để ý** - nó chỉ hoạt động mượt mà! 🎨

