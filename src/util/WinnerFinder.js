const { SUITS } = require("../components/Deck");

const HAND_VALUES = {
  ROYAL_FLUSH: 0,
  STRAIGHT_FLUSH: 1,
  POKER: 2,
  FULL: 3,
  FLUSH: 4,
  STRAIGHT: 5,
  THREE: 6,
  TWO_PAIRS: 7,
  PAIR: 8,
  HIGH: 9
};

const HAND_VALUES_STRINGS = [
  "Royal Flush",
  "Straight Flush",
  "Four of a kind",
  "Full House",
  "Flush",
  "Straight",
  "Three of a kind",
  "Two pairs",
  "Pair",
  "High card"
];

function HandValue(hand, table) {
  this.toString = () => {
    if (this.handValue) {
      return HAND_VALUES_STRINGS[this.handValue];
    }
  };

  const cards = hand.cards.concat(table.cards);
  cards.sort((a, b) => a.number - b.number);

  const cardsWithNumber = (number, someCards) =>
    someCards.filter(card => card.number === number);

  const cardsWithSuit = (suit, someCards) =>
    someCards.filter(card => card.suitId === suit);

  const cardsWith = (number, suit, someCards) =>
    cardsWithSuit(suit, cardsWithNumber(number, someCards));

  const sortCardsByNumberReverse = someCards =>
    someCards.sort((card1, card2) => {
      let _b = card2.number;
      let _a = card1.number;
      if (_a === 1) {
        _a = 14;
      }
      if (_b === 1) {
        _b = 14;
      }
      return _b - _a;
    });

  const areConsecutive = someCards => {
    sortCardsByNumberReverse(someCards);
    for (let i = 1; i < someCards.length; i++) {
      if (
        someCards[i].number - someCards[i - 1].number !== -1 &&
        someCards[i].number - someCards[i - 1].number !== 12
      ) {
        return false;
      }
    }
    return true;
  };

  const areFiveConsecutive = someCards => {
    if (someCards.length < 5) {
      return false;
    }
    sortCardsByNumberReverse(someCards);
    for (let i = 0; i < someCards.length - 4; i++) {
      if (areConsecutive(someCards.splice(i, 5))) {
        return true;
      }
    }

    return false;
  };

  const cardsWithout = (someCards, withoutCards) =>
    someCards.filter(
      card =>
        !withoutCards.some(
          c => c.suitId === card.suitId && c.number === card.number
        )
    );

  // flushes
  for (const suit of SUITS) {
    const sameSuitCards = cardsWithSuit(suit.id, cards);
    if (sameSuitCards.length >= 5) {
      if (
        cardsWith(1, suit.id, sameSuitCards).length === 1 &&
        cardsWith(13, suit.id, sameSuitCards).length === 1 &&
        cardsWith(12, suit.id, sameSuitCards).length === 1 &&
        cardsWith(11, suit.id, sameSuitCards).length === 1 &&
        cardsWith(10, suit.id, sameSuitCards).length === 1
      ) {
        // ROYAL FLUSH
        this.handValue = HAND_VALUES.ROYAL_FLUSH;
        return;
      } else if (areFiveConsecutive(sameSuitCards)) {
        // STRAIGHT FLUSH
        this.handValue = HAND_VALUES.STRAIGHT_FLUSH;
        this.highCards = [sortCardsByNumberReverse(sameSuitCards)[0]];
        return;
      } else {
        // FLUSH
        this.handValue = HAND_VALUES.FLUSH;
        this.highCards = [sortCardsByNumberReverse(sameSuitCards)];
        return;
      }
    }
  }

  // multiples of a kind
  const threes = [];
  const twos = [];
  for (let i = 1; i <= 13; i++) {
    let sameNumberCards = cardsWithNumber(i, cards);
    if (sameNumberCards.length === 4) {
      // POKER
      this.handValue = HAND_VALUES.POKER;
      const leftCards = sortCardsByNumberReverse(
        cardsWithout(cards, sameNumberCards)
      );
      this.highCards = [sameNumberCards[0], leftCards[0]];
      return;
    } else if (sameNumberCards.length === 3) {
      threes.push(sameNumberCards);
    } else if (sameNumberCards.length === 2) {
      twos.push(sameNumberCards);
    }
  }

  // reverse sort (1 (ace) counts as 14)
  threes.sort((a, b) => {
    let _a = a[0].number;
    let _b = b[0].number;
    if (_a === 1) {
      _a = 14;
    }
    if (_b === 1) {
      _b = 14;
    }
    return _b - _a;
  });
  twos.sort((a, b) => {
    let _a = a[0].number;
    let _b = b[0].number;
    if (_a === 1) {
      _a = 14;
    }
    if (_b === 1) {
      _b = 14;
    }
    return _b - _a;
  });

  if (threes.length > 0 && twos.length > 0) {
    // FULL
    this.handValue = HAND_VALUES.FULL;
    this.highCards = [threes[0][0], twos[0][0]];
    return;
  }

  // check STRAIGHT
  const sortedCards = sortCardsByNumberReverse(cards);
  if (areConsecutive(sortedCards.slice(0, 5))) {
    this.handValue = HAND_VALUES.STRAIGHT;
    this.highCards = [sortedCards[0]];
    return;
  }
  if (areConsecutive(sortedCards.slice(1, 6))) {
    this.handValue = HAND_VALUES.STRAIGHT;
    this.highCards = [sortedCards[1]];
    return;
  }
  if (areConsecutive(sortedCards.slice(2, 7))) {
    this.handValue = HAND_VALUES.STRAIGHT;
    this.highCards = [sortedCards[2]];
    return;
  }
  // need check ace at the end!!

  if (threes.length > 0) {
    // THREE
    const highestThree = threes[0];
    const leftCards = sortCardsByNumberReverse(
      cardsWithout(cards, highestThree)
    );
    this.handValue = HAND_VALUES.THREE;
    this.highCards = [highestThree[0], leftCards[0], leftCards[1]];
    return;
  }

  if (twos.length > 1) {
    // TWO PAIRS
    const highestTwo = twos[0];
    const highestTwo1 = twos[1];
    const _leftCards = cardsWithout(cards, highestTwo);
    const leftCards = sortCardsByNumberReverse(
      cardsWithout(_leftCards, highestTwo1)
    );
    this.handValue = HAND_VALUES.TWO_PAIRS;
    this.highCards = [highestTwo[0], highestTwo1[0], leftCards[0]];
    return;
  }

  if (twos.length === 1) {
    // PAIR
    this.handValue = HAND_VALUES.PAIR;
    const leftCards = sortCardsByNumberReverse(cardsWithout(cards, twos[0]));
    this.highCards = [twos[0][0], leftCards[0], leftCards[1], leftCards[2]];
    return;
  }

  // HIGH CARD
  this.handValue = HAND_VALUES.HIGH;
  this.highCards = sortCardsByNumberReverse(cards).splice(0, 5);
}

function bestHand(hands, table) {
  const handValuesFound = hands.map((hand, index) => ({
    handValue: new HandValue(hand, table),
    index
  }));
  // sort by handValue
  handValuesFound.sort(
    (hv1, hv2) => hv1.handValue.handValue - hv2.handValue.handValue
  );
  const bestHandValueByType = handValuesFound[0].handValue;
  const bestHandValuesByType = handValuesFound.filter(
    ver => ver.handValue.handValue === bestHandValueByType.handValue
  );
  // sort by highcards
  bestHandValuesByType.sort((hv1, hv2) => {
    for (let i = 0; i < hv1.handValue.highCards.length; i++) {
      const numb1 =
        hv1.handValue.highCards[i].number === 1
          ? 14
          : hv1.handValue.highCards[i].number;
      const numb2 =
        hv2.handValue.highCards[i].number === 1
          ? 14
          : hv2.handValue.highCards[i].number;
      if (numb1 > numb2) {
        return -1;
      } else if (numb1 < numb2) {
        return 1;
      }
    }
    return 0;
  });
  const bestHandValueOfTheBests = bestHandValuesByType[0].handValue;
  const bestHandValuesEver = bestHandValuesByType.filter(ver => {
    for (let i = 0; i < ver.handValue.highCards.length; i++) {
      if (
        ver.handValue.highCards[i].number !==
        bestHandValueOfTheBests.highCards[i].number
      ) {
        return false;
      }
    }
    return true;
  });
  return bestHandValuesEver.map(ver => ver.index);
}

module.exports = {
  HAND_VALUES,
  HAND_VALUES_STRINGS,
  HandValue,
  bestHand
};
