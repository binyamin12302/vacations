"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const allowedOrigins = [
    "https://vacations-three.vercel.app",
    "http://localhost:3000"
];
let socketServer;
function init(httpServer) {
    socketServer = new socket_io_1.Server(httpServer, {
        cors: {
            origin: allowedOrigins,
            methods: ["GET", "POST"],
            credentials: true
        }
    });
    socketServer.sockets.on("connection", (socket) => {
        console.log("Client has been connected...");
    });
}
function reportAddVacation(vacation) {
    socketServer.sockets.emit("admin-added-vacation", vacation);
}
function reportUpdateVacation(vacation) {
    socketServer.sockets.emit("admin-updated-vacation", vacation);
}
function reportDeleteVacation(id) {
    socketServer.sockets.emit("admin-deleted-vacation", id);
}
function reportFollowVacation(follow) {
    socketServer.sockets.emit("user-follow-vacation", follow);
}
function reportunfollowVacation(follow) {
    socketServer.sockets.emit("user-unfollow-vacation", follow);
}
exports.default = {
    init,
    reportAddVacation,
    reportUpdateVacation,
    reportDeleteVacation,
    reportFollowVacation,
    reportunfollowVacation
};
