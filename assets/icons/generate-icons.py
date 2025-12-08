#!/usr/bin/env python3
"""
Generate PNG icons for CodeCards Chrome extension.
Requires: pip install Pillow
"""

try:
    from PIL import Image, ImageDraw
except ImportError:
    print("Pillow is not installed. Install it with: pip install Pillow")
    exit(1)

def generate_icon(size):
    """Generate an icon of the specified size."""
    # Create image with transparent background
    img = Image.new('RGB', (size, size), color='#4a90e2')
    draw = ImageDraw.Draw(img)
    
    # Calculate proportional sizes
    corner_radius = size // 8
    card_padding = int(size * 0.156)
    card_width = int(size * 0.688)
    card_height = int(size * 0.766)
    card_y = int(size * 0.117)
    
    # Draw white card background
    draw.rounded_rectangle(
        [card_padding, card_y, card_padding + card_width, card_y + card_height],
        radius=size // 16,
        fill='white'
    )
    
    # Draw code brackets
    stroke_width = max(2, size // 40)
    bracket_size = size // 8
    
    # Left bracket
    left_bracket_x = card_padding + size // 16
    bracket_y = card_y + size // 3
    draw.line([left_bracket_x, bracket_y - bracket_size//2, 
               left_bracket_x - bracket_size//2, bracket_y], 
              fill='#4a90e2', width=stroke_width)
    draw.line([left_bracket_x - bracket_size//2, bracket_y, 
               left_bracket_x, bracket_y + bracket_size//2], 
              fill='#4a90e2', width=stroke_width)
    
    # Right bracket
    right_bracket_x = card_padding + card_width - size // 16
    draw.line([right_bracket_x, bracket_y - bracket_size//2, 
               right_bracket_x + bracket_size//2, bracket_y], 
              fill='#4a90e2', width=stroke_width)
    draw.line([right_bracket_x + bracket_size//2, bracket_y, 
               right_bracket_x, bracket_y + bracket_size//2], 
              fill='#4a90e2', width=stroke_width)
    
    # Draw code lines
    line_width = max(1, size // 60)
    line_x1 = card_padding + size // 4
    line_y = bracket_y + size // 12
    
    draw.line([line_x1, line_y, line_x1 + size//4, line_y], 
              fill='#4a90e2', width=line_width)
    draw.line([line_x1, line_y + size//12, line_x1 + size//3, line_y + size//12], 
              fill='#4a90e2', width=line_width)
    draw.line([line_x1, line_y + size//6, line_x1 + size//5, line_y + size//6], 
              fill='#4a90e2', width=line_width)
    
    # Draw small circle indicator
    circle_x = card_padding + card_width - size // 8
    circle_y = card_y + card_height - size // 8
    circle_radius = size // 16
    draw.ellipse([circle_x - circle_radius, circle_y - circle_radius,
                  circle_x + circle_radius, circle_y + circle_radius],
                 fill='white', outline='white')
    
    return img

def main():
    sizes = [16, 48, 128]
    
    print("Generating CodeCards icons...")
    for size in sizes:
        icon = generate_icon(size)
        filename = f"icon{size}.png"
        icon.save(filename)
        print(f"✓ Generated {filename} ({size}x{size})")
    
    print("\nAll icons generated successfully!")

if __name__ == "__main__":
    main()

