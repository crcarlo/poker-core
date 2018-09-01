const Card = require('./Card');

function Hand(card1, card2) {
	this.cards = [card1, card2];
}

module.exports = { Hand };
