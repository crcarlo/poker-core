const assert = require('assert');
const PokerCore = require('../src/index');

describe('Card', function() {
	describe('cardFromString()', function() {
		it('should construct correctly', function() {
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

describe('Match resolution', function() {
	describe('Verdict', function() {
		const tests = [
			{
				handCards: ['AD', 'AC'],
				tableCards: ['2D', '4C', 'KH', 'QD', '10D'],
				result: PokerCore.verdicts.pair
			},
			{
				handCards: ['2D', 'AC'],
				tableCards: ['2H', '4C', 'KH', 'QD', '10D'],
				result: PokerCore.verdicts.pair
			},
			{
				handCards: ['2D', 'AC'],
				tableCards: ['3H', '4C', '3H', 'QD', '10D'],
				result: PokerCore.verdicts.pair
			},
			{
				handCards: ['2D', '2D'],
				tableCards: ['3H', '4D', '9H', 'QH', '9D'],
				result: PokerCore.verdicts.twoPairs
			},
			{
				handCards: ['2D', '2D'],
				tableCards: ['3H', '4D', '9H', 'QD', '9D'],
				result: PokerCore.verdicts.flush
			}
		];

		tests.forEach(test => {
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
