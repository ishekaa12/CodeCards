# CodeCards

A Chrome extension that displays Java & DSA flashcards on every new tab to help you practice coding concepts on the go.

## Features

- 🎴 Random flashcards on every new tab
- 📚 Pre-loaded Java syntax and DSA concepts
- 🎨 Clean, minimal interface
- ⚡ Lightweight and fast

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/Codecards.git
   cd Codecards
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top right

4. Click "Load unpacked" and select the Codecards folder

5. Open a new tab to see your flashcards!

## Project Structure

```
Codecards/
├── assets/
│   └── icons/          # Extension icons (16x16, 48x48, 128x128)
│       ├── icon16.png
│       ├── icon48.png
│       ├── icon128.png
│       ├── icon.svg                # Source SVG file
│       ├── generate-icons.py       # Python script to generate icons
│       └── generate-icons.html     # HTML tool to generate icons
├── data/
│   └── defaultCards.json           # Flashcard data
├── manifest.json                   # Chrome extension manifest
├── newtab.html                     # New tab page HTML
├── newtab.css                      # Styles
└── newtab.js                       # Main logic
```

## Customizing Flashcards

Edit `data/defaultCards.json` to add, remove, or modify flashcards:

```json
{
  "front": "Your question here",
  "back": "Your answer here",
  "category": "syntax"
}
```

Current categories: `syntax`, `dsa`

## Icon Generation

If you need to regenerate the extension icons:

1. Install Pillow: `pip install Pillow`
2. Run: `python3 assets/icons/generate-icons.py`

Or use the HTML generator: open `assets/icons/generate-icons.html` in your browser.

## Tech Stack

- Chrome Extension (Manifest V3)
- HTML, CSS, JavaScript
- JSON for data storage

## Future Enhancements

- Add custom cards through UI
- Filter by category
- Dark mode
- Spaced repetition algorithm
- Statistics and progress tracking
- Multi-language support (Python, JavaScript, etc.)

## License

MIT License

## Contributing

Contributions are welcome! Feel free to submit a Pull Request.
