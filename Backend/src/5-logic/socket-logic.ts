import { Server as HttpServer } from "http";
import { Server as SocketServer, Socket } from "socket.io";
import FollowModel from "../4-models/follow-model";
import VacationModel from "../4-models/vacation-model";

const allowedOrigins = [
    "https://vacations-three.vercel.app",
    "http://localhost:3000"
];

let socketServer: SocketServer;

function init(httpServer: HttpServer): void {

    socketServer = new SocketServer(httpServer, {
        cors: {
            origin: allowedOrigins,
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    socketServer.sockets.on("connection", (socket: Socket) => {
        console.log("Client has been connected...");
    });

}

function reportAddVacation(vacation: VacationModel): void {
    socketServer.sockets.emit("admin-added-vacation", vacation);
}

function reportUpdateVacation(vacation: VacationModel): void {
    socketServer.sockets.emit("admin-updated-vacation", vacation);
}

function reportDeleteVacation(id: number): void {
    socketServer.sockets.emit("admin-deleted-vacation", id);
}

function reportFollowVacation(follow: FollowModel): void {
    socketServer.sockets.emit("user-follow-vacation", follow);
}

function reportunfollowVacation(follow: FollowModel): void {
    socketServer.sockets.emit("user-unfollow-vacation", follow)
}

export default {
    init,
    reportAddVacation,
    reportUpdateVacation,
    reportDeleteVacation,
    reportFollowVacation,
    reportunfollowVacation
};
