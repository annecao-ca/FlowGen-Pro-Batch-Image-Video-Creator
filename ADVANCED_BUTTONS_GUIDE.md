# 🚀 Advanced Buttons Guide

## 📋 Tổng Quan

Hệ thống nút nâng cao với các tính năng:
1. ✅ **Ripple Effect** - Hiệu ứng gợn sóng khi nhấn
2. ✅ **Enhanced Loading** - Loading states với animated dots
3. ✅ **Button Groups** - Nút phân đoạn (segmented buttons)
4. ✅ **FAB** - Floating Action Button
5. ✅ **Icon + Text** - Hỗ trợ icon và text linh hoạt

---

## 1. 🌊 RIPPLE EFFECT (Material Design)

### Cách Sử Dụng

**Thêm class `ripple` vào button:**
```html
<button class="btn-glass btn-glass-primary ripple">
  Click me!
</button>
```

**Tự động hoạt động:**
- Ripple effect tự động được thêm khi click
- Hiệu ứng lan tỏa từ điểm click
- Animation mượt mà với `cubic-bezier(0.4, 0, 0.2, 1)`

### JavaScript API

```javascript
// Tạo ripple manually
createRipple(event, buttonElement);

// Tự động init cho tất cả buttons có class 'ripple'
initRippleEffects();
```

### CSS Customization

```css
/* Customize ripple color */
.btn-glass-primary .ripple-effect {
  background: rgba(255, 255, 255, 0.4);
}

/* Customize animation duration */
.ripple-effect {
  animation: ripple-animation 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 2. ⏳ ENHANCED LOADING STATES

### Các Loại Loading

#### 1. Spinner (Mặc định)
```javascript
setButtonLoading(button, true);
// hoặc
button.classList.add('loading');
```

#### 2. Animated Dots
```javascript
setButtonLoadingAdvanced(button, true, 'dots');
// hoặc
button.classList.add('loading-dots');
```

#### 3. Pulse Dots
```javascript
setButtonLoadingAdvanced(button, true, 'dots-alt');
// hoặc
button.classList.add('loading-dots-alt');
```

### HTML

```html
<!-- Spinner -->
<button class="btn-glass btn-glass-primary loading">
  Loading...
</button>

<!-- Animated Dots -->
<button class="btn-glass btn-glass-primary loading-dots">
  Loading...
</button>

<!-- Pulse Dots -->
<button class="btn-glass btn-glass-primary loading-dots-alt">
  Loading...
</button>
```

### JavaScript API

```javascript
// Basic loading
setButtonLoading(button, true);

// Advanced loading với type
setButtonLoadingAdvanced(button, true, 'dots');
setButtonLoadingAdvanced(button, true, 'dots-alt');
setButtonLoadingAdvanced(button, false); // Remove
```

---

## 3. 📑 BUTTON GROUPS (Segmented Buttons)

### HTML

```html
<div class="btn-group btn-group-primary">
  <button class="btn-glass btn-glass-secondary active">Option 1</button>
  <button class="btn-glass btn-glass-secondary">Option 2</button>
  <button class="btn-glass btn-glass-secondary">Option 3</button>
</div>
```

### JavaScript API

```javascript
// Tạo button group
const container = document.getElementById('myContainer');
const group = createButtonGroup(container, [
  { text: 'Image', value: 'image', icon: '🖼️', active: true },
  { text: 'Video', value: 'video', icon: '🎬' }
], {
  variant: 'primary',
  vertical: false,
  multiple: false,
  onSelect: (value, isActive) => {
    console.log('Selected:', value, isActive);
  }
});

// Get selection
const selected = getButtonGroupSelection(group);
console.log(selected); // ['image']
```

### Variants

```html
<!-- Primary -->
<div class="btn-group btn-group-primary">...</div>

<!-- Secondary -->
<div class="btn-group btn-group-secondary">...</div>

<!-- Vertical -->
<div class="btn-group btn-group-vertical">...</div>
```

### Multiple Selection

```javascript
createButtonGroup(container, buttons, {
  multiple: true, // Cho phép chọn nhiều
  onSelect: (value, isActive) => {
    // Handle selection
  }
});
```

---

## 4. 🎈 FLOATING ACTION BUTTON (FAB)

### HTML

```html
<!-- Basic FAB -->
<button class="fab fab-glass fab-glass-primary fab-bottom-right ripple">
  <span class="icon">➕</span>
</button>

<!-- Extended FAB (with text) -->
<button class="fab fab-glass fab-glass-primary fab-bottom-right fab-extended ripple">
  <span class="icon">➕</span>
  Thêm mới
</button>

<!-- Sizes -->
<button class="fab fab-glass fab-glass-primary fab-sm">...</button>
<button class="fab fab-glass fab-glass-primary">...</button>
<button class="fab fab-glass fab-glass-primary fab-lg">...</button>
```

### JavaScript API

```javascript
// Tạo FAB
const fab = createFAB({
  icon: '➕',
  text: 'Thêm mới', // Optional - tạo extended FAB
  position: 'bottom-right', // bottom-right, bottom-left, top-right, top-left, center
  size: 'normal', // sm, normal, lg
  variant: 'primary', // primary, secondary, success, destructive
  tooltip: 'Thêm item mới',
  onClick: () => {
    console.log('FAB clicked!');
  }
});

// Remove FAB
removeFAB(fab);
```

### Positions

- `fab-bottom-right` - Góc dưới bên phải
- `fab-bottom-left` - Góc dưới bên trái
- `fab-top-right` - Góc trên bên phải
- `fab-top-left` - Góc trên bên trái
- `fab-center` - Giữa màn hình

### Variants

- `fab-glass-primary` - Xanh dương
- `fab-glass-secondary` - Xám
- `fab-glass-success` - Xanh lá
- `fab-glass-destructive` - Đỏ

---

## 5. 🎨 ICON + TEXT ENHANCEMENTS

### Icon Positions

```html
<!-- Icon Left (mặc định) -->
<button class="btn-glass btn-glass-primary icon-left">
  <span class="icon">📁</span>
  Import
</button>

<!-- Icon Right -->
<button class="btn-glass btn-glass-primary icon-right">
  <span class="icon">📁</span>
  Import
</button>

<!-- Icon Top -->
<button class="btn-glass btn-glass-primary icon-top">
  <span class="icon">📁</span>
  Import
</button>

<!-- Icon Bottom -->
<button class="btn-glass btn-glass-primary icon-bottom">
  <span class="icon">📁</span>
  Import
</button>
```

### Icon Animations

Icons tự động có animation khi hover/active:
- **Hover**: Scale 1.1
- **Active**: Scale 0.95
- **Transition**: 0.3s cubic-bezier

---

## 🎯 VÍ DỤ SỬ DỤNG

### Ví Dụ 1: Button với Ripple

```html
<button class="btn-glass btn-glass-primary ripple" onclick="handleClick()">
  <span class="icon">✨</span>
  Click me!
</button>
```

### Ví Dụ 2: Loading State

```javascript
const button = document.getElementById('myButton');

// Start loading
setButtonLoadingAdvanced(button, true, 'dots');

// Do async work
await doAsyncWork();

// Stop loading
setButtonLoadingAdvanced(button, false);
```

### Ví Dụ 3: Button Group

```javascript
const container = document.getElementById('typeSelector');
createButtonGroup(container, [
  { text: 'Image', value: 'image', icon: '🖼️', active: true },
  { text: 'Video', value: 'video', icon: '🎬' }
], {
  variant: 'primary',
  onSelect: (value) => {
    console.log('Selected type:', value);
  }
});
```

### Ví Dụ 4: FAB

```javascript
// Tạo FAB để thêm prompt mới
const addPromptFAB = createFAB({
  icon: '➕',
  text: 'Thêm prompt',
  position: 'bottom-right',
  variant: 'primary',
  onClick: () => {
    // Handle add prompt
    addNewPrompt();
  }
});
```

---

## 🎨 CUSTOMIZATION

### Custom Ripple Color

```css
.my-custom-button .ripple-effect {
  background: rgba(255, 0, 0, 0.5);
}
```

### Custom Loading Animation

```css
.my-button.loading-custom::after {
  content: '⏳';
  animation: custom-loading 1s infinite;
}
```

### Custom FAB Size

```css
.fab-custom {
  width: 64px;
  height: 64px;
  font-size: 28px;
}
```

---

## 📱 RESPONSIVE

Tất cả components tự động responsive:
- Button groups wrap trên mobile
- FAB positions adjust
- Icons scale appropriately

---

## ♿ ACCESSIBILITY

- ✅ Keyboard navigation support
- ✅ Focus states rõ ràng
- ✅ ARIA labels cho FAB
- ✅ Screen reader friendly

---

## 🐛 TROUBLESHOOTING

### Ripple không hiện

**Nguyên nhân:** Chưa thêm class `ripple`
**Giải pháp:** Thêm class `ripple` vào button

### Loading state không hoạt động

**Nguyên nhân:** JavaScript chưa load
**Giải pháp:** Đảm bảo `button-effects.js` được load trước `popup.js`

### FAB không hiện

**Nguyên nhân:** Z-index conflict
**Giải pháp:** Kiểm tra z-index của các elements khác

---

## ✅ Checklist

Khi sử dụng advanced buttons:

- [ ] **Ripple**: Thêm class `ripple` cho buttons
- [ ] **Loading**: Chọn loại loading phù hợp
- [ ] **Button Groups**: Sử dụng cho selection
- [ ] **FAB**: Dùng cho primary actions
- [ ] **Icons**: Thêm icons để tăng trực quan
- [ ] **Accessibility**: Kiểm tra keyboard navigation
- [ ] **Performance**: Tối ưu animation

---

## 🎯 Tóm Tắt

1. **Ripple Effect**: Thêm class `ripple` → tự động hoạt động
2. **Loading States**: Dùng `setButtonLoadingAdvanced()` với type
3. **Button Groups**: Dùng `createButtonGroup()` để tạo
4. **FAB**: Dùng `createFAB()` để tạo floating button
5. **Icons**: Thêm class `icon-left/right/top/bottom` để điều chỉnh vị trí

**Nhớ**: Tất cả effects đều mượt mà với `transition: 0.3s ease`! 🎨

