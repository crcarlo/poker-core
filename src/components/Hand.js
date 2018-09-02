const { cardFromString } = require('./Card');

function Hand(card1, card2) {
	this.cards = [card1, card2];
}

function handFromString(handString) {
	const trimmedHandString = handString.trim();
	const handStringArray = trimmedHandString.split(' ').filter(el => el !== '');

	if (handStringArray.length !== 2) {
		throw new Error('Invalid hand string!');
	} else {
		const card1 = cardFromString(handStringArray[0]);
		const card2 = cardFromString(handStringArray[1]);

		return new Hand(card1, card2);
	}
}

module.exports = { Hand, handFromString };
