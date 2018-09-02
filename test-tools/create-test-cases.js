const { Deck, Hand, Table } = require('../src/index.js');

const tests = 10;

for (let i = 0; i < tests; i++) {
	const deck = new Deck();
	const hand = new Hand(deck.getCard(), deck.getCard());

	const table = new Table(deck.getCard(), deck.getCard(), deck.getCard());

	for (let j = 0; j < 2; j++) {
		table.addCard(deck.getCard());
	}

	console.log(
		",{ handCards: ['" +
			hand.cards[0] +
			"', '" +
			hand.cards[1] +
			"'],tableCards: ['" +
			table.cards[0] +
			"', '" +
			table.cards[1] +
			"', '" +
			table.cards[2] +
			"', '" +
			table.cards[3] +
			"', '" +
			table.cards[4] +
			"'],result: PokerCore.verdicts.high}"
	);
}
