const PokerCore = require("../../src/index");

module.exports = [
  {
    handCards: ["QD", "2C"],
    tableCards: ["6D", "8C", "5S", "KC", "7C"],
    result: PokerCore.HAND_VALUES.HIGH
  },
  {
    handCards: ["10H", "5S"],
    tableCards: ["2S", "AC", "9D", "8D", "JH"],
    result: PokerCore.HAND_VALUES.HIGH
  },
  {
    handCards: ["2H", "8D"],
    tableCards: ["6S", "5C", "KH", "AC", "QD"],
    result: PokerCore.HAND_VALUES.HIGH
  },
  {
    handCards: ["JH", "7H"],
    tableCards: ["4C", "AS", "5D", "9C", "QD"],
    result: PokerCore.HAND_VALUES.HIGH
  },
  {
    handCards: ["QH", "KS"],
    tableCards: ["2S", "5C", "7S", "9H", "3S"],
    result: PokerCore.HAND_VALUES.HIGH
  },
  {
    handCards: ["JC", "3H"],
    tableCards: ["2C", "10S", "AS", "7H", "9D"],
    result: PokerCore.HAND_VALUES.HIGH
  },
  {
    handCards: ["AD", "AC"],
    tableCards: ["2D", "4C", "KH", "QD", "10D"],
    result: PokerCore.HAND_VALUES.PAIR
  },
  {
    handCards: ["2D", "AC"],
    tableCards: ["2H", "4C", "KH", "QD", "10D"],
    result: PokerCore.HAND_VALUES.PAIR
  },
  {
    handCards: ["2D", "AC"],
    tableCards: ["3H", "4C", "3H", "QD", "10D"],
    result: PokerCore.HAND_VALUES.PAIR
  },
  {
    handCards: ["6S", "9S"],
    tableCards: ["2H", "10H", "QS", "3H", "2S"],
    result: PokerCore.HAND_VALUES.PAIR
  },
  {
    handCards: ["10S", "10C"],
    tableCards: ["QS", "9S", "4C", "6S", "8H"],
    result: PokerCore.HAND_VALUES.PAIR
  },
  {
    handCards: ["9S", "3C"],
    tableCards: ["4C", "10D", "5C", "6S", "10H"],
    result: PokerCore.HAND_VALUES.PAIR
  },
  {
    handCards: ["5D", "4H"],
    tableCards: ["JH", "7H", "9D", "KD", "JC"],
    result: PokerCore.HAND_VALUES.PAIR
  },
  {
    handCards: ["4C", "3H"],
    tableCards: ["7D", "AS", "QS", "6H", "3D"],
    result: PokerCore.HAND_VALUES.PAIR
  },
  {
    handCards: ["AC", "KC"],
    tableCards: ["2H", "10S", "4S", "QC", "10C"],
    result: PokerCore.HAND_VALUES.PAIR
  },
  {
    handCards: ["2D", "2D"],
    tableCards: ["3H", "4D", "9H", "QH", "9D"],
    result: PokerCore.HAND_VALUES.TWO_PAIRS
  },
  {
    handCards: ["KS", "10S"],
    tableCards: ["QS", "4S", "QC", "3D", "10C"],
    result: PokerCore.HAND_VALUES.TWO_PAIRS
  },
  {
    handCards: ["AS", "9C"],
    tableCards: ["9H", "AD", "5C", "QC", "QS"],
    result: PokerCore.HAND_VALUES.TWO_PAIRS
  },
  {
    handCards: ["KC", "JC"],
    tableCards: ["9D", "7C", "5H", "9S", "7S"],
    result: PokerCore.HAND_VALUES.TWO_PAIRS
  },
  {
    handCards: ["AS", "8D"],
    tableCards: ["KH", "KD", "3D", "4S", "3C"],
    result: PokerCore.HAND_VALUES.TWO_PAIRS
  },
  {
    handCards: ["AH", "QC"],
    tableCards: ["AD", "3S", "3H", "9D", "JS"],
    result: PokerCore.HAND_VALUES.TWO_PAIRS
  },
  {
    handCards: ["AS", "5D"],
    tableCards: ["3S", "AH", "7C", "6H", "AD"],
    result: PokerCore.HAND_VALUES.THREE
  },
  {
    handCards: ["QD", "5S"],
    tableCards: ["2C", "5C", "6D", "8S", "5H"],
    result: PokerCore.HAND_VALUES.THREE
  },
  {
    handCards: ["4H", "2C"],
    tableCards: ["8C", "3C", "4C", "2S", "8S"],
    result: PokerCore.HAND_VALUES.TWO_PAIRS
  },
  {
    handCards: ["3C", "8D"],
    tableCards: ["6D", "2C", "3H", "AH", "AD"],
    result: PokerCore.HAND_VALUES.TWO_PAIRS
  },
  {
    handCards: ["3C", "5S"],
    tableCards: ["4S", "6C", "JH", "7S", "8D"],
    result: PokerCore.HAND_VALUES.STRAIGHT
  },
  {
    handCards: ["6C", "AH"],
    tableCards: ["KS", "QC", "4S", "JD", "10S"],
    result: PokerCore.HAND_VALUES.STRAIGHT
  },
  {
    handCards: ["9S", "8C"],
    tableCards: ["7S", "7D", "JH", "AH", "10S"],
    result: PokerCore.HAND_VALUES.STRAIGHT
  },
  {
    handCards: ["AC", "2H"],
    tableCards: ["QC", "KH", "QH", "JH", "10H"],
    result: PokerCore.HAND_VALUES.FLUSH
  },
  {
    handCards: ["2D", "2D"],
    tableCards: ["3H", "4D", "9H", "QD", "9D"],
    result: PokerCore.HAND_VALUES.FLUSH
  },
  {
    handCards: ["QD", "QS"],
    tableCards: ["3H", "QH", "4S", "4H", "9D"],
    result: PokerCore.HAND_VALUES.FULL
  },
  {
    handCards: ["JS", "7D"],
    tableCards: ["5C", "AC", "JD", "AD", "JC"],
    result: PokerCore.HAND_VALUES.FULL
  },
  {
    handCards: ["AS", "8H"],
    tableCards: ["8C", "9H", "8D", "9D", "AD"],
    result: PokerCore.HAND_VALUES.FULL
  },
  {
    handCards: ["9C", "7D"],
    tableCards: ["7C", "2D", "7S", "AS", "7H"],
    result: PokerCore.HAND_VALUES.POKER
  },
  {
    handCards: ["8D", "2D"],
    tableCards: ["7D", "6D", "AS", "4D", "5D"],
    result: PokerCore.HAND_VALUES.STRAIGHT_FLUSH
  },
  {
    handCards: ["6C", "AS"],
    tableCards: ["KS", "QS", "4S", "JS", "10S"],
    result: PokerCore.HAND_VALUES.ROYAL_FLUSH
  },
  {
    handCards: ["6C", "AH"],
    tableCards: ["KH", "QC", "QH", "JH", "10H"],
    result: PokerCore.HAND_VALUES.ROYAL_FLUSH
  }
];
