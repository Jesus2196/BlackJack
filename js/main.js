/*----- constants -----*/



/*----- app's state (variables) -----*/

let betValue;

/*----- cached element references -----*/

let dealerValue = document.getElementById("dealerScore");
let dealerHand = document.getElementById("dealerHand");

let msg = document.getElementById("msg");

let playerValue = document.getElementById("playerScore");
let playerHand = document.getElementById("playerHand");

let quarterButton = document.getElementById("quarter");
let fiftyButton = document.getElementById("fifty");
let hundredButton = document.getElementById("hundred");
let fiveHunBtn = document.getElementById("fiveHundred");

let dealButton = document.getElementById("deal");
let hitButton = document.getElementById("hit");
let standButton = document.getElementById("stand");

/*----- event listeners -----*/

quarterButton.addEventListener("click", placeHolder);
fiftyButton.addEventListener("click", placeHolder);
hundredButton.addEventListener("click", placeHolder);
fiveHunBtn.addEventListener("click", placeHolder);

dealButton.addEventListener("click", placeHolder);
hitButton.addEventListener("click", placeHolder);
standButton.addEventListener("click", placeHolder);

/*----- functions -----*/

function placeHolder() {
    console.log("placeholder text");
}

function playerBet() {
    if (quarterButton) {
        betValue += 25;
    } else if (fiftyButton) {
        betValue += 50;
    } else if (hundredButton) {
        betValue += 100;
    } else if (fiveHunBtn) {
        betValue += 500;
    }
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
                // The 'face' property maps to the library's CSS classes for cards
                face: `${suit}${rank}`,
                // Setting the 'value' property for game of blackjack, not war
                value: Number(rank) || (rank === 'A' ? 11 : 10) //
            });
        });
    });
    return deck;
}