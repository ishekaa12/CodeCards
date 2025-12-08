async function loadFlashcard() {
    const res = await fetch("data/defaultCards.json");
    const cards = await res.json();

    const randomCard = cards[Math.floor(Math.random() * cards.length)];

    document.getElementById("front").innerText = randomCard.front;
    document.getElementById("back").innerText = randomCard.back;
}

loadFlashcard();
