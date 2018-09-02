const PokerCore = require('./src/index');

const hand1 = PokerCore.handFromString('AD QC');
const hand2 = PokerCore.handFromString('2H 3D');

const table = PokerCore.tableFromString('3H KH 7D');
table.addCard(PokerCore.cardFromString('9D'));
table.addCard(PokerCore.cardFromString('10C'));

const verdict1 = new PokerCore.Verdict(hand1, table);
const verdict2 = new PokerCore.Verdict(hand2, table);

console.log(verdict1.verdict);
// 9
console.log(verdict2.verdict);
// 8

console.log(PokerCore.verdictsStrings[verdict1.verdict]);
// 'High card'
console.log(PokerCore.verdictsStrings[verdict2.verdict]);
// 'Pair'

const bestHand = PokerCore.bestHand([hand1, hand2], table);

console.log(bestHand);
// [ 1 ]

