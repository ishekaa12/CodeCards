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
let customCards = [];
let currentCard = null;
let isFlipped = false;
let editingIndex = -1;

// SYNC KEY - This connects extension with dashboard
const SYNC_KEY = 'codecards_sync';

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
            customCards = result.customCards || [];
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
    document.getElementById('stats').textContent = `Total Cards: ${allCards.length} (${customCards.length} custom)`;
}

// Modal controls - Add Card
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

    customCards.push(newCard);

    // Save to Chrome storage (syncs with dashboard)
    chrome.storage.local.set({ 
        customCards
    }, async () => {
        await loadCards();
        updateStats();
        document.getElementById('addCardModal').classList.remove('active');
        document.getElementById('addCardForm').reset();
        alert('Card added successfully! 🎉\n(Synced with dashboard)');
    });
});

// View All Cards
document.getElementById('viewAllBtn').addEventListener('click', () => {
    displayAllCards();
    document.getElementById('viewAllModal').classList.add('active');
});

document.getElementById('closeViewAllBtn').addEventListener('click', () => {
    document.getElementById('viewAllModal').classList.remove('active');
});

// Display all cards in the modal
function displayAllCards(filterCategory = 'all') {
    const cardsList = document.getElementById('cardsList');
    cardsList.innerHTML = '';

    // Filter cards
    let cardsToDisplay = allCards;
    if (filterCategory !== 'all') {
        cardsToDisplay = allCards.filter(card => card.category === filterCategory);
    }

    if (cardsToDisplay.length === 0) {
        cardsList.innerHTML = '<div class="no-cards-message">No cards found in this category.</div>';
        return;
    }

    cardsToDisplay.forEach((card) => {
        // Check if card is in defaultCards array
        const isDefault = defaultCards.some(defaultCard => 
            defaultCard.front === card.front && 
            defaultCard.back === card.back && 
            defaultCard.category === card.category
        );
        // Find the actual index in customCards array
        const actualIndex = isDefault ? -1 : customCards.findIndex(c => 
            c.front === card.front && 
            c.back === card.back && 
            c.category === card.category
        );

        const cardItem = document.createElement('div');
        cardItem.className = 'card-item' + (isDefault ? ' default-card' : '');
        
        cardItem.innerHTML = `
            ${isDefault ? '<div class="default-badge">Default</div>' : ''}
            <div class="card-item-header">
                <span class="card-item-category">${card.category}</span>
                <div class="card-item-actions">
                    ${!isDefault ? `
                        <button class="edit-btn" onclick="editCard(${actualIndex})">✏️ Edit</button>
                        <button class="delete-btn" onclick="deleteCard(${actualIndex})">🗑️ Delete</button>
                    ` : ''}
                </div>
            </div>
            <div class="card-item-front">${card.front}</div>
            <div class="card-item-back">${card.back}</div>
        `;

        cardsList.appendChild(cardItem);
    });
}

// Category filter
document.getElementById('categoryFilter').addEventListener('change', (e) => {
    displayAllCards(e.target.value);
});

// Edit Card
window.editCard = function(index) {
    editingIndex = index;
    const card = customCards[index];

    document.getElementById('editCardFrontInput').value = card.front;
    document.getElementById('editCardBackInput').value = card.back;
    document.getElementById('editCategoryInput').value = card.category;

    document.getElementById('viewAllModal').classList.remove('active');
    document.getElementById('editCardModal').classList.add('active');
};

document.getElementById('editCancelBtn').addEventListener('click', () => {
    document.getElementById('editCardModal').classList.remove('active');
    document.getElementById('editCardForm').reset();
    editingIndex = -1;
});

// Update card
document.getElementById('editCardForm').addEventListener('submit', (e) => {
    e.preventDefault();

    customCards[editingIndex] = {
        front: document.getElementById('editCardFrontInput').value.trim(),
        back: document.getElementById('editCardBackInput').value.trim(),
        category: document.getElementById('editCategoryInput').value
    };

    // Save to Chrome storage (syncs with dashboard)
    chrome.storage.local.set({ 
        customCards
    }, async () => {
        await loadCards();
        updateStats();
        document.getElementById('editCardModal').classList.remove('active');
        document.getElementById('editCardForm').reset();
        editingIndex = -1;
        alert('Card updated successfully! ✅\n(Synced with dashboard)');
    });
});

// Delete Card
window.deleteCard = function(index) {
    if (confirm('Are you sure you want to delete this card?')) {
        customCards.splice(index, 1);

        // Save to both Chrome storage AND sync key
        chrome.storage.local.set({ 
            customCards,
            [SYNC_KEY]: JSON.stringify(customCards)
        }, async () => {
            await loadCards();
            updateStats();
            displayAllCards(document.getElementById('categoryFilter').value);
            alert('Card deleted successfully! 🗑️\n(Synced with dashboard)');
        });
    }
};

// Close modals when clicking outside
document.getElementById('addCardModal').addEventListener('click', (e) => {
    if (e.target.id === 'addCardModal') {
        document.getElementById('addCardModal').classList.remove('active');
        document.getElementById('addCardForm').reset();
    }
});

document.getElementById('editCardModal').addEventListener('click', (e) => {
    if (e.target.id === 'editCardModal') {
        document.getElementById('editCardModal').classList.remove('active');
        document.getElementById('editCardForm').reset();
        editingIndex = -1;
    }
});

document.getElementById('viewAllModal').addEventListener('click', (e) => {
    if (e.target.id === 'viewAllModal') {
        document.getElementById('viewAllModal').classList.remove('active');
    }
});

// Initialize on load
init();