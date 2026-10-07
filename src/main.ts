
import { Card } from './Card';
import './style.css'

const FAMILLES = ["PIQUE", "COEUR", "CARREAU", "TREFLE"]
const VALUES = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "valet", "reine", "roi", "as"]

FAMILLES.forEach(f => {
    VALUES.forEach(v => {
        new Card(v, f)
    })
})

/* JEU DE LA BATAILLE
    1. Le deck de carte doit être dans un ordre au hasard et séparé en 2, une pile par joueur
    2. On ne voit que 2 cartes a la fois qui sont tirées à chaque tour au click
    3. On compare la valeur des cartes de chaque joueur pour determiner quel joueur remporte le tour
    4. Le gagnant du tour gagne un point
    5. On passe au tour suivant etc... jusqu'à ce qu'il ne reste plus de carte
    6. La partie se termine. On compare le cumul de points des 2 joueurs pour determiner qui a gagné
    7. Message de fin de partie + bouton pour rejouer et remélanger les cartes

*/