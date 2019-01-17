const PokerCore = require('../../src/index');

module.exports = [
	{
		handCards: ['QD', '2C'],
		tableCards: ['6D', '8C', '5S', 'KC', '7C'],
		result: PokerCore.verdicts.high
	},
	{
		handCards: ['10H', '5S'],
		tableCards: ['2S', 'AC', '9D', '8D', 'JH'],
		result: PokerCore.verdicts.high
	},
	{
		handCards: ['2H', '8D'],
		tableCards: ['6S', '5C', 'KH', 'AC', 'QD'],
		result: PokerCore.verdicts.high
	},
	{
		handCards: ['JH', '7H'],
		tableCards: ['4C', 'AS', '5D', '9C', 'QD'],
		result: PokerCore.verdicts.high
	},
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
		handCards: ['6S', '9S'],
		tableCards: ['2H', '10H', 'QS', '3H', '2S'],
		result: PokerCore.verdicts.pair
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
		handCards: ['2D', '2D'],
		tableCards: ['3H', '4D', '9H', 'QH', '9D'],
		result: PokerCore.verdicts.twoPairs
	},
	{
		handCards: ['KS', '10S'],
		tableCards: ['QS', '4S', 'QC', '3D', '10C'],
		result: PokerCore.verdicts.twoPairs
	},
	{
		handCards: ['AS', '9C'],
		tableCards: ['9H', 'AD', '5C', 'QC', 'QS'],
		result: PokerCore.verdicts.twoPairs
	},
	{
		handCards: ['AS', '5D'],
		tableCards: ['3S', 'AH', '7C', '6H', 'AD'],
		result: PokerCore.verdicts.three
	},
	{
		handCards: ['QD', '5S'],
		tableCards: ['2C', '5C', '6D', '8S', '5H'],
		result: PokerCore.verdicts.three
	},
	{
		handCards: ['4H', '2C'],
		tableCards: ['8C', '3C', '4C', '2S', '8S'],
		result: PokerCore.verdicts.twoPairs
	},
	{
		handCards: ['3C', '8D'],
		tableCards: ['6D', '2C', '3H', 'AH', 'AD'],
		result: PokerCore.verdicts.twoPairs
	},
	{
		handCards: ['3C', '5S'],
		tableCards: ['4S', '6C', 'JH', '7S', '8D'],
		result: PokerCore.verdicts.straight
	},
	{
		handCards: ['6C', 'AH'],
		tableCards: ['KS', 'QC', '4S', 'JD', '10S'],
		result: PokerCore.verdicts.straight
	},
	{
		handCards: ['AC', '2H'],
		tableCards: ['QC', 'KH', 'QH', 'JH', '10H'],
		result: PokerCore.verdicts.flush
	},
	{
		handCards: ['2D', '2D'],
		tableCards: ['3H', '4D', '9H', 'QD', '9D'],
		result: PokerCore.verdicts.flush
	},
	{
		handCards: ['QD', 'QS'],
		tableCards: ['3H', 'QH', '4S', '4H', '9D'],
		result: PokerCore.verdicts.full
	},
	{
		handCards: ['9C', '7D'],
		tableCards: ['7C', '2D', '7S', 'AS', '7H'],
		result: PokerCore.verdicts.poker
	},
	{
		handCards: ['6C', 'AS'],
		tableCards: ['KS', 'QS', '4S', 'JS', '10S'],
		result: PokerCore.verdicts.royalFlush
	},
	{
		handCards: ['6C', 'AH'],
		tableCards: ['KH', 'QC', 'QH', 'JH', '10H'],
		result: PokerCore.verdicts.royalFlush
	}
];
