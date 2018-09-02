const assert = require('assert');
const PokerCore = require('../src/index');
const verdictTests = require('./tests/verdictTests');

describe('Card', function() {
	describe('cardFromString()', function() {
		it('Should work', function() {
			assert.equal(
				PokerCore.cardFromString(' AD ').equals(new PokerCore.Card(1, 0)),
				true
			);
			assert.equal(
				PokerCore.cardFromString(' 2C').equals(new PokerCore.Card(0, 1)),
				true
			);
			assert.equal(
				PokerCore.cardFromString('7H ').equals(new PokerCore.Card(2, 6)),
				true
			);
			assert.equal(
				PokerCore.cardFromString('KD').equals(new PokerCore.Card(1, 12)),
				true
			);
			assert.equal(
				PokerCore.cardFromString('10D').equals(new PokerCore.Card(1, 9)),
				true
			);
		});
	});
});

describe('Hand', function() {
	describe('handFromString()', function() {
		it('Should work', function() {
			const hand1 = PokerCore.handFromString('AC 5D');
			const hand2 = new PokerCore.Hand(
				PokerCore.cardFromString('AC'),
				PokerCore.cardFromString('5D')
			);
			assert.equal(hand1.cards[0].equals(hand2.cards[0]), true);
			assert.equal(hand1.cards[1].equals(hand2.cards[1]), true);
		});
	});
});

describe('Table', function() {
	describe('tableFromString()', function() {
		it('Should work', function() {
			const table1 = PokerCore.tableFromString('AC 5D  2C');
			const table2 = new PokerCore.Table(
				PokerCore.cardFromString('AC'),
				PokerCore.cardFromString('5D'),
				PokerCore.cardFromString('2C')
			);
			assert.equal(table1.cards[0].equals(table2.cards[0]), true);
			assert.equal(table1.cards[1].equals(table2.cards[1]), true);
		});
	});
});

describe('Match resolution', function() {
	describe('Verdict', function() {
		verdictTests.forEach(test => {
			it(
				'Should find "' +
					PokerCore.verdictsStrings[test.result] +
					'" for '.concat(test.handCards) +
					','.concat(test.tableCards),
				function() {
					assert.equal(
						new PokerCore.Verdict(
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
						).verdict,
						test.result
					);
				}
			);
		});
	});
});
