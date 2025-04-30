"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var errors_model_1 = require("../4-models/errors-model");
var secret = "Binyamin is the best programmer in the world!";
var salt = "MakeThingsGoRight";
function hash(plainText) {
    if (!plainText)
        return null;
    // Hashing with salt: 
    var hashText = crypto_1.default.createHmac("sha512", salt).update(plainText).digest("hex");
    return hashText;
}
function getNewToken(user) {
    var payload = { user: user };
    var token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: "3h" });
    return token;
}
;
function getUserId(request) {
    // Extract token header (authorization: Bearer the-token): 
    var header = request.headers.authorization;
    // Extract the token: 
    var token = header.substring(7);
    // Extract payload: 
    var payload = jsonwebtoken_1.default.decode(token);
    // Extract user: 
    var user = payload.user;
    // return role: 
    return user.userId;
}
;
function verifyToken(request) {
    return new Promise(function (resolve, reject) {
        var header = request.headers.authorization;
        if (!header) {
            reject(new errors_model_1.UnauthorizedError("No token sent"));
            return;
        }
        var token = header.substring(7);
        // If no token sent: 
        if (!token) {
            reject(new errors_model_1.UnauthorizedError("No token sent"));
            return;
        }
        jsonwebtoken_1.default.verify(token, secret, function (err, payload) {
            // If token invalid or expired:
            if (err) {
                reject(new errors_model_1.UnauthorizedError("Invalid or expired token"));
                return;
            }
            resolve(true);
        });
    });
}
;
function getTokenRole(request) {
    // Extract token header (authorization: Bearer the-token): 
    var header = request.headers.authorization;
    // Extract the token: 
    var token = header.substring(7);
    // Extract payload: 
    var payload = jsonwebtoken_1.default.decode(token);
    // Extract user: 
    var user = payload.user;
    // return role: 
    return user.roleId;
}
;
exports.default = {
    getNewToken: getNewToken,
    verifyToken: verifyToken,
    getTokenRole: getTokenRole,
    getUserId: getUserId,
    hash: hash
};
