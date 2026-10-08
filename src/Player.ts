import { Card } from "./Card"
export class Player {
    points: number
    deck:Card[]
    scoreUI: HTMLElement
    id:number

    constructor (id:number, deck:Card[]) {
        this.points = 0
        this.deck = deck
        this.scoreUI = document.createElement('p')
        this.id = id
        
        document.querySelector('.scoreUI').appendChild(this.scoreUI)
        this.setScore()

    }

    resetPoints() {
        this.points = 0;
        this.scoreUI.textContent = "0";
    }

    addPoint() {
        this.points++
        this.setScore()
    }


    setScore() {
        this.scoreUI.textContent = this.points.toString()
    }

    resetDeck(deck:Card[]) {
        this.deck = deck
    }
}