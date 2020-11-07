const PokerCore = require("../src/index");

const hand1 = PokerCore.handFromString("AD QC");
const hand2 = PokerCore.handFromString("2H 3D");
const hand3 = PokerCore.handFromString("2D 3C");

const table = PokerCore.tableFromString("3H KH 7D");
table.addCard(PokerCore.cardFromString("9D"));
table.addCard(PokerCore.cardFromString("10C"));

const handValue1 = new PokerCore.HandValue(hand1, table);
const handValue2 = new PokerCore.HandValue(hand2, table);
const handValue3 = new PokerCore.HandValue(hand3, table);

console.log(handValue1.handValue);
// 9
console.log(handValue2.handValue);
// 8
console.log(handValue3.handValue);
// 8

console.log(PokerCore.HAND_VALUES_STRINGS[handValue1.handValue]);
// 'High card'
console.log(PokerCore.HAND_VALUES_STRINGS[handValue2.handValue]);
// 'Pair'
console.log(PokerCore.HAND_VALUES_STRINGS[handValue3.handValue]);
// 'Pair'

const bestHand = PokerCore.bestHand([hand1, hand2, hand3], table);

console.log(bestHand);
// [ 1, 2 ]
