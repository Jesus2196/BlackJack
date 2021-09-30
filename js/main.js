/*----- constants -----*/

const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A’'];
const GOAL_COUNT = 21;
const masterDeck = buildMasterDeck();

/*----- app"s state (variables) -----*/

let pHand, cHand, betVal, bankRoll, handStatus, deck;

/*----- cached element references -----*/

let msgEl = document.getElementById("msg");
let betEl = document.getElementById("bet");
let bankRollEl = document.getElementById("bankRoll");

let cValEl = document.getElementById("cScore");
let cHandEl = document.getElementById("cHand");


let pValEl = document.getElementById("pScore");
let pHandEl = document.getElementById("pHand");

let oneButton = document.getElementById("one");
let fiveButton = document.getElementById("five");
let quarterButton = document.getElementById("quarter");
let hundredButton = document.getElementById("hundred");

let dealButton = document.getElementById("deal");
let hitButton = document.getElementById("hit");
let standButton = document.getElementById("stand");

/*----- event listeners -----*/

oneButton.addEventListener("click", playerBet);
fiveButton.addEventListener("click", playerBet);
quarterButton.addEventListener("click", playerBet);
hundred.addEventListener("click", playerBet);

// dealButton.addEventListener("click", placeHolder);
// hitButton.addEventListener("click", placeHolder);
// standButton.addEventListener("click", placeHolder);

/*----- functions -----*/

init();

function init() {
    pHand = [];
    cHand = [];

    bankRoll = 4000;
    betValue = 0;

    deck = getNewShuffledDeck();
    render();
}

function render() {
    renderCards();
    pValEl.innerHTML = getHandVal(pHand);
    if (handStatus === null) {
        cValEl.innerHTML = "";
    } else {
        cValEl.innerHTML = getHandVal(cHand);
    }
}

function playerHit() {
    let card = deck.shift();
    pHand.push(card);

    let pVal = getHandVal(pHand);
    if (pval > 21) {
        handStatus = 'c';
        betValue = 0;
    }
    render();
}

function playerStand() {
    let pVal = getHandVal(pHand);
    let cVal = getHandVal(cVal);

    while (cVal < 17) {
        let card = deck.shift();
        cHand.push(card);
        cVal = getHandVal(cHand);
    };
    if (cVal > 21) {
        handStatus = 'p';
        bankRoll += betValue * 2;
        betValue = 0;
    } else if (cVal > pVal) {
        handStatus = 'c';
        betValue = 0;
    } else if (cVal < pVal) {
        handStatus = 'p';
        bankRoll += betValue * 2;
        betValue = 0;
    } else {
        handStatus = 't';
        bankRoll += betValue;
        betValue = 0;
    }
    render();
}

function renderCards() {
    let html = "";
    cHand.forEach(function (card, idx) {
        if (idx === 0 && handStatus === null) {
            html += `<div class="card back"></div>`;
        } else {
            html += `<div class="card ${card.face}"></div>`;
        }
    });
    cHandEl.innerHTML = html;
    html = "";
    pHand.forEach(function (card, idx) {
        html += `<div class="card ${card.face}"></div>`;
    });
    pHandEl.innerHTML = html;
}

function dealCards() {
    cHand = [];
    pHand = [];

    handStatus = null;
    let card = deck.shift();

    pHand.push(card);
    card = deck.shift();
    pHand.push(card);

    cHand.push(card);
    card = deck.shift();
    cHand.push(card);

    let pVal = getHandVal(pHand);
    let cVal = getHandVal(cHand);

    if (pVal === 21 && cVal === 21) {
        handStatus = 't';
        bankRoll += betValue;
        betValue = 0;
    } else if (pVal === 21) {
        handStatus = 'pbj';
        bankRoll += betValue + (betValue * 1.5);
        betValue = 0;
    } else if (cVal === 21) {
        handStatus = 'cbj';
        betValue = 0;
    }
    render();
}

function getHandVal(hand) {
    let total = 0;
    let totalAces = 0;
    hand.forEach(function (card) {
        total += card.value;
        if (card.value === 11) {
            totalAces++;
        }
    });
    while (total < 21 && totalAces > 0) {
        total -= 10;
        totalAces--;
    }
    return total;
}

function playerBet(evt) {
    const bet = parseInt(evt.target.textContent);
    if (bankRoll < bet) return;
    bankRoll = bankRoll - bet;
    betVal += bet;
    render();
}

function renderBet() {
    betEl.innerHTML = `Bet $${betVal}`;
    bankRollEl.innerHTML = `BankRoll $${bankRoll}`;
}

function renderControls() {
    dealButton.style.display = betVal > 0 && handStatus !== null ? "inline-block" : "none";
    standButton.style.display = !handStatus && pHand.length ? "inline-block" : "none";
    hitButton.style.display = !handStatus && pHand.length ? "inline-block" : "none";
    oneButton.style.display = handStatus !== null ? "inline-block" : "none";
    fiveButton.style.display = handStatus !== null ? "inline-block" : "none";
    quarterButton.style.display = handStatus !== null ? "inline-block" : "none";
    hundredButton.style.display = handStatus !== null ? "inline-block" : "none";
}

function getNewShuffledDeck() {
    // Create a copy of the masterDeck (leave masterDeck untouched!)
    const tempDeck = [...masterDeck];
    const newShuffledDeck = [];
    // access event.listener and then use event listener
    while (tempDeck.length) {
        // Get a random index for a card still in the tempDeck
        const rndIdx = Math.floor(Math.random() * tempDeck.length);
        // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
        newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
    }
    return newShuffledDeck;
}

function buildMasterDeck() {
    const deck = [];
    // Use nested forEach to generate card objects
    suits.forEach(function (suit) {
        ranks.forEach(function (rank) {
            deck.push({
                // The "face" property maps to the library"s CSS classes for cards
                face: `${suit}${rank}`,
                // Setting the "value" property for game of blackjack, not war
                value: Number(rank) || (rank === "A" ? 11 : 10) //
            });
        });
    });
    return deck;
}