import { Card } from './Card';
import { Player } from './Player';
import './style.css'

const FAMILLES = ["PIQUE", "COEUR", "CARREAU", "TREFLE"]
const VALUES = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "valet", "reine", "roi", "as"]
const RANDOMIZEDARRAY= []

FAMILLES.forEach(f => {
    VALUES.forEach(v => {
        RANDOMIZEDARRAY.push(new Card(v, f))
    })
})
shuffle(RANDOMIZEDARRAY)
const deckPlayer1 = RANDOMIZEDARRAY.slice(0, RANDOMIZEDARRAY.length/2-1)
const deckPlayer2 = RANDOMIZEDARRAY.slice(RANDOMIZEDARRAY.length/2, RANDOMIZEDARRAY.length)

const player1 = new Player(deckPlayer1);
const player2 = new Player(deckPlayer2);

console.log(player1, player2)





/* JEU DE LA BATAILLE
    1. Le deck de carte doit être dans un ordre au hasard et séparé en 2, une pile par joueur
    2. On ne voit que 2 cartes a la fois qui sont tirées à chaque tour au click
    3. On compare la valeur des cartes de chaque joueur pour determiner quel joueur remporte le tour
    4. Le gagnant du tour gagne un point
    5. On passe au tour suivant etc... jusqu'à ce qu'il ne reste plus de carte
    6. La partie se termine. On compare le cumul de points des 2 joueurs pour determiner qui a gagné
    7. Message de fin de partie + bouton pour rejouer et remélanger les cartes

    Features en plus : 
    - au lieu que les cartes aient le nombre en texte, intégrer le nombre d'émoji correspondant a la valeur + prévoir le cas des figures
*/

function shuffle(array) {
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