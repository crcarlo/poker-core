const assert = require('assert');
const PokerCore = require('../src/index');
const verdictTests = require('./tests/verdictTests');
const cardsStringTests = require('./tests/cardsStringTests');

describe('Card', function() {
	describe('cardFromString()', function() {
		cardsStringTests.forEach(test => {
			it('Should work', function() {
				assert.equal(
					PokerCore.cardFromString(test.cardString).equals(
						new PokerCore.Card(test.seedNumber, test.cardNumber)
					),
					true
				);
			});
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
				'For '.concat(test.handCards) +
					','.concat(test.tableCards) +
					' should find "' +
					PokerCore.verdictsStrings[test.result] +
					'"',
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
