"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("socket.io");
var socketServer;
function init(httpServer) {
    // Create socket server: 
    socketServer = new socket_io_1.Server(httpServer, { cors: { origin: "*" } });
    // Listen to clients connection: 
    socketServer.sockets.on("connection", function (socket) {
        console.log("Client has been connected...");
    });
}
function reportAddVacation(vacation) {
    socketServer.sockets.emit("admin-added-vacation", vacation);
}
function reportUpdateVacation(vacation) {
    socketServer.sockets.emit("admin-updated-vacation", vacation);
}
// Reporting a vacation deleted by the admin:
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
    init: init,
    reportAddVacation: reportAddVacation,
    reportUpdateVacation: reportUpdateVacation,
    reportDeleteVacation: reportDeleteVacation,
    reportFollowVacation: reportFollowVacation,
    reportunfollowVacation: reportunfollowVacation
};
