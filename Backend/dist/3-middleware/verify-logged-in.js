"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cyber_1 = __importDefault(require("../2-utils/cyber"));
async function verifyLoggedIn(request, response, next) {
    try {
        await cyber_1.default.verifyToken(request);
        next();
    }
    catch (err) {
        next(err);
    }
}
exports.default = verifyLoggedIn;
