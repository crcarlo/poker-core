const symbols = {
	suits: {
		clubs: 'C',
		diamonds: 'D',
		hearts: 'H',
		spades: 'S'
	},
	values: {
		ace: 'A',
		jack: 'J',
		queen: 'Q',
		king: 'K'
	}
};

function Card(suit, number) {
	if (suit < 0 || suit > 3) {
		throw new Error('Invalid suit number! Got number: ' + suit);
	}

	if (number < 0 || number > 12) {
		throw new Error('Invalid number for card! Got number: ' + number);
	}

	this.suit = suit;
	this.number = number;

	this.toString = () => {
		function intToSuit(num) {
			if (num === 0) {
				return symbols.suits.clubs;
			}
			if (num === 1) {
				return symbols.suits.diamonds;
			}
			if (num === 2) {
				return symbols.suits.hearts;
			}
			if (num === 3) {
				return symbols.suits.spades;
			}
		}
		function intToValue(num) {
			if (num === 0) {
				return symbols.values.ace;
			} else if (num === 10) {
				return symbols.values.jack;
			} else if (num === 11) {
				return symbols.values.queen;
			} else if (num === 12) {
				return symbols.values.king;
			} else {
				return num + 1;
			}
		}
		return '' + intToValue(number) + intToSuit(suit);
	};

	this.equals = otherCard =>
		otherCard.suit === this.suit && otherCard.number === this.number;
}

function cardFromString(cardString) {
	const cardStringTrimmed = cardString.trim();

	var cardNumberString = '';
	var cardSuitNumberString = '';

	if (cardStringTrimmed.length === 2) {
		cardNumberString = cardStringTrimmed[0];
		cardSuitNumberString = cardStringTrimmed[1];
	} else if (cardStringTrimmed.length === 3) {
		cardNumberString = cardStringTrimmed.substring(0, 2);
		cardSuitNumberString = cardStringTrimmed[2];
	} else {
		throw new Error('Invalid card String!');
	}

	let cardNumber = -1;
	let cardSuitNumber = -1;

	if (cardNumberString === symbols.values.ace) {
		cardNumber = 0;
	} else if (cardNumberString === symbols.values.jack) {
		cardNumber = 10;
	} else if (cardNumberString === symbols.values.queen) {
		cardNumber = 11;
	} else if (cardNumberString === symbols.values.king) {
		cardNumber = 12;
	} else {
		cardNumber = parseInt(cardNumberString) - 1;
	}

	if (cardSuitNumberString === symbols.suits.clubs) {
		cardSuitNumber = 0;
	} else if (cardSuitNumberString === symbols.suits.diamonds) {
		cardSuitNumber = 1;
	} else if (cardSuitNumberString === symbols.suits.hearts) {
		cardSuitNumber = 2;
	} else if (cardSuitNumberString === symbols.suits.spades) {
		cardSuitNumber = 3;
	}

	if (cardNumber === -1 || cardSuitNumber === -1) {
		throw new Error('Invalid card String!');
	}

	return new Card(cardSuitNumber, cardNumber);
}

module.exports = { Card, cardFromString };
