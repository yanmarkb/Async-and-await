//Part 1

async function getFact() {
	try {
		let response = await fetch("http://numbersapi.com/7?json");
		let data = await response.json();
		console.log(data.text);
	} catch (err) {
		console.log(err);
	}
}

getFact();

async function getMultipleFacts() {
	try {
		let response = await fetch("http://numbersapi.com/1,2,3?json");
		let data = await response.json();
		console.log(data);
		for (let num in data) {
			console.log(`${num}: ${data[num].text}`);
		}
	} catch (err) {
		console.log(err);
	}
}

getMultipleFacts();

async function getFourFacts() {
	let promises = [];
	for (let i = 0; i < 4; i++) {
		promises.push(fetch("http://numbersapi.com/7?json"));
	}

	try {
		let responses = await Promise.all(promises);
		let facts = await Promise.all(responses.map((response) => response.json()));
		for (let fact of facts) {
			console.log(fact.text);
		}
	} catch (err) {
		console.log(err);
	}
}

getFourFacts();

//Part 2

async function getCard() {
	try {
		let response = await fetch(
			"https://deckofcardsapi.com/api/deck/new/draw/?count=1"
		);
		let data = await response.json();
		let card = data.cards[0];
		console.log(`${card.value} of ${card.suit}`);
	} catch (err) {
		console.log(err);
	}
}

getCard();

async function getTwoCards() {
	try {
		let response = await fetch(
			"https://deckofcardsapi.com/api/deck/new/draw/?count=1"
		);
		let data = await response.json();
		let deckId = data.deck_id;
		let card1 = data.cards[0];

		response = await fetch(
			`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
		);
		data = await response.json();
		let card2 = data.cards[0];

		console.log(
			`${card1.value} of ${card1.suit}, ${card2.value} of ${card2.suit}`
		);
	} catch (err) {
		console.log(err);
	}
}

getTwoCards();

let deckId = null;

async function getDeck() {
	let response = await fetch(
		"https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
	);
	let data = await response.json();
	deckId = data.deck_id;
}

async function drawCard() {
	if (deckId) {
		let response = await fetch(
			`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
		);
		let data = await response.json();
		if (data.remaining == 0) {
			document.getElementById("drawCard").disabled = true;
		}
		let card = data.cards[0];
		document.getElementById("card").src = card.image;
	}
}

document.getElementById("drawCard").addEventListener("click", drawCard);

getDeck();
