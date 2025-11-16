# 🚀 Quick Start - Design System

## 📦 Files Đã Tạo

1. **`design-system.css`** - Hệ thống thiết kế với 3 theme
2. **`popup.css`** - Đã được cập nhật để dùng design system
3. **`DESIGN_SYSTEM.md`** - Tài liệu chi tiết về thiết kế
4. **`DESIGN_COMPARISON.md`** - So sánh trước/sau

## 🎨 Chuyển Đổi Theme

Mở file `popup.html` và thêm class vào thẻ `<body>`:

```html
<!-- Theme Ocean Blue (mặc định) -->
<body>

<!-- Theme Forest Green -->
<body class="theme-forest">

<!-- Theme Sunset Purple -->
<body class="theme-sunset">
```

## 📝 Sử Dụng Biến CSS

### Màu Sắc
```css
.my-element {
  color: var(--color-text-primary);
  background: var(--color-primary);
  border: 1px solid var(--color-border);
}
```

### Khoảng Cách
```css
.my-element {
  padding: var(--padding-button);
  margin: var(--spacing-lg);
  gap: var(--spacing-sm);
}
```

### Typography
```css
.my-text {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);
}
```

### Border Radius
```css
.my-element {
  border-radius: var(--button-border-radius); /* 8px */
  /* hoặc */
  border-radius: var(--card-border-radius);   /* 12px */
}
```

### Shadow
```css
.my-card {
  box-shadow: var(--card-shadow);
}

.my-card:hover {
  box-shadow: var(--card-shadow-hover);
}
```

## 🎯 Các Biến Quan Trọng

### Màu Chính
- `--color-primary` - Màu chủ đạo
- `--color-secondary` - Màu phụ
- `--color-warning` - Cảnh báo
- `--color-danger` - Nguy hiểm

### Background
- `--color-bg-primary` - Nền chính (trắng)
- `--color-bg-secondary` - Nền phụ (xám nhạt)
- `--color-bg-elevated` - Nền card

### Text
- `--color-text-primary` - Chữ chính
- `--color-text-secondary` - Chữ phụ
- `--color-text-tertiary` - Chữ nhạt

### Spacing
- `--spacing-xs` đến `--spacing-3xl` - Khoảng cách
- `--padding-button` - Padding button
- `--padding-input` - Padding input
- `--padding-card` - Padding card

### Typography
- `--font-size-xs` đến `--font-size-2xl` - Kích cỡ chữ
- `--font-weight-normal` đến `--font-weight-bold` - Độ đậm
- `--line-height-tight/normal/relaxed` - Chiều cao dòng

## 📚 Đọc Thêm

- **`DESIGN_SYSTEM.md`** - Giải thích chi tiết tại sao chọn thiết kế này
- **`DESIGN_COMPARISON.md`** - So sánh trước/sau

## ✅ Checklist Khi Thêm Element Mới

- [ ] Dùng biến CSS thay vì hard-code
- [ ] Tuân theo spacing system (4px base)
- [ ] Dùng font size từ design system
- [ ] Kiểm tra contrast (màu chữ trên nền)
- [ ] Thêm hover/focus states
- [ ] Test với cả 3 theme

## 🎓 Tips

1. **Luôn dùng biến CSS** - Đừng hard-code giá trị
2. **Tuân theo spacing system** - Dùng `--spacing-*`
3. **Nhất quán** - Cùng loại element = cùng style
4. **Test nhiều theme** - Đảm bảo hoạt động với mọi theme

---

**Happy Designing! 🎨**

