"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function catchAll(err, request, response, next) {
    const status = err.status || 500;
    const message = err.message || "Unknown Error";
    if (status === 500) {
        // Log error to log file
    }
    response.status(status).send(message);
}
exports.default = catchAll;
