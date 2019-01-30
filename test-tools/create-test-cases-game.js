const { Deck, Hand, Table } = require("../src/index.js");

const tests = 10;

for (let i = 0; i < tests; i++) {
  const deck = new Deck();
  const handsNumber = 3;
  const hands = [];

  for (let i = 0; i < handsNumber; i++) {
    const hand = new Hand(deck.getCard(), deck.getCard());
    hands.push(hand);
  }

  const table = new Table(deck.getCard(), deck.getCard(), deck.getCard());
  for (let j = 0; j < 2; j++) {
    table.addCard(deck.getCard());
  }

  const handsStringsArray = [];
  hands.forEach(hand => {
    handsStringsArray.push(`${hand.cards[0]} ${hand.cards[1]}`);
  });
  const handsString = JSON.stringify(handsStringsArray);
  const tableString = `${table.cards[0]} ${table.cards[1]} ${table.cards[2]}`;
  const tableCardsStrings = `[ "${table.cards[3]}", "${table.cards[4]}" ]`;

  console.log(
    `,{
			hands: ${handsString},
			table: "${tableString}",
			tableCards: ${tableCardsStrings},
			result: ?
		}`
  );
}
