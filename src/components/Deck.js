const { Card } = require("./Card");

const SUITS = [
  { id: 0, name: "clubs", symbol: "C" },
  { id: 1, name: "diamonds", symbol: "D" },
  { id: 2, name: "hearts", symbol: "H" },
  { id: 3, name: "spades", symbol: "S" }
];

function Deck() {
  this.cards = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 1; j <= 13; j++) {
      this.cards.push(new Card(i, j));
    }
  }

  this.getCard = () => {
    return this.cards.splice(
      Math.floor(Math.random() * this.cards.length),
      1
    )[0];
  };
}

module.exports = { Deck, SUITS };
