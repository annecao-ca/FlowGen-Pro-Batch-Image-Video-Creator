# 🚀 Hướng Dẫn Đẩy Code Lên GitHub

## ✅ Đã Hoàn Thành

- ✅ Git repository đã được khởi tạo
- ✅ Tất cả files đã được add và commit
- ✅ Remote origin đã được cấu hình
- ✅ Branch `main` đã được tạo

## 📤 Bước Cuối Cùng: Push Lên GitHub

### Cách 1: Sử dụng GitHub CLI (Khuyến nghị)

```bash
# Nếu chưa cài GitHub CLI
brew install gh

# Login
gh auth login

# Push code
git push -u origin main
```

### Cách 2: Sử dụng Personal Access Token

1. **Tạo Personal Access Token:**
   - Vào GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token (classic)"
   - Chọn quyền: `repo` (full control)
   - Copy token

2. **Push code:**
```bash
git push -u origin main
# Khi được hỏi username: nhập GitHub username
# Khi được hỏi password: nhập Personal Access Token (không phải password)
```

### Cách 3: Sử dụng SSH (Nếu đã setup SSH key)

```bash
# Đổi remote sang SSH
git remote set-url origin git@github.com:annecao-ca/chrome-extension-auto-flow-veo-1.git

# Push
git push -u origin main
```

### Cách 4: Sử dụng GitHub Desktop

1. Mở GitHub Desktop
2. File → Add Local Repository
3. Chọn folder: `/Users/queeniecao/chrome-extension-auto-flow-veo-1`
4. Click "Publish repository"

## 📋 Kiểm Tra Trạng Thái

```bash
# Xem remote
git remote -v

# Xem commit history
git log --oneline

# Xem status
git status
```

## 🔄 Các Lệnh Git Thường Dùng

```bash
# Xem thay đổi
git status

# Add files
git add .

# Commit
git commit -m "Your commit message"

# Push
git push origin main

# Pull
git pull origin main

# Xem branches
git branch
```

## ⚠️ Lưu Ý

- Đảm bảo repository đã được tạo trên GitHub trước khi push
- Nếu repository chưa tồn tại, tạo mới tại: https://github.com/new
- Repository name: `chrome-extension-auto-flow-veo-1`
- Owner: `annecao-ca`

## 🎯 Sau Khi Push Thành Công

Code sẽ có sẵn tại:
**https://github.com/annecao-ca/chrome-extension-auto-flow-veo-1**

