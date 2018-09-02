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
			},
			{
				handCards: ['QD', '2C'],
				tableCards: ['6D', '8C', '5S', 'KC', '7C'],
				result: PokerCore.verdicts.high
			},
			{
				handCards: ['2H', '8D'],
				tableCards: ['6S', '5C', 'KH', 'AC', 'QD'],
				result: PokerCore.verdicts.high
			},
			{
				handCards: ['AS', '5D'],
				tableCards: ['3S', 'AH', '7C', '6H', 'AD'],
				result: PokerCore.verdicts.three
			},
			{
				handCards: ['10S', '10C'],
				tableCards: ['QS', '9S', '4C', '6S', '8H'],
				result: PokerCore.verdicts.pair
			},
			{
				handCards: ['9S', '3C'],
				tableCards: ['4C', '10D', '5C', '6S', '10H'],
				result: PokerCore.verdicts.pair
			},
			{
				handCards: ['5D', '4H'],
				tableCards: ['JH', '7H', '9D', 'KD', 'JC'],
				result: PokerCore.verdicts.pair
			},
			{
				handCards: ['10H', '5S'],
				tableCards: ['2S', 'AC', '9D', '8D', 'JH'],
				result: PokerCore.verdicts.high
			},
			{
				handCards: ['4H', '2C'],
				tableCards: ['8C', '3C', '4C', '2S', '8S'],
				result: PokerCore.verdicts.twoPairs
			},
			{
				handCards: ['JH', '7H'],
				tableCards: ['4C', 'AS', '5D', '9C', 'QD'],
				result: PokerCore.verdicts.high
			},
			{
				handCards: ['3C', '8D'],
				tableCards: ['6D', '2C', '3H', 'AH', 'AD'],
				result: PokerCore.verdicts.twoPairs
			},
			{
				handCards: ['6S', '9S'],
				tableCards: ['2H', '10H', 'QS', '3H', '2S'],
				result: PokerCore.verdicts.pair
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
