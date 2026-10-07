export class Card {
    valeur: string;
    famille:string;

    constructor(valeur: string, famille:string) {
        console.log("je suis " + valeur);
        this.valeur = valeur;
        this.famille = famille;
        this.createCard();
    }

    createCard = () => {
        console.log("creation de la carte");

        let rectangle: HTMLElement = document.createElement("div");
        rectangle.classList.add('carton');
        let shape: HTMLElement = document.createElement("p");
        let number: HTMLElement = document.createElement("p");
        number.textContent = this.valeur
        rectangle.appendChild(shape)
        rectangle.appendChild(number)

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

        shape.textContent = this.famille
        document.body.appendChild(rectangle);
    }
}