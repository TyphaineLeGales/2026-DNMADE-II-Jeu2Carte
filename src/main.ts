import { Card } from './Card';
import { Player } from './Player';
import './style.css'

const FAMILLES = ["PIQUE", "COEUR", "CARREAU", "TREFLE"]
const VALUES = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "valet", "reine", "roi", "as"]
const RANDOMIZEDARRAY:Card[]= []

FAMILLES.forEach(f => {
    VALUES.forEach(v => {
        RANDOMIZEDARRAY.push(new Card(v, f))
    })
})

shuffle(RANDOMIZEDARRAY)

const deckPlayer1 = RANDOMIZEDARRAY.slice(0, RANDOMIZEDARRAY.length/2-1)
const deckPlayer2 = RANDOMIZEDARRAY.slice(RANDOMIZEDARRAY.length/2, RANDOMIZEDARRAY.length)

const cardUIP1 = createCardUI(deckPlayer1[0])
const cardUIP2 = createCardUI(deckPlayer2[0])
const player1 = new Player(1, deckPlayer1);
const player2 = new Player(2, deckPlayer2);
let round = 0;
const replayBtn = document.querySelector('button')
const endGameMsg = document.getElementById('endGameMsg');
replayBtn.onclick = reset

function reset () {

    shuffle(RANDOMIZEDARRAY)
    const deckPlayer1 = RANDOMIZEDARRAY.slice(0, RANDOMIZEDARRAY.length/2-1)
    const deckPlayer2 = RANDOMIZEDARRAY.slice(RANDOMIZEDARRAY.length/2, RANDOMIZEDARRAY.length)

    player1.resetDeck(deckPlayer1)
    player2.resetDeck(deckPlayer2)
    round = 0
    replayBtn?.classList.add('hidden')
    endGameMsg.innerText = "";
    updateCardUI(player1.deck[0], cardUIP1)
    updateCardUI(player2.deck[0], cardUIP2)
    player1.resetPoints()
    player2.resetPoints()
}

document.addEventListener("click", () => {
    if(round < 25) {
        const card1data = player1.deck[round]
        const card2data = player2.deck[round]
        updateCardUI(card1data, cardUIP1)
        updateCardUI(card2data, cardUIP2)
        calcScores(card1data, card2data)
        round++
    } else {
        endOfGame(player1.points, player2.points)
    }
})


function calcScores (cardP1:Card, cardP2:Card) {
    const score1 = VALUES.indexOf(cardP1.valeur)
    const score2 = VALUES.indexOf(cardP2.valeur)
    console.log(score1, score2)
    if(score1 > score2) {
        player1.addPoint()

    } else if( score2 > score1) {
        player2.addPoint()
    }
}

const endOfGame = (p1Score: number, p2Score: number) => {
    let idOfWinner, endMsg;

    if (p1Score > p2Score) {
        idOfWinner = 1;
    } else if (p1Score < p2Score) {
        idOfWinner = 2;
    }

    if (idOfWinner) {
        endMsg = `Player ${idOfWinner} wins 🎉`;
    } else {
        endMsg = "It's a tie, no losers here 💅";
    }

    if (endGameMsg) {
        endGameMsg.innerText = endMsg;
    }

    replayBtn?.classList.remove('hidden')
};

function createCardUI (card:Card) {
    let rectangle: HTMLElement = document.createElement("div");
    rectangle.classList.add('carton');
    let shape: HTMLElement = document.createElement("p");
    let number: HTMLElement = document.createElement("p");
    number.textContent = card.valeur
    shape.textContent = card.famille
    rectangle.appendChild(shape)
    rectangle.appendChild(number)
    document.querySelector('.cardUI').appendChild(rectangle);
    return rectangle
}

function updateCardUI (cardData:Card, domEl: HTMLElement) {
    console.log("domEl", domEl.firstElementChild)
    
    domEl.firstElementChild.innerText = cardData.famille
    domEl.lastElementChild.innerText = cardData.valeur
}

function shuffle(array:Card[]) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

