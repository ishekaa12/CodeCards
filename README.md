# 🚀 CodeCards — Chrome Extension for Java & DSA Flashcards

**CodeCards** helps coding students remember Java syntax, DSA concepts, and interview fundamentals — simply by opening a new tab.  
Each new tab displays a random flashcard, reinforcing concepts through quick micro-learning sessions.

---

## 🧠 Problem  
As coding students, we constantly forget:
- Java syntax (ArrayList, loops, Strings…)
- Time complexities
- DSA patterns
- Small tricks used in interview problems  

We often end up Googling the same things again and again.

---

## 💡 Solution  
**CodeCards** automatically displays coding flashcards on **every new tab**, so you revise without effort.  
You can also add custom cards, categorize them, and manage them on a clean web dashboard.

Learning becomes passive, frequent, and consistent.

---

## ✨ Features Breakdown

### ✅ **MVP (Must Have)**
- 📌 Random flashcard on every new tab  
- 📚 Pre-loaded Java syntax & basic DSA cards  
- ➕ Add custom cards (front + back)  
- 🗂 Simple categories (Syntax, DSA, Custom)  
- 🌐 Web dashboard hosted on **Vercel** to manage cards  

---

### ⭐ **Nice to Have (Stretch Features)**
- 🧠 Spaced repetition (mark as *learned* or *needs review*)  
- 🔍 Search & filter cards  
- 🌙 Dark mode toggle  
- 📤 Export / import cards as JSON  
- 📊 Statistics (cards reviewed, streak, accuracy)  

---

## 📘 Sample Flashcards (Included by Default)

| Front | Back |
|-------|-------|
| **How to declare an ArrayList in Java?** | `ArrayList<Integer> list = new ArrayList<>();` |
| **Binary Search Time Complexity?** | `O(log n)` |
| **Convert String → int in Java** | `Integer.parseInt(str)` |
| **Time Complexity of Merge Sort?** | `O(n log n)` |
| **Check if string is numeric in Java** | `Character.isDigit(ch)` |

---

## 🏗 Project Architecture

```
codecards/
│── manifest.json
│── newtab.html         # Flashcard UI
│── newtab.css
│── newtab.js
│── dashboard/          # Vercel web dashboard
│    ├── index.html
│    ├── index.css
│    └── index.js
│── data/
│    └── defaultCards.json
│── assets/
     └── icons/
```

---

## 🛠 Tech Stack
- **Chrome Extension (Manifest V3)**
- **HTML, CSS, JavaScript**
- **Local Storage**
- **Vercel** for hosting dashboard

---

## 📦 Installation (Developer Mode)
1. Clone the repo:
   ```bash
   git clone https://github.com/ishekaa12/codecards.git
   ```
2. Go to Chrome:
   ```
   chrome://extensions/
   ```
3. Enable **Developer Mode**  
4. Click **Load Unpacked**  
5. Select the `codecards/` folder  
6. Open a new tab → flashcards appear ✨

---

## 🚀 Future Enhancements
- AI-generated flashcards  
- User sync via Firebase  
- Multi-language flashcards (Python, JS, SQL, C++)  
- Mobile version  

---


---

## ❤️ Acknowledgements  
Built to help students learn smarter, not harder.
