const assert = require("assert");
const PokerCore = require("../src/index");
const cardsStringTests = require("./tests/cardsStringTests");
const handValueTests = require("./tests/handValueTests");
const gameTests = require("./tests/gameTests");

describe("Card", function() {
  describe("cardFromString()", function() {
    cardsStringTests.forEach(test => {
      it("Should work", function() {
        assert.strictEqual(
          PokerCore.cardFromString(test.cardString).equals(
            new PokerCore.Card(test.suitId, test.cardNumber)
          ),
          true
        );
      });
    });
  });
});

describe("Hand", function() {
  describe("handFromString()", function() {
    it("Should work", function() {
      const hand1 = PokerCore.handFromString("AC 5D");
      const hand2 = new PokerCore.Hand(
        PokerCore.cardFromString("AC"),
        PokerCore.cardFromString("5D")
      );
      assert.deepStrictEqual(
        hand1.cards[0].cardNumber,
        hand2.cards[0].cardNumber
      );
      assert.deepStrictEqual(
        hand1.cards[0].suitId,
        hand2.cards[0].suitId
      );
      assert.deepStrictEqual(
        hand1.cards[1].cardNumber,
        hand2.cards[1].cardNumber
      );
      assert.deepStrictEqual(
        hand1.cards[1].suitId,
        hand2.cards[1].suitId
      );
    });
  });
});

describe("Table", function() {
  describe("tableFromString()", function() {
    it("Should work", function() {
      const table1 = PokerCore.tableFromString("AC 5D  2C");
      const table2 = new PokerCore.Table(
        PokerCore.cardFromString("AC"),
        PokerCore.cardFromString("5D"),
        PokerCore.cardFromString("2C")
      );
      assert.deepStrictEqual(
        table1.cards[0].cardNumber,
        table2.cards[0].cardNumber
      );
      assert.deepStrictEqual(
        table1.cards[0].suitId,
        table2.cards[0].suitId
      );
      assert.deepStrictEqual(
        table1.cards[1].cardNumber,
        table2.cards[1].cardNumber
      );
      assert.deepStrictEqual(
        table1.cards[1].suitId,
        table2.cards[1].suitId
      );
    });
  });
});

describe("Match resolution", function() {
  describe("HandValue", function() {
    handValueTests.forEach(test => {
      it(`For ${test.handCards},${test.tableCards} should find "${
        PokerCore.HAND_VALUES_STRINGS[test.result]
      }"`, function() {
        const handValue = new PokerCore.HandValue(
          new PokerCore.Hand(
            PokerCore.cardFromString(test.handCards[0]),
            PokerCore.cardFromString(test.handCards[1])
          ),
          new PokerCore.Table(
            PokerCore.cardFromString(test.tableCards[0]),
            PokerCore.cardFromString(test.tableCards[1]),
            PokerCore.cardFromString(test.tableCards[2])
          )
            .addCard(PokerCore.cardFromString(test.tableCards[3]))
            .addCard(PokerCore.cardFromString(test.tableCards[4]))
        );
        assert.strictEqual(handValue.handValue, test.result);
      });
    });
  });

  describe("bestHand()", function() {
    gameTests.forEach(test => {
      it(`For hands ${JSON.stringify(test.hands)} and table ${test.table} ${
        test.tableCards[0]
      } ${test.tableCards[1]} should find ${JSON.stringify(
        test.result
      )}`, function() {
        const hands = test.hands.map(handString =>
          PokerCore.handFromString(handString)
        );
        const table = PokerCore.tableFromString(test.table);

        table.addCard(PokerCore.cardFromString(test.tableCards[0]));
        table.addCard(PokerCore.cardFromString(test.tableCards[1]));

        const bestHand = PokerCore.bestHand(hands, table);

        assert.deepStrictEqual(bestHand, test.result);
      });
    });
  });
});
