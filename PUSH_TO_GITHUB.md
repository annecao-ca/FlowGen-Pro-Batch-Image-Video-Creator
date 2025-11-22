# Hướng dẫn Push Code lên GitHub

## Cách 1: Sử dụng Personal Access Token (Khuyến nghị)

1. Tạo Personal Access Token trên GitHub:
   - Vào: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Chọn quyền: `repo` (full control of private repositories)
   - Copy token

2. Push code:
   ```bash
   git push -u origin main
   ```
   - Username: `annecao-ca`
   - Password: **Dán Personal Access Token** (không phải mật khẩu GitHub)

## Cách 2: Sử dụng GitHub CLI

```bash
# Cài đặt GitHub CLI (nếu chưa có)
brew install gh

# Login
gh auth login

# Push code
git push -u origin main
```

## Cách 3: Sử dụng SSH Key

1. Tạo SSH key (nếu chưa có):
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. Thêm SSH key vào GitHub:
   - Copy nội dung: `cat ~/.ssh/id_ed25519.pub`
   - Vào: https://github.com/settings/keys
   - Click "New SSH key" và paste

3. Đổi remote sang SSH:
   ```bash
   git remote set-url origin git@github.com:annecao-ca/FlowGen-Pro-Batch-Image-Video-Creator.git
   git push -u origin main
   ```

## Kiểm tra trạng thái

```bash
# Xem remote đã đúng chưa
git remote -v

# Xem commit đã tạo
git log --oneline -1

# Push code
git push -u origin main
```

## Lưu ý

- Repository trên GitHub phải được tạo trước (có thể tạo empty repository)
- Nếu repository chưa tồn tại, tạo tại: https://github.com/new
- Tên repository: `FlowGen-Pro-Batch-Image-Video-Creator`

