/*----- constants -----*/

let bankRoll = 500;
let playerBet;

const cardValue = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    "J": 10,
    "Q": 10,
    "K": 10,
    "A": [1, 11]
}


/*----- app's state (variables) -----*/

let playerAmount, dealerAmount, winner;
let playerCards = 20; //Hard coded for testing purposes
let dealerCards = 20; //Hard coded for testing purposes

/*----- cached element references -----*/

let hitButton = document.getElementById("hit");
let stayButton = document.getElementById("stay");
let amount = document.getElementById("betAmount");
let betButton = document.getElementById("placedBet");

/*----- event listeners -----*/

hitButton.addEventListener("click", testing);
stayButton.addEventListener("click", testing);
betButton.addEventListener("click", setBet);

/*----- functions -----*/

function testing() {
    console.log("Clicked");
}

function setBet() {
    playerBet = parseInt(amount.value);
    if (playerBet <= bankRoll) {
        bankRoll = bankRoll - playerBet;
        console.log(`You're betting $${playerBet}, you have $${bankRoll} remaining in your bank roll.`);
        amount.value = "";
        playerHand();
    } else {
        console.log(`You're betting more than you have, relax there. You only have $${bankRoll}.`);
    }
}

function playerHand() {
    if (playerCards === 21) {
        bankRoll += playerBet + (playerBet * 1.5);
        console.log(`Congrats, you won this time. Your total bank roll is now $${bankRoll}`);
        //Play again button? 
    } else if (playerCards > 21) {
        console.log(`Weren't so lucky this time huh. Your remaining bank roll is $${bankRoll}`);
        //Play again button IF bankRoll > $0
    } else {
        console.log(`Your current hand is worth ${playerCards}. Dealer's turn...`);
        dealerHand();
    }
}

function dealerHand() {
    if (dealerCards === 21) {
        console.log(`UNLUCKY. Dealer got 21. Your remaining bank roll is $${bankRoll}.`);
        //Play again button?
    } else if (dealerCards < 21 && dealerCards > playerCards) {
        console.log(`Dealer had the better hand of ${dealerCards} to your ${playerCards} 🤷‍♂️. Your remaning bank roll is $${bankRoll}.`);
    } else if (dealerCards < 21 && dealerCards < playerCards) {
        bankRoll += (playerBet * 2);
        console.log(`Barely won...Your new bank roll is now $${bankRoll}.`);
        //Play again button?
    } else if (dealerCards === playerCards) {
        bankRoll += playerBet;
        console.log(`Somehow we got the same card values. Tsk tsk...Your total bank roll is $${bankRoll}.`);
        //Play again button?
    } else {
        bankRoll += (playerBet * 2);
        console.log(`Lucked out. Dealer went over. Your total bank roll is now $${bankRoll}`);
        //Play again button?
    }
}