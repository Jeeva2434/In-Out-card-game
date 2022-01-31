const SUITS = ["♠", "♣", "♥", "♦"];
const VALUES = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K"
];
class Deck {
constructor(cards = freshDeck()) { 	
	this.cards = cards
}
get numberOfCards() {
	return this.cards.length
}

pop() {
	return this.cards.shift()
}

push(card) {
	this.cards.push(card)
}

shuffle() {
	for (let i = this.numberOfCards - 1; i > 0; i--) {
		const newIndex = Math.floor(Math.random() * (i + 1))
		const oldValue = this.cards[newIndex]
		this.cards[newIndex] = this.cards[i]
		this.cards[i] = oldValue
	}
}
}
class Card {
constructor(suit, value) {
	this.suit = suit
	this.value = value
}

get color() {
	return this.suit === "♣" || this.suit === "♠" ? "black" : "red"
}

getHTML() {
	const cardDiv = document.createElement("div")
	cardDiv.innerText = this.suit
	cardDiv.classList.add("card", this.color)
	cardDiv.dataset.value = `${this.value} ${this.suit}`
	return cardDiv
}
}

function freshDeck() {
return SUITS.flatMap(suit => {
	return VALUES.map(value => {
		// console.log(suit, value)
		return new Card(suit, value)
	})
})
}

const player1CardSlot = document.querySelector(".player1-card-slot")
const player2CardSlot = document.querySelector(".player2-card-slot")

const player1DeckElement = document.querySelector(".player1-deck")
const player2DeckElement = document.querySelector(".player2-deck")

const text = document.querySelector(".text")

let player2Deck, player1Deck, inRound = true, stop = true
let player1Pop = []
let player2Pop = []
let player2 = false
let player1 = true

var player2Card
var player1Card


document.addEventListener("load", myFunction);

function myFunction() {
  if (stop) {
    startGame()
    return
  }

  if (inRound) {
    cleanBeforeRound()
  }
}
startGame()

function startGame() {
  const deck = new Deck()
  deck.shuffle()

  const deckMidpoint = Math.ceil(deck.numberOfCards / 2)
  player2Deck = new Deck(deck.cards.slice(0, deckMidpoint))
  player1Deck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards))
  stop = false
  inRound = false
  cleanBeforeRound()
}

function cleanBeforeRound() {
  player1CardSlot.innerHTML = ""
  player2CardSlot.innerHTML = ""
  text.innerText = ""

  updateDeckCount()
}

// computer clickable area

document.getElementById("player1-deck").addEventListener("click", () => {
	
if(player1)
{
	cleanBeforeRound()
  function cleanBeforeRound() 
	{
		player1CardSlot.innerHTML = ""
	}  

	player1Card = player1Deck.pop()	
	player1Pop.push(player1Card)
	player1CardSlot.appendChild(player1Card.getHTML())
	updateDeckCount()	
	inCard()

	player1 = false
	player2 = true
}
})


// player click area
document.getElementById("player2-deck").addEventListener("click", () => {
	
	if(player2){
	cleanBeforeRound()
	function cleanBeforeRound() {
		player2CardSlot.innerHTML = ""
	}
	
	player2Card = player2Deck.pop()
	player2CardSlot.appendChild(player2Card.getHTML())
	player2Pop.push(player2Card)

		player1 = true
		player2 = false
		
		updateDeckCount()
		inout()
	}	
})

function inCard(){

	if (player2Pop.length !== 0)
  {

    if (player1Card.value == player2Card.value)
	  {
		  for(let i=0;i<player1Pop.length;i++)
		    {
		     player1Deck.push(player1Pop[i])
		    }

		  for(let j=0;j<player2Pop.length;j++)
		    {
			    player1Deck.push(player2Pop[j])
		    }
			player2Pop = []
			player1Pop= []
	 	  updateDeckCount()	
		}  
  }
Result()

}

function inout()
{
if (player1Pop.length !== 0)
 {

  if(player1Card.value==player2Card.value)
	{
		
		for(let i=0;i<player2Pop.length;i++)
		{
		 player2Deck.push(player2Pop[i])
		}

		for(let j=0;j<player1Pop.length;j++)
		{
		 player2Deck.push(player1Pop[j])
		}
    
		player2Pop = []
		player1Pop= []
		updateDeckCount()
  }
 }

 Result()
}
function updateDeckCount() {
  player1DeckElement.innerText = player1Deck.numberOfCards
  player2DeckElement.innerText = player2Deck.numberOfCards
}
// var p1='0'
// var p2='1'
function Result(){
    // console.log(p1)
		// console.log(p2)
		// if(p1=='0' && p2=='1')
		// {
		// 	text.innerText = "Draw"
    //   player1CardSlot.innerHTML = ""
		// 	player2CardSlot.innerHTML = ""
		// 	stop= true
		// 	inRound = true
		// }
	  if(player1Deck.numberOfCards == "0" && player2Deck.numberOfCards == "1"){
			text.innerText = "Draw"
      player1CardSlot.innerHTML = ""
			player2CardSlot.innerHTML = ""
			stop=true
		}
    if(player1Deck.numberOfCards == "0" && player2Deck.numberOfCards !== "1"){
			// text.innerText = "player2 win"
      // player1CardSlot.innerHTML = ""
			// player2CardSlot.innerHTML = ""
			// stop=true
			location.href = "win.html";
		}
    if(player2Deck.numberOfCards == "0")
		{
			// text.innerHTML = "player1 win"
			// player2CardSlot.innerHTML = ""
			// player1CardSlot.innerHTML = ""
			// stop=true
			location.href = "lose.html";
		}
}








