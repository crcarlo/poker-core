const Card = require('./components/Card');
const Deck = require('./components/Deck');
const Hand = require('./components/Hand');
const Table = require('./components/Table');
const WinnerFinder = require('./util/WinnerFinder');

module.exports = { ...Card, ...Deck, ...Hand, ...Table, ...WinnerFinder };
