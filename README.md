# FlowGen Pro - Chrome Extension

Chrome Extension tự động hóa việc tạo hình ảnh và video hàng loạt trên Google Flow/Veo3.

## Tính năng

- ✅ Tự động hóa tạo hình ảnh và video hàng loạt
- ✅ Nhập danh sách prompt từ text hoặc file .txt
- ✅ Logic chờ thông minh 3 giai đoạn để tránh bị phát hiện bot
- ✅ Tự động tải về khi hoàn thành
- ✅ Giao diện song ngữ (Tiếng Việt/English)
- ✅ Theo dõi tiến trình real-time
- ✅ Hỗ trợ tạm dừng, tiếp tục, và dừng
- ✅ Cài đặt linh hoạt (lặp lại, điểm bắt đầu, delay)

## Cài đặt

### Từ Source Code

1. Clone hoặc tải xuống repository này
2. Mở Chrome và vào `chrome://extensions/`
3. Bật "Developer mode" ở góc trên bên phải
4. Click "Load unpacked"
5. Chọn thư mục extension

### Từ Chrome Web Store

(Chưa có - sẽ cập nhật khi được publish)

## Cách sử dụng

### Bước 1: Chuẩn bị

1. Mở Google Flow/Veo3 và tạo hoặc mở một project
2. Đảm bảo bạn đang ở trang có thể tạo hình ảnh/video

### Bước 2: Nhập Prompts

1. Click vào icon extension trên thanh công cụ Chrome
2. Nhập danh sách prompt vào textarea (mỗi dòng một prompt)
   - Hoặc click "Import từ file .txt" để import từ file
3. Chọn loại tạo: **Image** hoặc **Video**

### Bước 3: Cấu hình (Tùy chọn)

Click vào "Cài đặt" để mở phần cấu hình:

- **Số lần lặp lại mỗi prompt**: Tạo nhiều biến thể của cùng một prompt
- **Bắt đầu từ prompt số**: Resume từ prompt bất kỳ
- **Delay tối thiểu/tối đa**: Thời gian chờ giữa các prompt (giây)

### Bước 4: Bắt đầu

1. Click nút **"Bắt đầu"**
2. Extension sẽ tự động:
   - Gửi prompt vào website
   - Chờ render hoàn thành
   - Tự động tải về
   - Tiếp tục với prompt tiếp theo

### Bước 5: Theo dõi

- Xem tiến trình trong thanh progress bar
- Xem log chi tiết trong phần Log
- Có thể **Tạm dừng**, **Tiếp tục**, hoặc **Dừng** bất cứ lúc nào

## Logic chờ thông minh

Extension sử dụng logic chờ 3 giai đoạn để mô phỏng hành vi người dùng:

1. **Giai đoạn 1 (Prompt #1)**: Gửi ngay lập tức, không trễ
2. **Giai đoạn 2 (Prompt #2-#5)**: Chờ ngẫu nhiên 90-120 giây giữa mỗi lần gửi
3. **Giai đoạn 3 (Prompt #6+)**: Theo dõi queue + chờ ngẫu nhiên để cân bằng tốc độ và an toàn

## Cấu trúc Project

```
chrome-extension-auto-flow-veo/
├── manifest.json          # Extension manifest
├── popup.html             # Popup UI
├── popup.css              # Popup styles
├── popup.js               # Popup logic
├── background.js          # Background service worker
├── content.js             # Content script (automation)
├── utils.js               # Utility functions
├── i18n.js                # Internationalization
├── settings.js            # Settings management
├── icons/                 # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md              # This file
```

## Yêu cầu

- Google Chrome (phiên bản mới nhất)
- Tài khoản Google Flow/Veo3
- Kết nối internet

## Lưu ý

- Extension chỉ hoạt động trên trang Google Flow/Veo3
- Đảm bảo bạn đã mở project trước khi bắt đầu
- Delay giữa các prompt có thể được điều chỉnh trong Settings
- Extension tự động tải về file khi hoàn thành

## Troubleshooting

### Extension không hoạt động

1. Kiểm tra xem bạn đã mở đúng trang Google Flow/Veo3 chưa
2. Refresh trang và thử lại
3. Kiểm tra Console để xem có lỗi không (F12)

### Không tìm thấy nút tạo

- Đảm bảo bạn đang ở trang có thể tạo hình ảnh/video
- Thử refresh trang
- Kiểm tra xem có popup hoặc dialog nào đang chặn không

### File không tự động tải về

- Kiểm tra cài đặt download của Chrome
- Xem phần Log để biết thêm chi tiết
- File có thể đã được tải về trong thư mục Downloads mặc định

## Phát triển

### Thêm ngôn ngữ mới

Chỉnh sửa file `i18n.js` và thêm object ngôn ngữ mới:

```javascript
const i18n = {
  vi: { ... },
  en: { ... },
  // Thêm ngôn ngữ mới ở đây
  fr: { ... }
};
```

### Tùy chỉnh Selectors

Nếu Google Flow/Veo3 thay đổi UI, bạn có thể cập nhật selectors trong `content.js`:

- `fillPromptInput()`: Selectors cho ô nhập prompt
- `clickCreateButton()`: Selectors cho nút tạo
- `monitorCompletion()`: Selectors cho indicators hoàn thành

## License

MIT License

## Tác giả

Developed for automating Google Flow/Veo3 workflow

## Changelog

### v1.0.0
- Initial release
- Batch image/video creation
- Smart waiting logic
- Auto download
- Bilingual support (Vi/En)
