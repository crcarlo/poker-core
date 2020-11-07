const symbols = {
  suits: {
    clubs: "C",
    diamonds: "D",
    hearts: "H",
    spades: "S"
  },
  values: {
    ace: "A",
    jack: "J",
    queen: "Q",
    king: "K"
  }
};

function Card(suitId, number) {
  if (suitId < 0 || suitId > 3) {
    throw new Error("Invalid suitId number! Got number: " + suitId);
  }

  if (number < 1 || number > 13) {
    throw new Error("Invalid number for card! Got number: " + number);
  }

  this.suitId = suitId;
  this.number = number;

  this.toString = () => {
    function intToSuit(num) {
      if (num === 0) {
        return symbols.suits.clubs;
      }
      if (num === 1) {
        return symbols.suits.diamonds;
      }
      if (num === 2) {
        return symbols.suits.hearts;
      }
      if (num === 3) {
        return symbols.suits.spades;
      }
    }
    function intToValue(num) {
      if (num === 1) {
        return symbols.values.ace;
      } else if (num === 11) {
        return symbols.values.jack;
      } else if (num === 12) {
        return symbols.values.queen;
      } else if (num === 13) {
        return symbols.values.king;
      } else {
        return num + 1;
      }
    }
    return "" + intToValue(number) + intToSuit(suitId);
  };

  this.equals = otherCard =>
    otherCard.suitId === this.suitId && otherCard.number === this.number;
}

function cardFromString(cardString) {
  const cardStringTrimmed = cardString.trim();

  let cardNumberString = "";
  let cardSuitNumberString = "";

  if (cardStringTrimmed.length === 2) {
    cardNumberString = cardStringTrimmed[0];
    cardSuitNumberString = cardStringTrimmed[1];
  } else if (cardStringTrimmed.length === 3) {
    cardNumberString = cardStringTrimmed.substring(0, 2);
    cardSuitNumberString = cardStringTrimmed[2];
  } else {
    throw new Error("Invalid card String!");
  }

  let cardNumber = -1;
  let cardSuit = -1;

  if (cardNumberString === symbols.values.ace) {
    cardNumber = 1;
  } else if (cardNumberString === symbols.values.jack) {
    cardNumber = 11;
  } else if (cardNumberString === symbols.values.queen) {
    cardNumber = 12;
  } else if (cardNumberString === symbols.values.king) {
    cardNumber = 13;
  } else {
    cardNumber = parseInt(cardNumberString);
  }

  if (cardSuitNumberString === symbols.suits.clubs) {
    cardSuit = 0;
  } else if (cardSuitNumberString === symbols.suits.diamonds) {
    cardSuit = 1;
  } else if (cardSuitNumberString === symbols.suits.hearts) {
    cardSuit = 2;
  } else if (cardSuitNumberString === symbols.suits.spades) {
    cardSuit = 3;
  }

  if (cardNumber === -1 || cardSuit === -1) {
    throw new Error("Invalid card String!");
  }

  return new Card(cardSuit, cardNumber);
}

module.exports = { Card, cardFromString };
