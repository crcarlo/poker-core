# poker-core

This is a **lightweight** (no dependencies), **reliable** (has tests) and **easy to use** (you can judge) library for finding a winner in a Texas Hold'em game with `Node.js`.

## Installing

Just run

```
npm install --save poker-core
```

## Use example

Here's a simple usage example, just to introduce you to this library.

```js
const PokerCore = require('poker-core');

const hand1 = PokerCore.handFromString('AD QC');
const hand2 = PokerCore.handFromString('2H 3D');
const table = PokerCore.tableFromString('3H KH 7D');

table.addCard(PokerCore.cardFromString('9D'));
table.addCard(PokerCore.cardFromString('10C'));

const handValue1 = new PokerCore.HandValue(hand1, table);
const handValue2 = new PokerCore.HandValue(hand2, table);

console.log(handValue1.handValue);
// 9
console.log(handValue2.handValue);
// 8

console.log(PokerCore.HAND_VALUES_STRINGS[handValue1.handValue]);
// 'High card'
console.log(PokerCore.HAND_VALUES_STRINGS[handValue2.handValue]);
// 'Pair'

const bestHand = PokerCore.bestHand([hand1, hand2], table);

console.log(bestHand);
// [ 1 ]
```

## Documentation

...TODO