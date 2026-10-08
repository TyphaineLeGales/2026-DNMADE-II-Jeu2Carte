import { Card } from "../src/Card";

export const FAMILLES = [
    "PIQUE",
    "COEUR",
    "CARREAU",
    "TREFLE"
];

export const VALUES = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "valet",
    "reine",
    "roi",
    "as"
];

export interface Game {
    deckPlayer1: Card[];
    deckPlayer2: Card[];

    scorePlayer1: number;
    scorePlayer2: number;

    round: number;

    players: string[];
}

export function createDeck(): Card[] {
    const deck: Card[] = [];

    FAMILLES.forEach(famille => {
        VALUES.forEach(valeur => {
            deck.push(new Card(valeur, famille));
        });
    });

    return deck;
}

export function shuffle(array: Card[]) {
    let currentIndex = array.length;

    while (currentIndex !== 0) {
        const randomIndex = Math.floor(
            Math.random() * currentIndex
        );

        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex]
        ];
    }
}

export function createGame(player1SocketId: string): Game {
    const deck = createDeck();

    shuffle(deck);

    const middle = deck.length / 2;

    const deckPlayer1 = deck.slice(0, middle);
    const deckPlayer2 = deck.slice(middle);

    return {
        deckPlayer1,
        deckPlayer2,

        scorePlayer1: 0,
        scorePlayer2: 0,

        round: 0,

        players: [player1SocketId]
    };
}

export function playRound(game: Game) {
    if (game.round >= game.deckPlayer1.length) {
        return null;
    }

    const card1 = game.deckPlayer1[game.round];
    const card2 = game.deckPlayer2[game.round];

    const score1 = VALUES.indexOf(card1.valeur);
    const score2 = VALUES.indexOf(card2.valeur);

    let winner: number | null = null;

    if (score1 > score2) {
        game.scorePlayer1++;
        winner = 1;
    } else if (score2 > score1) {
        game.scorePlayer2++;
        winner = 2;
    }

    game.round++;

    return {
        card1,
        card2,
        winner,
        scorePlayer1: game.scorePlayer1,
        scorePlayer2: game.scorePlayer2,
        round: game.round,
        gameOver: game.round >= game.deckPlayer1.length
    };
}