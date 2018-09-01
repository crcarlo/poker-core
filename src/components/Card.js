const symbols = {
	seeds: {
		clubs : "C",
		diamonds: "D",
		hearts: "H",
		spades : "S"
	},
	values: { 
		ace: "A",
		jack: "J",
		queen: "Q",
		king: "K"
	}
};

function Card(seed, number) {
	if (seed < 0 || seed > 3) {
		throw new Error("Invalid seed number! Got number: " + seed);
	}

	if (number < 0 || number > 12) {
		throw new Error("Invalid number for card! Got number: " + number);
	}

	this.seed = seed;
	this.number = number;

	this.toString = () => {
		function intToSeed(num) {
			if (num === 0) {
				return symbols.seeds.clubs;
			}
			if (num === 1) {
				return symbols.seeds.diamonds;
			}
			if (num === 2) {
				return symbols.seeds.hearts;
			}
			if (num === 3) {
				return symbols.seeds.spades;
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
		return "" + intToValue(number) + intToSeed(seed);
	};

	this.equals = (otherCard) => 
		otherCard.seed === this.seed &&
		otherCard.number === this.number;
}

function cardFromString(cardString) {
	const cardStringTrimmed = cardString.trim();

	var cardNumberString = ""
	var cardSeedNumberString = "";

	if (cardStringTrimmed.length === 2) {
		cardNumberString = cardStringTrimmed[0];
		cardSeedNumberString = cardStringTrimmed[1];
	} else if (cardStringTrimmed.length === 3) {
		cardNumberString = cardStringTrimmed.substring(0, 2);
		cardSeedNumberString = cardStringTrimmed[2];
	} else {
		throw new Error("Invalid card String!");
	}

	let cardNumber = -1;
	let cardSeedNumber = -1;

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

	if (cardSeedNumberString === symbols.seeds.clubs) {
		cardSeedNumber = 0;
	} else if (cardSeedNumberString === symbols.seeds.diamonds) {
		cardSeedNumber = 1;
	} else if (cardSeedNumberString === symbols.seeds.hearts) {
		cardSeedNumber = 2;
	} else if (cardSeedNumberString === symbols.seeds.spades) {
		cardSeedNumber = 3;
	}

	if (cardNumber === -1 || cardSeedNumber === -1) {
		throw new Error("Invalid card String!");
	}

	return new Card(cardSeedNumber, cardNumber);
}

module.exports = { Card, cardFromString };
