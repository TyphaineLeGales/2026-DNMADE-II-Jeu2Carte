export class Card {
    valeur: string;
    famille:string;

    constructor(valeur: string, famille:string) {
        this.valeur = valeur;
        this.famille = famille;
        this.createCard();
    }

    createCard = () => {
        if (this.famille == "PIQUE") {
            this.famille = "♠️" 
        }

        if (this.famille == "CARREAU") {
            this.famille = "♦️"
        }

        if (this.famille == "COEUR") {
            this.famille = "♥️"
        }

        if (this.famille == "TREFLE") {
            this.famille = "♣️"
        }
    }
}