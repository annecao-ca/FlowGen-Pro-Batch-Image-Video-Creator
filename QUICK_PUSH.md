# 🚀 Hướng dẫn Push Code lên GitHub (Cách nhanh nhất)

## ✅ Trạng thái hiện tại

- ✅ Code đã được commit (2 commits)
- ✅ Remote đã được cấu hình đúng
- ⏳ Chờ authentication để push

## 🎯 Cách nhanh nhất (2 phút)

### Bước 1: Tạo Personal Access Token

1. Mở: https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Đặt tên: `FlowGen Pro Push`
4. Chọn quyền: ✅ **repo** (tích tất cả các quyền trong repo)
5. Click **"Generate token"**
6. **COPY TOKEN NGAY** (chỉ hiện 1 lần!)

### Bước 2: Push code

Chạy lệnh sau trong terminal:

```bash
cd "/Users/queeniecao/FlowGen Pro-Batch Image-Video Creator"
git push -u origin main
```

Khi được yêu cầu:
- **Username**: `annecao-ca`
- **Password**: **Dán token vừa copy** (không phải mật khẩu GitHub!)

### Hoặc chạy script tự động:

```bash
cd "/Users/queeniecao/FlowGen Pro-Batch Image-Video Creator"
./push-to-github.sh
```

## 📋 Kiểm tra sau khi push

Sau khi push thành công, kiểm tra tại:
https://github.com/annecao-ca/FlowGen-Pro-Batch-Image-Video-Creator

## ❓ Gặp vấn đề?

- **Lỗi authentication**: Đảm bảo dùng token, không phải mật khẩu
- **Repository không tồn tại**: Tạo tại https://github.com/new với tên `FlowGen-Pro-Batch-Image-Video-Creator`
- **Lỗi permission**: Đảm bảo token có quyền `repo`

