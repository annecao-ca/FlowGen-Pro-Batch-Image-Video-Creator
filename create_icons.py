#!/usr/bin/env python3
"""
Simple script to create placeholder icons for the extension
Requires PIL (Pillow): pip install Pillow
"""

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("Pillow is required. Install it with: pip install Pillow")
    exit(1)

def create_icon(size, filename):
    # Create image with transparent background
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Draw background circle
    margin = size // 8
    draw.ellipse([margin, margin, size - margin, size - margin], 
                 fill=(26, 115, 232, 255))  # Google Blue #1a73e8
    
    # Draw text "AF"
    try:
        # Try to use a nice font
        font_size = size // 2
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
    except:
        try:
            font = ImageFont.truetype("arial.ttf", font_size)
        except:
            # Fallback to default font
            font = ImageFont.load_default()
    
    text = "AF"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    position = ((size - text_width) // 2, (size - text_height) // 2 - bbox[1])
    draw.text(position, text, fill=(255, 255, 255, 255), font=font)
    
    img.save(filename, 'PNG')
    print(f"Created {filename}")

if __name__ == "__main__":
    import os
    os.makedirs("icons", exist_ok=True)
    
    create_icon(16, "icons/icon16.png")
    create_icon(48, "icons/icon48.png")
    create_icon(128, "icons/icon128.png")
    
    print("All icons created successfully!")

