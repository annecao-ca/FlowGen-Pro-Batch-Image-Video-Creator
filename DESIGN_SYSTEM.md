# 🎨 Hệ Thống Thiết Kế - Auto Flow Veo Extension

## 📋 Tổng Quan

Hệ thống thiết kế này được xây dựng với mục tiêu:
- **Chuyên nghiệp** nhưng không quá cứng nhắc
- **Hiện đại** nhưng không theo mốt nhất thời
- **Đơn giản** nhưng không nhàm chán

---

## 🎨 1. BẢNG MÀU (Color Palette)

### Phương Án 1: Ocean Blue (Mặc định) 🌊

**Tại sao chọn màu xanh dương?**
- Màu xanh dương tạo cảm giác **đáng tin cậy, chuyên nghiệp**
- Gợi liên tưởng đến công nghệ, sự ổn định
- Dễ nhìn, không gây mỏi mắt khi sử dụng lâu
- Phù hợp với các ứng dụng công cụ (tool) và năng suất (productivity)

**Màu chính:**
- Primary: `#2563eb` - Xanh dương đại dương, tạo điểm nhấn
- Secondary: `#10b981` - Xanh lá, biểu thị thành công
- Warning: `#f59e0b` - Cam, cảnh báo nhẹ nhàng
- Danger: `#ef4444` - Đỏ, cảnh báo nghiêm trọng

### Phương Án 2: Forest Green 🌲

**Tại sao chọn màu xanh lá?**
- Tạo cảm giác **tự nhiên, cân bằng, bền vững**
- Màu xanh lá giúp mắt thư giãn
- Phù hợp với các ứng dụng liên quan đến môi trường, sức khỏe
- Tạo cảm giác tươi mới, tích cực

**Màu chính:**
- Primary: `#059669` - Xanh lá rừng
- Secondary: `#0891b2` - Xanh ngọc (cyan)

### Phương Án 3: Sunset Purple 🌅

**Tại sao chọn màu tím?**
- Tạo cảm giác **sáng tạo, năng động, đổi mới**
- Màu tím thường gắn liền với sự sáng tạo và nghệ thuật
- Phù hợp với các ứng dụng liên quan đến AI, sáng tạo nội dung
- Tạo điểm nhấn độc đáo, khác biệt

**Màu chính:**
- Primary: `#7c3aed` - Tím hoàng gia
- Secondary: `#ec4899` - Hồng (pink)

### Cách Chuyển Đổi Theme

Thêm class vào thẻ `<body>` trong `popup.html`:

```html
<!-- Ocean Blue (mặc định) -->
<body>

<!-- Forest Green -->
<body class="theme-forest">

<!-- Sunset Purple -->
<body class="theme-sunset">
```

---

## 📏 2. KHOẢNG CÁCH (Spacing System)

### Hệ Thống 4px Base

**Tại sao dùng hệ thống 4px?**
- **Dễ tính toán**: Tất cả khoảng cách đều là bội số của 4
- **Nhất quán**: Tạo cảm giác hài hòa, có tổ chức
- **Linh hoạt**: Dễ scale và điều chỉnh
- **Chuẩn công nghiệp**: Nhiều design system lớn (Material Design, Ant Design) dùng hệ thống này

**Các giá trị:**
```css
--spacing-xs: 4px   /* Rất nhỏ - giữa icon và text */
--spacing-sm: 8px   /* Nhỏ - giữa các element nhỏ */
--spacing-md: 12px  /* Trung bình - giữa các element */
--spacing-lg: 16px  /* Lớn - giữa các section */
--spacing-xl: 20px  /* Rất lớn - giữa các phần lớn */
--spacing-2xl: 24px /* Cực lớn - giữa các block */
--spacing-3xl: 32px /* Siêu lớn - margin ngoài cùng */
```

**Ví dụ sử dụng:**
- Giữa các button: `gap: var(--spacing-sm)` (8px)
- Padding trong card: `padding: var(--padding-card)` (20px)
- Margin giữa các section: `margin-bottom: var(--margin-section)` (16px)

---

## ✍️ 3. KIỂU CHỮ (Typography)

### Font Family

**Tại sao dùng system fonts?**
- **Nhanh**: Không cần tải font từ server
- **Quen thuộc**: Người dùng đã quen với font trên hệ thống của họ
- **Tối ưu**: Font được tối ưu cho từng hệ điều hành
- **Đa nền tảng**: Hoạt động tốt trên mọi hệ thống

```css
--font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, ...
```

### Font Size - Modular Scale

**Tại sao dùng modular scale?**
- **Tỷ lệ vàng**: Tạo cảm giác hài hòa, tự nhiên
- **Phân cấp rõ ràng**: Dễ phân biệt heading, body, caption
- **Dễ nhớ**: Các kích cỡ có mối quan hệ với nhau

**Hệ thống (tỷ lệ ~1.25):**
```css
--font-size-xs: 11px   /* Captions, labels phụ */
--font-size-sm: 12px   /* Labels, metadata */
--font-size-base: 14px /* Body text - kích cỡ đọc thoải mái */
--font-size-md: 16px   /* Body text lớn */
--font-size-lg: 18px   /* Subheadings */
--font-size-xl: 20px   /* Headings nhỏ */
--font-size-2xl: 24px  /* Headings lớn */
```

**Tại sao 14px cho body?**
- **Dễ đọc**: Kích cỡ tối ưu cho màn hình desktop
- **Không quá lớn**: Tiết kiệm không gian
- **Không quá nhỏ**: Vẫn đọc được trên mọi màn hình

### Font Weight

**Tại sao dùng 400, 500, 600, 700?**
- **400 (Normal)**: Dễ đọc cho text dài
- **500 (Medium)**: Nhấn mạnh nhẹ, không quá đậm
- **600 (Semibold)**: Phân cấp rõ ràng, không quá nặng
- **700 (Bold)**: Nhấn mạnh mạnh, chỉ dùng cho headings

**Tránh:**
- Font quá mỏng (< 400): Khó đọc
- Font quá đậm (> 700): Tạo cảm giác nặng nề

### Line Height

**Tại sao dùng 1.5 cho body?**
- **Dễ đọc**: Khoảng cách giữa các dòng vừa đủ
- **Không quá rộng**: Tiết kiệm không gian
- **Không quá hẹp**: Không gây mỏi mắt

```css
--line-height-tight: 1.25   /* Headings - gọn gàng */
--line-height-normal: 1.5   /* Body - cân bằng */
--line-height-relaxed: 1.75 /* Text dài - thoải mái */
```

---

## 🔘 4. NÚT BẤM (Buttons)

### Kích Thước

**Tại sao 40px chiều cao?**
- **Đủ lớn**: Dễ click trên mọi thiết bị (theo chuẩn Material Design)
- **Không quá lớn**: Không chiếm quá nhiều không gian
- **Tỷ lệ vàng**: 40px = 2.5rem, dễ tính toán

```css
--button-height: 40px      /* Chuẩn */
--button-height-sm: 32px   /* Nhỏ - cho button phụ */
```

### Border Radius

**Tại sao 8px?**
- **Hiện đại**: Bo góc vừa phải, không quá tròn
- **Không quá sắc**: Không tạo cảm giác cứng nhắc
- **Nhất quán**: Dùng chung với input fields

```css
--button-border-radius: 8px
```

### Padding

**Tại sao 12px 24px?**
- **Cân bằng**: Đủ không gian cho text, không quá rộng
- **Tỷ lệ 1:2**: Padding ngang gấp đôi padding dọc - tạo cảm giác cân đối

```css
--padding-button: 12px 24px
```

### Hover Effects

**Tại sao dùng transform và shadow?**
- **Transform translateY(-1px)**: Tạo cảm giác "nổi lên" - feedback rõ ràng
- **Shadow tăng**: Tăng độ sâu, tạo cảm giác 3D
- **Transition mượt**: `cubic-bezier(0.4, 0, 0.2, 1)` - easing tự nhiên

---

## 📝 5. TRƯỜNG NHẬP LIỆU (Input Fields)

### Kích Thước

**Tại sao giống button?**
- **Nhất quán**: Tạo cảm giác hài hòa
- **Dễ sử dụng**: Cùng chiều cao, dễ align

```css
--input-height: 40px
```

### Border & Focus

**Tại sao border 1px?**
- **Tinh tế**: Không quá nổi bật, không làm phân tâm
- **Đủ rõ**: Vẫn thấy được ranh giới

**Tại sao focus ring?**
- **Accessibility**: Người dùng keyboard cần thấy focus
- **Feedback rõ ràng**: Người dùng biết đang ở đâu
- **Màu nhạt**: `rgba(37, 99, 235, 0.1)` - không quá chói

```css
--input-shadow-focus: 0 0 0 3px rgba(37, 99, 235, 0.1)
```

### Padding

**Tại sao 12px 16px?**
- **Đủ không gian**: Text không sát viền
- **Cân bằng**: Padding ngang nhỏ hơn button (vì input thường dài hơn)

---

## 🃏 6. THẺ/PHẦN (Cards/Sections)

### Border Radius

**Tại sao 12px?**
- **Lớn hơn button**: Tạo phân cấp rõ ràng
- **Hiện đại**: Bo góc lớn hơn tạo cảm giác mềm mại, thân thiện
- **Không quá tròn**: Vẫn giữ được tính chuyên nghiệp

```css
--card-border-radius: 12px
```

### Shadow

**Tại sao shadow nhẹ?**
- **Tinh tế**: Tạo độ sâu mà không quá nổi bật
- **Không làm phân tâm**: Người dùng tập trung vào nội dung
- **Hover tăng shadow**: Tạo feedback khi hover

```css
--card-shadow: 0 1px 3px rgba(0, 0, 0, 0.08)
--card-shadow-hover: 0 4px 12px rgba(0, 0, 0, 0.12)
```

### Padding

**Tại sao 20px?**
- **Đủ không gian**: Nội dung không bị chật
- **Không quá rộng**: Tiết kiệm không gian
- **Dễ tính toán**: 20px = 1.25rem = spacing-xl

---

## 🎯 7. NGUYÊN TẮC THIẾT KẾ

### 1. Nhất Quán (Consistency)
- Dùng cùng spacing system cho mọi element
- Dùng cùng border radius cho cùng loại element
- Dùng cùng color palette xuyên suốt

### 2. Phân Cấp (Hierarchy)
- Headings lớn hơn body text
- Primary actions nổi bật hơn secondary
- Quan trọng = đậm hơn, lớn hơn, màu nổi bật hơn

### 3. Khoảng Trắng (Whitespace)
- Để không gian thở - không nhét quá nhiều thứ
- Khoảng trắng tạo phân tách tự nhiên
- "Less is more" - ít hơn nhưng tốt hơn

### 4. Tương Phản (Contrast)
- Text phải đọc được trên background
- Đảm bảo WCAG AA (tỷ lệ tương phản ít nhất 4.5:1)
- Màu chính và màu phụ phải phân biệt rõ

### 5. Feedback (Phản Hồi)
- Mọi tương tác đều có feedback (hover, focus, active)
- Transition mượt mà, không giật cục
- Trạng thái rõ ràng (disabled, loading, success, error)

---

## 📚 8. TÀI LIỆU THAM KHẢO

### Design Systems Nổi Tiếng
- **Material Design** (Google): https://material.io/design
- **Ant Design** (Ant Group): https://ant.design
- **Chakra UI**: https://chakra-ui.com
- **Tailwind CSS**: https://tailwindcss.com

### Nguyên Tắc Thiết Kế
- **Gestalt Principles**: Nhóm các element liên quan
- **F-Pattern & Z-Pattern**: Cách mắt người quét trang
- **Proximity**: Element gần nhau = liên quan
- **Alignment**: Căn chỉnh tạo trật tự

### Màu Sắc
- **Color Theory**: Màu nóng/lạnh, tương phản
- **Accessibility**: WCAG Guidelines
- **Color Psychology**: Màu sắc ảnh hưởng đến cảm xúc

---

## 🚀 9. CÁCH SỬ DỤNG

### Thêm Element Mới

1. **Xác định loại element**: Button, Input, Card, Text?
2. **Dùng biến CSS tương ứng**: Không hard-code giá trị
3. **Tuân theo spacing system**: Dùng `--spacing-*`
4. **Kiểm tra accessibility**: Contrast, focus states

### Ví Dụ

```css
/* ❌ KHÔNG LÀM THẾ NÀY */
.my-button {
  padding: 10px 20px;
  background: #1a73e8;
  border-radius: 6px;
}

/* ✅ LÀM THẾ NÀY */
.my-button {
  padding: var(--padding-button);
  background: var(--color-primary);
  border-radius: var(--button-border-radius);
}
```

---

## 🎓 10. HỌC THÊM VỀ THIẾT KẾ

### Sách Hay
- **"Don't Make Me Think"** - Steve Krug (UX cơ bản)
- **"The Design of Everyday Things"** - Don Norman
- **"Refactoring UI"** - Adam Wathan & Steve Schoger

### Khóa Học
- **Google UX Design Certificate** (Coursera)
- **UI/UX Design** (Udemy, Skillshare)
- **Figma Tutorials** (YouTube)

### Practice
- **Dribbble**: Xem thiết kế đẹp, học hỏi
- **Behance**: Portfolio của designer
- **Awwwards**: Website đẹp, học animation/interaction

---

## 📝 Tóm Tắt

Hệ thống thiết kế này giúp bạn:
1. ✅ **Nhất quán**: Mọi thứ đều theo quy tắc
2. ✅ **Dễ bảo trì**: Thay đổi một chỗ, áp dụng mọi nơi
3. ✅ **Chuyên nghiệp**: Trông như sản phẩm thương mại
4. ✅ **Accessible**: Dễ sử dụng cho mọi người
5. ✅ **Scalable**: Dễ mở rộng, thêm tính năng mới

**Nhớ**: Thiết kế tốt là thiết kế không ai để ý - nó chỉ hoạt động mượt mà! 🎨

