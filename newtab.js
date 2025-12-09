// Pre-loaded flashcards
const defaultCards = [
    { front: "How to declare ArrayList in Java?", back: "ArrayList<Integer> list = new ArrayList<>();", category: "Java" },
    { front: "Binary Search Time Complexity?", back: "O(log n)", category: "DSA" },
    { front: "Java String to Int conversion?", back: "Integer.parseInt(str)", category: "Java" },
    { front: "How to create array in Java?", back: "int[] arr = new int[5];", category: "Java" },
    { front: "Linear Search Time Complexity?", back: "O(n)", category: "DSA" },
    { front: "How to find array length in Java?", back: "arr.length", category: "Java" },
    { front: "Quick Sort Time Complexity (Average)?", back: "O(n log n)", category: "DSA" },
    { front: "How to reverse a string in Java?", back: "new StringBuilder(str).reverse().toString()", category: "Java" },
    { front: "Stack operations time complexity?", back: "Push: O(1), Pop: O(1), Peek: O(1)", category: "DSA" },
    { front: "How to check if string is empty?", back: "str.isEmpty() or str.length() == 0", category: "Java" },
    { front: "Queue time complexity?", back: "Enqueue: O(1), Dequeue: O(1)", category: "DSA" },
    { front: "How to compare strings in Java?", back: "str1.equals(str2)", category: "Java" },
    { front: "Binary Tree height formula?", back: "Height = log₂(n+1) - 1 for complete tree", category: "DSA" },
    { front: "How to iterate HashMap in Java?", back: "for (Map.Entry<K,V> entry : map.entrySet())", category: "Java" },
    { front: "DFS Time Complexity?", back: "O(V + E) where V=vertices, E=edges", category: "DSA" },
    { front: "How to create HashSet in Java?", back: "HashSet<Integer> set = new HashSet<>();", category: "Java" },
    { front: "Merge Sort Time Complexity?", back: "O(n log n) - always stable", category: "DSA" },
    { front: "How to sort array in Java?", back: "Arrays.sort(arr)", category: "Java" },
    { front: "Linked List insertion at head?", back: "O(1)", category: "DSA" },
    { front: "How to convert char to String?", back: "String.valueOf(ch) or Character.toString(ch)", category: "Java" }
];

let allCards = [];
let currentCard = null;
let isFlipped = false;

// Initialize
async function init() {
    await loadCards();
    displayRandomCard();
    updateStats();
}

// Load cards from storage
async function loadCards() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['customCards'], (result) => {
            const customCards = result.customCards || [];
            allCards = [...defaultCards, ...customCards];
            resolve();
        });
    });
}

// Display random card
function displayRandomCard() {
    if (allCards.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * allCards.length);
    currentCard = allCards[randomIndex];
    isFlipped = false;

    document.getElementById('category').textContent = currentCard.category;
    document.getElementById('cardFront').textContent = currentCard.front;
    document.getElementById('cardBack').textContent = currentCard.back;
    document.getElementById('cardFront').style.display = 'block';
    document.getElementById('cardBack').style.display = 'none';
}

// Flip card
document.getElementById('flashcard').addEventListener('click', () => {
    isFlipped = !isFlipped;
    document.getElementById('cardFront').style.display = isFlipped ? 'none' : 'block';
    document.getElementById('cardBack').style.display = isFlipped ? 'block' : 'none';
});

// Next card button
document.getElementById('nextCardBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    displayRandomCard();
});

// Update stats
function updateStats() {
    document.getElementById('stats').textContent = `Total Cards: ${allCards.length}`;
}

// Modal controls
document.getElementById('addCardBtn').addEventListener('click', () => {
    document.getElementById('addCardModal').classList.add('active');
});

document.getElementById('cancelBtn').addEventListener('click', () => {
    document.getElementById('addCardModal').classList.remove('active');
    document.getElementById('addCardForm').reset();
});

// Save new card
document.getElementById('addCardForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const newCard = {
        front: document.getElementById('cardFrontInput').value.trim(),
        back: document.getElementById('cardBackInput').value.trim(),
        category: document.getElementById('categoryInput').value
    };

    // Get existing custom cards
    chrome.storage.local.get(['customCards'], (result) => {
        const customCards = result.customCards || [];
        customCards.push(newCard);

        // Save to storage
        chrome.storage.local.set({ customCards }, async () => {
            // Reload cards
            await loadCards();
            updateStats();

            // Close modal and reset form
            document.getElementById('addCardModal').classList.remove('active');
            document.getElementById('addCardForm').reset();

            // Show success (optional)
            alert('Card added successfully! 🎉');
        });
    });
});

// Close modal when clicking outside
document.getElementById('addCardModal').addEventListener('click', (e) => {
    if (e.target.id === 'addCardModal') {
        document.getElementById('addCardModal').classList.remove('active');
        document.getElementById('addCardForm').reset();
    }
});

// Initialize on load
init();
