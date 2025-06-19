"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_model_1 = require("../4-models/errors-model");
const secret = "Binyamin is the best programmer in the world!";
const salt = "MakeThingsGoRight";
function hash(plainText) {
    if (!plainText)
        return null;
    // Hashing with salt:
    const hashText = crypto_1.default
        .createHmac("sha512", salt)
        .update(plainText)
        .digest("hex");
    return hashText;
}
function getNewToken(user) {
    const payload = { user };
    const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: "3h" });
    return token;
}
function getUserId(request) {
    // Extract token header (authorization: Bearer the-token):
    const header = request.headers.authorization;
    // Extract the token:
    const token = header.substring(7);
    // Extract payload:
    const payload = jsonwebtoken_1.default.decode(token);
    // Extract user:
    const user = payload.user;
    // return role:
    return user.userId;
}
function verifyToken(request) {
    return new Promise((resolve, reject) => {
        const header = request.headers.authorization;
        if (!header) {
            reject(new errors_model_1.UnauthorizedError("No token sent"));
            return;
        }
        const token = header.substring(7);
        // If no token sent:
        if (!token) {
            reject(new errors_model_1.UnauthorizedError("No token sent"));
            return;
        }
        jsonwebtoken_1.default.verify(token, secret, (err, payload) => {
            // If token invalid or expired:
            if (err) {
                reject(new errors_model_1.UnauthorizedError("Invalid or expired token"));
                return;
            }
            resolve(true);
        });
    });
}
function getTokenRole(request) {
    // Extract token header (authorization: Bearer the-token):
    const header = request.headers.authorization;
    // Extract the token:
    const token = header.substring(7);
    // Extract payload:
    const payload = jsonwebtoken_1.default.decode(token);
    // Extract user:
    const user = payload.user;
    // return role:
    return user.roleId;
}
exports.default = {
    getNewToken,
    verifyToken,
    getTokenRole,
    getUserId,
    hash,
};
