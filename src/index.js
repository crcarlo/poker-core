const Card = require("./components/Card");
const Deck = require("./components/Deck");
const Hand = require("./components/Hand");
const Table = require("./components/Table");
const WinnerFinder = require("./util/WinnerFinder");

var exportModule = {};

exportModule = mergeExports(Card, exportModule);
exportModule = mergeExports(Deck, exportModule);
exportModule = mergeExports(Hand, exportModule);
exportModule = mergeExports(Table, exportModule);
exportModule = mergeExports(WinnerFinder, exportModule);

function mergeExports(singleModule, exportModule) {
	Object.keys(singleModule).forEach(function(key) {
		exportModule[key] = singleModule[key];
	});

	return exportModule;
}

module.exports = exportModule;