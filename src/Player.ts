import { Card } from "./Card"
export class Player {
    points: number
    deck: Card[]

    constructor (deck:Card[]) {
        this.points = 0
        this.deck = deck

    }
}