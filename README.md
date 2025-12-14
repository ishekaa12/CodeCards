# 🎴 CodeCards - Chrome Extension & Web Dashboard

A comprehensive flashcard system for learning programming concepts, featuring a Chrome extension and web dashboard built for the WeMakeDevs Hackathon 2025.

![CodeCards Banner](https://img.shields.io/badge/Built%20with-JavaScript-yellow?style=for-the-badge) ![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green?style=for-the-badge) ![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge)

## 🌐 Live Demo

- **Web Dashboard**: [https://codecard-dashboard.vercel.app/](https://codecard-dashboard-mm6b-git-main-isheka-s-projects.vercel.app/)
- **Chrome Extension**: Install locally (see instructions below)

## 📹 Demo Video

[Link to 2-minute demo video]

---

## 🎯 Problem Statement

As a coding student, I constantly forget syntax and programming concepts while studying. Switching between tabs to look up syntax breaks my flow and wastes time. I needed a solution that:

- Shows me relevant flashcards while browsing
- Allows me to create custom cards for concepts I'm learning
- Works both as a browser extension and standalone web app
- Helps me practice and retain knowledge effectively

**CodeCards solves this by displaying flashcards on every new tab and providing a comprehensive dashboard for management.**

---

## ✨ Features

### Chrome Extension
- 🎲 **Random Flashcards**: Shows a new card every time you open a new tab
- 📝 **Custom Cards**: Add your own flashcards with question/answer format
- 🏷️ **Categories**: Organize by Java, DSA, C, HTML,CSS, or Custom
- ✏️ **Edit/Delete**: Full CRUD operations on custom cards
- 👁️ **View All**: Browse all cards with category filtering
- 💾 **Persistent Storage**: Chrome Storage API ensures cards never disappear
- 📤 **Export**: Download cards as JSON for backup/sync

### Web Dashboard
- 📊 **Statistics Dashboard**: Visual overview of your card collection
- 📈 **Interactive Pie Chart**: See card distribution by category (Chart.js)
- 🎯 **Practice Mode**: Quiz yourself with reveal/mark features
- 🔍 **Search & Filter**: Find cards quickly by category or keywords
- 📥 **Export/Import**: Sync cards between extension and dashboard
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- 🎨 **Modern UI**: Glassmorphism design with smooth animations

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox/Grid, glassmorphism effects
- **JavaScript (Vanilla)** - No frameworks, pure JS for performance

### APIs & Libraries
- **Chrome Extension APIs** - Manifest V3, chrome.storage.local
- **Chart.js** - Interactive pie charts for data visualization
- **LocalStorage API** - Web dashboard persistence

### Deployment & Tools
- **Vercel** - Zero-config deployment for dashboard
- **Git & GitHub** - Version control and repository hosting
- **Chrome Developer Mode** - Extension development and testing

---

## 🏗️ Architecture

### System Overview
```
┌─────────────────────┐         ┌──────────────────────┐
│  Chrome Extension   │         │   Web Dashboard      │
│  (New Tab Override) │         │   (Vercel Hosted)    │
├─────────────────────┤         ├──────────────────────┤
│ - Display Cards     │         │ - Manage Cards       │
│ - Add/Edit/Delete   │◄───────►│ - Practice Mode      │
│ - Chrome Storage    │  JSON   │ - Analytics Chart    │
│ - Export Cards      │  Export │ - LocalStorage       │
└─────────────────────┘  Import └──────────────────────┘
         │                               │
         └───────── Shared Cards ────────┘
              (via JSON Export/Import)
```

### Data Flow
1. **Storage**: Extension uses Chrome Storage API, Dashboard uses LocalStorage
2. **Sync**: Manual export/import via JSON files (security constraint)
3. **Default Cards**: 20 pre-loaded cards hardcoded in both platforms
4. **Custom Cards**: User-added cards stored separately, synced via export/import

### File Structure
```
codecards/
├── manifest.json          # Extension configuration
├── newtab.html           # New tab page structure
├── newtab.css            # Styling and animations
├── newtab.js             # Core logic and event handlers
└── icons/                # Extension icons (16px, 48px, 128px)
```

---

## 🚀 Installation & Usage

### Chrome Extension

1. **Download/Clone the Repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/codecards.git
   cd codecards
   ```

2. **Load Extension in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right)
   - Click "Load unpacked"
   - Select the `codecards` folder
   - Extension is now active! ✅

3. **Test It**
   - Open a new tab (Ctrl+T / Cmd+T)
   - You should see a flashcard!
   - Click the card to flip and see the answer

### Web Dashboard

Simply visit: **[https://codecard-dashboard.vercel.app/](https://codecard-dashboard-mm6b-git-main-isheka-s-projects.vercel.app/)**

No installation needed!

---

## 🔄 Syncing Between Extension & Dashboard

Since Chrome extensions can't directly access website LocalStorage (security restriction), we use export/import:

**To Sync:**
1. Click **"📥 Export Cards"** from one platform
2. Download the `codecards-backup.json` file
3. Click **"📤 Import Cards"** on the other platform
4. Choose to **ADD** (merge) or **REPLACE** (overwrite) cards
5. Done! Your cards are synced ✅

**Why this approach?**
- Chrome security policies prevent direct cross-origin storage access
- This method is simple, secure, and gives users full control
- No backend/database needed (keeps project lightweight)

---

## 🎓 Learning & Growth

### What I Learned

**Technical Skills:**
- **Chrome Extension Development**: Understanding Manifest V3, storage APIs, and CSP (Content Security Policy)
- **Vanilla JavaScript**: Building complex interactions without frameworks
- **Data Visualization**: Implementing Chart.js for interactive charts
- **Deployment**: Zero-config deployment with Vercel
- **Export/Import Patterns**: Implementing data portability with JSON

**Problem-Solving:**
- Debugging CSP issues (inline scripts not allowed)
- Understanding browser security constraints (cross-origin storage)
- Implementing practical sync solutions within limitations
- Creating responsive layouts with CSS Grid/Flexbox

**Best Practices:**
- Clean code organization with separation of concerns
- Semantic HTML for accessibility
- Progressive enhancement (works without JS for static content)
- User-centric design (export/import for flexibility)

### Challenges Overcome

1. **Content Security Policy Violations**
   - **Problem**: Inline JavaScript blocked by Chrome
   - **Solution**: Separated JS into external files

2. **Cross-Platform Sync**
   - **Problem**: Extension and web app can't share storage directly
   - **Solution**: Export/import feature with user control

3. **State Management**
   - **Problem**: Keeping UI in sync with storage
   - **Solution**: Implemented centralized load/save functions

4. **First Hackathon**
   - **Challenge**: Time management and scope definition
   - **Learning**: Start with MVP, iterate based on what works

---

## 🏆 Hackathon Prize Track

### Vercel Deployment Award ($2,000)

**Requirement**: Project must be deployed on Vercel

**How I Used Vercel:**
- ✅ Deployed dashboard at `codecard-dashboard.vercel.app`
- ✅ Zero-config deployment (just connected GitHub repo)
- ✅ Automatic HTTPS and CDN distribution
- ✅ Live, accessible URL for judging

**Why Vercel?**
- Instant deployments with Git integration
- Automatic HTTPS and performance optimization
- Perfect for static sites and SPAs
- Free tier perfect for hackathon projects

**Deployment Process:**
1. Pushed code to GitHub
2. Connected repo to Vercel
3. Clicked "Deploy"
4. Live in 30 seconds! 🚀

The dashboard showcases all features and serves as the public face of the project.

---

## 📊 Statistics

- **Total Pre-loaded Cards**: 20 (Java + DSA)
- **Supported Categories**: 5 (Java, DSA, C, HTML,CSS, Other)
- **Lines of Code**: ~800 (HTML/CSS/JS combined)
- **Development Time**: 8 days (hackathon duration)
- **Deployment Time**: < 1 minute (Vercel)

---

## 🚀 Future Enhancements

- [ ] Spaced repetition algorithm (SRS)
- [ ] Backend API for true auto-sync
- [ ] Mobile app version
- [ ] Collaborative card decks
- [ ] Image support on cards
- [ ] Audio pronunciation for code
- [ ] GitHub integration for code snippets
- [ ] Dark mode toggle

---

## 👨‍💻 About Me

This is my first hackathon! As a beginner coder learning Java and DSA, I built this tool to solve my own problem - constantly forgetting syntax while coding. Through this project, I learned Chrome extension development, web deployment, and how to build practical solutions to real problems.

**Connect with me:**
- GitHub: [https://github.com/ishekaa12]
- LinkedIn: [www.linkedin.com/in/isheka-singh-152264309]

---

## 📝 License

MIT License - Feel free to use and modify!

---

## 🙏 Acknowledgments

- **WeMakeDevs** for organizing the hackathon
- **Vercel** for the amazing deployment platform
- **Chart.js** for the beautiful charts
- **Community** for inspiration and support

---

**Built with ❤️ for WeMakeDevs Hackathon 2025**

