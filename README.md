1. Define required constants:
	1.1. Define cardValue object with keys of every face value (Ace = 1 or 11, 2 is 2, 3 is 3...and all face cards are worth 10) for all 52 cards
	1.2. Define players object (2 for now; MAYBE multiple players after)
	1.3. Define let variable to store player's total amount ($500)
	1.4. Define let variable to store the player's bet

2. Static page with html and button that says "Play your bet" -> once clicked, game begins;

3.  Randomize deck each time game is played, find a way to store that

4. Deal 2 cards to player
	4.1. If player's hand === 21, automatically win 1.5 times their bet and dealer doesn't play
		4.1.1 Play again button appears and they need to enter another bet amount to play again
	4.2. If player's hand is < 21, 2 buttons show on screen, either 'hit' for an additional card, or 'stay' to stay with current hand
	4.2. If their hand goes over 21, automatically count that as a lost, don't even bother hitting the dealer 
		4.2.1. Play again button appears and they need to enter another bet amount to play again

5. If player's hand is < 21; deal 2 cards to dealer
	5.1. If dealer's hand's value is <= 16, they need to hit
		5.1.1. If they go over 21, player wins and get $$ added to their $ variable
			5.1.1.1. Play again button appears and they need to enter another bet amount to play again
	5.2. If dealer's hand's value is <= 17, they stay with that hand
	5.3. Compare dealer and player's card and see who's closest to 21 WITHOUT going over
		5.3.1. If player wins, add the player's bet to $$ variable
			5.3.1.1. Play again button appears and they need to enter another bet amount to play again
		5.3.2. If dealer wins, subtract player's bet from $$ variable 
			5.3.2.1. Play again button appears and they need to enter another bet amount to play again
		5.3.3. If there is a tie, player's bet variable stays the same
			5.3.3.1. Play again button appears and they need to enter another bet amount to play again

6. If player's $$ variable hits $0, show message indicating that and don't let them play anymore since they don't have money anymore (Remove place bet button)
	



EXTRAS

- Maybe add a thing that tells user how much their hand is worth (numerical value of cards added together; if they got over 21 -> 'BUST' in red. If exactly 21 -> "21" in green. Anything lower than 21, in blue

-  Display $$ amount after each game

- If at any point the player wants to walk with what they have, show them how much they won or lost from their initial starting $$ variable

- If player's bet is > $10000, do something cool (I don't know what yet)

- Add audio
