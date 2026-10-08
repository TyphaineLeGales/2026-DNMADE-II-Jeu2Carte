import { createServer } from "http";
import { Server } from "socket.io";

import {
    Game,
    createGame,
    playRound
} from "./game";

const httpServer = createServer();

const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});

const rooms = new Map<string, Game>();

io.on("connection", (socket) => {

    console.log("Player connected:", socket.id);

    socket.on("createGame", () => {

        const roomId = generateRoomCode();

        const game = createGame(socket.id);

        rooms.set(roomId, game);

        socket.join(roomId);

        console.log(
            `Game ${roomId} created by ${socket.id}`
        );

        socket.emit("gameCreated", {
            roomId
        });
    });


    socket.on("joinGame", (roomId: string) => {

        const game = rooms.get(roomId);

        if (!game) {
            socket.emit("errorMessage", {
                message: "Game not found"
            });

            return;
        }

        if (game.players.length >= 2) {
            socket.emit("errorMessage", {
                message: "Game is already full"
            });

            return;
        }

        game.players.push(socket.id);

        socket.join(roomId);

        console.log(
            `${socket.id} joined game ${roomId}`
        );

        io.to(roomId).emit("gameReady");
    });


    socket.on("playCard", (roomId: string) => {

        const game = rooms.get(roomId);

        if (!game) {
            return;
        }

        if (game.players.length < 2) {
            return;
        }

        const result = playRound(game);

        if (!result) {
            return;
        }

        io.to(roomId).emit(
            "roundResult",
            result
        );

        if (result.gameOver) {

            io.to(roomId).emit("gameOver", {
                scorePlayer1: result.scorePlayer1,
                scorePlayer2: result.scorePlayer2
            });
        }
    });


    socket.on("disconnect", () => {

        console.log(
            "Player disconnected:",
            socket.id
        );

        for (const [roomId, game] of rooms) {

            if (game.players.includes(socket.id)) {

                io.to(roomId).emit(
                    "opponentDisconnected"
                );

                rooms.delete(roomId);
            }
        }
    });
});


function generateRoomCode(): string {

    return Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase();
}


httpServer.listen(3000, "0.0.0.0", () => {

    console.log(
        "Socket server running on port 3000"
    );
});