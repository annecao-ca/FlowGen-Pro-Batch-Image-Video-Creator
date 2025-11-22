# Changelog - FlowGen Pro

## [1.1.0] - 2024

### ✨ Added
- **Constants file**: Tạo `constants.js` để tập trung tất cả magic numbers và configuration
- **Memory leak fix**: Thêm limit cho Set size để tránh memory leak
- **Enhanced validation**: Thêm validation cho character/scene descriptions với giới hạn 500 ký tự
- **i18n error messages**: Tất cả error messages giờ sử dụng i18n system
- **Code refactoring**: Tách input filling logic thành helper functions riêng biệt

### 🔧 Changed
- **Extension name**: Đổi tên từ "Auto Flow Veo" sang "FlowGen Pro"
- **Version**: Nâng version lên 1.1.0
- **Error handling**: Cải thiện error messages với i18n support
- **Code organization**: Refactor content.js với helper functions

### 🐛 Fixed
- **Memory leak**: Fixed memory leak trong content.js với Set size limiting
- **Validation**: Thêm validation cho character/scene descriptions
- **Error messages**: Standardize error messages với i18n

### 📝 Technical Improvements
- Tách `scoreInputElement()` function để tính điểm input elements
- Tách `fillContentEditable()` và `fillRegularInput()` functions
- Sử dụng constants cho retry counts và delays
- Improved code maintainability và readability

---

## [1.0.0] - Initial Release

### Features
- Batch image/video creation automation
- Smart waiting logic (3 stages)
- Auto download
- Bilingual support (Vi/En)
- Real-time progress tracking
- Pause/Resume/Stop controls
- Character/Scene consistency
- Persistent UI

