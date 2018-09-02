const { cardFromString } = require('./Card');

function Table(card1, card2, card3) {
	this.cards = [card1, card2, card3];

	this.addCard = card => {
		if (this.cards.length >= 5) {
			throw new Error('Cannot add another card to the table!');
		} else {
			this.cards.push(card);
		}

		return this;
	};

	this.isFull = () => {
		if (this.cards.length >= 5) {
			return true;
		} else {
			return false;
		}
	};
}

function tableFromString(tableString) {
	const trimmedTableString = tableString.trim();
	const tableStringArray = trimmedTableString
		.split(' ')
		.filter(el => el !== '');

	if (tableStringArray.length !== 3) {
		throw new Error('Invalid table string!');
	} else {
		const card1 = cardFromString(tableStringArray[0]);
		const card2 = cardFromString(tableStringArray[1]);
		const card3 = cardFromString(tableStringArray[2]);

		return new Table(card1, card2, card3);
	}
}

module.exports = { Table, tableFromString };
