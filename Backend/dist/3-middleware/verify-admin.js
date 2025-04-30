"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cyber_1 = __importDefault(require("../2-utils/cyber"));
const errors_model_1 = require("../4-models/errors-model");
const role_model_1 = __importDefault(require("../4-models/role-model"));
async function verifyAdmin(request, response, next) {
    try {
        await cyber_1.default.verifyToken(request);
        const role = cyber_1.default.getTokenRole(request);
        if (role.toString() !== role_model_1.default.Admin) {
            const err = new errors_model_1.ForbiddenError("You are not Admin!");
            next(err);
        }
        next();
    }
    catch (err) {
        next(err);
    }
}
exports.default = verifyAdmin;
