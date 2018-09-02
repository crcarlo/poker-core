const verdicts = {
	royalFlush: 0,
	straightFlush: 1,
	poker: 2,
	full: 3,
	flush: 4,
	straight: 5,
	three: 6,
	twoPairs: 7,
	pair: 8,
	high: 9
};

const verdictsStrings = [
	'Royal Flush',
	'Straight Flush',
	'Four of a kind',
	'Full House',
	'Flush',
	'Straight',
	'Three of a kind',
	'Two pairs',
	'Pair',
	'High card'
];

function Verdict(hand, table) {
	this.toString = () => {
		if (this.verdict) {
			return verdictsStrings[this.verdict];
		}
	};

	const cards = hand.cards.concat(table.cards);
	cards.sort((a, b) => a.number - b.number);

	//console.log("Cards", cards);

	const cardsWithNumber = (number, someCards) =>
		someCards.filter(card => card.number === number);

	const cardsWithSeed = (seed, someCards) =>
	someCards.filter(card => card.seed === seed);

	const cardsWith = (number, seed, someCards) =>
		cardsWithSeed(seed, cardsWithNumber(number, someCards));

	const areSameSeed = someCards =>
		!!(
			someCards.reduce((acc, val) => {
				if (val.seed === acc) {
					return val.seed;
				} else {
					return null;
				}
			}, someCards[0].seed) + 1
		); // +1 because might be 0

	const sortCardsByNumberReverse = someCards =>
		someCards.sort((card1, card2) => {
			let _b = card2.number;
			let _a = card1.number;
			if (_a === 0) {
				_a = 13;
			}
			if (_b === 0) {
				_b = 13;
			}
			return _b - _a;
		});

	const areConsecutive = someCards => {
		sortCardsByNumberReverse(someCards);
		for (let i = 1; i < someCards.length; i++) {
			if (
				someCards[i].number - someCards[i - 1].number !== -1 &&
				someCards[i].number - someCards[i - 1].number !== 12
			) {
				return false;
			}
		}
		return true;
	};

	const cardsWithout = (someCards, withoutCards) =>
		someCards.filter(
			card =>
				!withoutCards.some(
					c => c.seed === card.seed && c.number === card.number
				)
		);

	// flush
	for (let i = 0; i < 4; i++) {
		let sameSeedCards = cardsWithSeed(i, cards);
		if (sameSeedCards.length === 5) {
			if (
				cardsWith(0, i, sameSeedCards).length === 1 &&
				cardsWith(12, i, sameSeedCards).length === 1 &&
				cardsWith(11, i, sameSeedCards).length === 1 &&
				cardsWith(10, i, sameSeedCards).length === 1 &&
				cardsWith(9, i, sameSeedCards).length === 1
			) {
				// ROYAL FLUSH
				this.verdict = verdicts.royalFlush;
				return;
			} else if (areConsecutive(sameSeedCards)) {
				// STRAIGHT FLUSH
				this.verdict = verdicts.straightFlush;
				this.highCards = [sortCardsByNumberReverse(sameSeedCards)[0]];
				return;
			} else {
				// FLUSH
				this.verdict = verdicts.flush;
				this.highCards = [sortCardsByNumberReverse(sameSeedCards)];
				return;
			}
		}
	}

	// multiples
	const threes = [];
	const twos = [];
	//console.log("==============================", cards);
	for (let i = 0; i < 13; i++) {
		let sameNumberCards = cardsWithNumber(i, cards);
		//console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>", sameNumberCards);
		if (sameNumberCards.length === 4) {
			// POKER
			this.verdict = verdicts.poker;
			const leftCards = sortCardsByNumberReverse(
				cardsWithout(cards, sameNumberCards)
			);
			this.highCards = [sameNumberCards[0], leftCards[0]];
			return;
		} else if (sameNumberCards.length === 3) {
			threes.push(sameNumberCards);
		} else if (sameNumberCards.length === 2) {
			twos.push(sameNumberCards);
		}
	}

	// reverse sort (0 (ace) counts as 13 (14))
	threes.sort((a, b) => {
		let _a = a[0].number;
		let _b = b[0].number;
		if (_a === 0) {
			_a = 13;
		}
		if (_b === 0) {
			_b = 13;
		}
		return _b - _a;
	});
	twos.sort((a, b) => {
		let _a = a[0].number;
		let _b = b[0].number;
		if (_a === 0) {
			_a = 13;
		}
		if (_b === 0) {
			_b = 13;
		}
		return _b - _a;
	});

	if (threes.length > 0 && twos.length > 0) {
		// FULL
		this.verdict = verdicts.full;
		this.highCards = [threes[0][0], twos[0][0]];
		return;
	}

	// check straight
	const sortedCards = sortCardsByNumberReverse(cards);
	if (areConsecutive(sortedCards.slice(0, 5))) {
		this.verdict = verdicts.straight;
		this.highCards = [sortedCards[0]];
		return;
	}
	if (areConsecutive(sortedCards.slice(1, 6))) {
		this.verdict = verdicts.straight;
		this.highCards = [sortedCards[1]];
		return;
	}
	if (areConsecutive(sortedCards.slice(2, 7))) {
		this.verdict = verdicts.straight;
		this.highCards = [sortedCards[2]];
		return;
	}
	// need check ace at the end!!

	if (threes.length > 0) {
		// THREE
		const highestThree = threes[0];
		const leftCards = sortCardsByNumberReverse(
			cardsWithout(cards, highestThree)
		);
		this.verdict = verdicts.three;
		this.highCards = [highestThree[0], leftCards[0], leftCards[1]];
		return;
	}

	if (twos.length > 1) {
		// TWO PAIRS
		const highestTwo = twos[0];
		const highestTwo1 = twos[1];
		const _leftCards = cardsWithout(cards, highestTwo);
		const leftCards = sortCardsByNumberReverse(
			cardsWithout(_leftCards, highestTwo1)
		);
		this.verdict = verdicts.twoPairs;
		this.highCards = [highestTwo[0], highestTwo1[0], leftCards[0]];
		return;
	}

	if (twos.length === 1) {
		// PAIR
		this.verdict = verdicts.pair;
		const leftCards = sortCardsByNumberReverse(
			cardsWithout(cards, twos[0])
		);
		this.highCards = [twos[0][0], leftCards[0], leftCards[1], leftCards[2]];
		return;
	}

	// HIGH CARD
	this.verdict = verdicts.high;
	this.highCards = sortCardsByNumberReverse(cards).splice(0, 5);
}

function bestHand(hands, table) {
	const verdictsFound = hands.map((hand, index) => ({
		verdict: new Verdict(hand, table),
		index
	}));
	// sort by verdict
	verdictsFound.sort(
		(ver1, ver2) => ver1.verdict.verdict - ver2.verdict.verdict
	);
	const bestVerdict = verdictsFound[0].verdict;
	const bestVerdicts = verdictsFound.filter(
		ver => ver.verdict.verdict === bestVerdict.verdict
	);
	// sort by highcards
	bestVerdicts.sort((ver1, ver2) => {
		for (let i = 0; i < ver1.verdict.highCards.length; i++) {
			const numb1 =
				ver1.verdict.highCards[i].number === 0
					? 13
					: ver1.verdict.highCards[i].number;
			const numb2 =
				ver2.verdict.highCards[i].number === 0
					? 13
					: ver2.verdict.highCards[i].number;
			if (numb1 > numb2) {
				return -1;
			} else if (numb1 < numb2) {
				return 1;
			}
		}
		return 0;
	});
	const bestVerdictOfTheBests = bestVerdicts[0].verdict;
	const bestVerdictsEver = bestVerdicts.filter(ver => {
		for (let i = 0; i < ver.verdict.highCards.length; i++) {
			if (
				ver.verdict.highCards[i].number !==
				bestVerdictOfTheBests.highCards[i].number
			) {
				return false;
			}
		}
		return true;
	});
	return bestVerdictsEver.map(ver => ver.index);
}

module.exports = {
	verdicts,
	verdictsStrings,
	Verdict,
	bestHand
};
