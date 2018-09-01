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

module.exports = { Table };
