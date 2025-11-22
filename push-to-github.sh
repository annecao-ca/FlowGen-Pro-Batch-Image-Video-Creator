#!/bin/bash

# Script để push code lên GitHub
# Repository: https://github.com/annecao-ca/FlowGen-Pro-Batch-Image-Video-Creator

echo "🚀 Đang push code lên GitHub..."
echo ""

# Kiểm tra remote
echo "📍 Kiểm tra remote repository..."
git remote -v
echo ""

# Kiểm tra branch
echo "📍 Kiểm tra branch hiện tại..."
git branch
echo ""

# Kiểm tra commit
echo "📍 Kiểm tra commit gần nhất..."
git log --oneline -1
echo ""

# Thử push
echo "📤 Đang push code..."
echo "⚠️  Nếu được yêu cầu nhập credentials:"
echo "   - Username: annecao-ca"
echo "   - Password: Sử dụng Personal Access Token (không phải mật khẩu GitHub)"
echo "   - Tạo token tại: https://github.com/settings/tokens"
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Push thành công!"
    echo "🌐 Xem code tại: https://github.com/annecao-ca/FlowGen-Pro-Batch-Image-Video-Creator"
else
    echo ""
    echo "❌ Push thất bại. Vui lòng:"
    echo "   1. Tạo Personal Access Token tại: https://github.com/settings/tokens"
    echo "   2. Chạy lại script này và nhập token khi được yêu cầu"
    echo "   3. Hoặc setup SSH key theo hướng dẫn trong PUSH_TO_GITHUB.md"
fi

