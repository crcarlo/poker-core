const { Card } = require("./Card");

function Deck() {
  this.cards = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 13; j++) {
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

module.exports = { Deck };
