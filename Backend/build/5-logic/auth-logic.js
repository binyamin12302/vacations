"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dal_1 = __importDefault(require("../2-utils/dal"));
const cyber_1 = __importDefault(require("../2-utils/cyber"));
const errors_model_1 = require("../4-models/errors-model");
const role_model_1 = __importDefault(require("../4-models/role-model"));
const socket_logic_1 = __importDefault(require("./socket-logic"));
function register(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = user.validatePost();
        if (errors)
            throw new errors_model_1.ValidationError(errors);
        if (yield isUsernameExist(user.username))
            throw new errors_model_1.ValidationError(`username '${user.username}' exists`);
        user.password = cyber_1.default.hash(user.password);
        user.roleId = role_model_1.default.User;
        const sql = `INSERT INTO users VALUES (DEFAULT, ?, ?,?, ?,?)`;
        const values = [user.firstName, user.lastName, user.username, user.password, user.roleId];
        const info = yield dal_1.default.execute(sql, values);
        user.userId = info.insertId;
        delete user.password;
        const token = cyber_1.default.getNewToken(user);
        return token;
    });
}
function isUsernameExist(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT EXISTS(SELECT * FROM users WHERE  username = ?) as isExists;`;
        const value = [username];
        const result = yield dal_1.default.execute(sql, value);
        const isExists = result[0].isExists;
        return isExists === 1;
    });
}
function login(credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = credentials.validateCredentials();
        if (errors)
            throw new errors_model_1.ValidationError(errors);
        credentials.password = cyber_1.default.hash(credentials.password);
        const sql = `SELECT * FROM users WHERE username = ? AND password = ? `;
        const values = [credentials.username, credentials.password];
        const users = yield dal_1.default.execute(sql, values);
        if (!users[0])
            throw new errors_model_1.UnauthorizedError("Incorrect username or password");
        const user = users[0];
        delete user.password;
        const token = cyber_1.default.getNewToken(user);
        return token;
    });
}
function followVacation(follow) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(yield isVacationExist(follow.vacationId)))
            throw new errors_model_1.ValidationError(`The vacation doesn't exist`);
        const sql = `INSERT INTO followers (userId,vacationId) VALUES(${follow.userId}, ${follow.vacationId})`;
        yield dal_1.default.execute(sql);
        socket_logic_1.default.reportFollowVacation(follow);
    });
}
function unfollowVacation(follow) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `DELETE FROM followers WHERE vacationId = ${follow.vacationId} and userId = ${follow.userId}`;
        const result = yield dal_1.default.execute(sql);
        if (result.affectedRows === 0)
            throw new errors_model_1.ResourceNotFoundError(follow.vacationId);
        socket_logic_1.default.reportunfollowVacation(follow);
    });
}
function isVacationExist(vacationId) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT EXISTS(SELECT vacations.vacationId FROM vacations 
    WHERE vacationId = ${vacationId}) as isExists`;
        const result = yield dal_1.default.execute(sql);
        const isExists = result[0].isExists;
        return isExists === 1;
    });
}
exports.default = {
    register,
    login,
    followVacation,
    unfollowVacation
};
