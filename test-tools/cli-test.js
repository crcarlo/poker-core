const { Deck, Table, Hand, Card, HandValue, bestHand } = require("../src/index");

for (let i = 0; i < 100; i++) {
  const deck = new Deck();
  const hands = [
    new Hand(deck.getCard(), deck.getCard()),
    new Hand(deck.getCard(), deck.getCard())
  ];
  const table = new Table(deck.getCard(), deck.getCard(), deck.getCard());

  for (let j = 0; j < 2; j++) {
    table.addCard(deck.getCard());
  }

  console.log("==========================");
  console.log("TABLE: ");
  for (let j = 0; j < 5; j++) {
    console.log(table.cards[j].toString());
  }
  console.log("==========================");

  for (let k = 0; k < hands.length; k++) {
    console.log("HAND " + k + ": ");
    for (let j = 0; j < 2; j++) {
      console.log(hands[k].cards[j].toString());
    }
    const handValue = new HandValue(hands[k], table);
    console.log("HAND VALUE: " + handValue.toString());
    console.log("HIGH CARDS: " + handValue.highCards);
    console.log("--------------------------");
  }

  console.log("==========================");
  console.log(">>>WINNERS: " + bestHand(hands, table));
  console.log("==========================");
}
