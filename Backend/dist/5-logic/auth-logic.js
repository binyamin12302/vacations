"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dal_1 = __importDefault(require("../2-utils/dal"));
const cyber_1 = __importDefault(require("../2-utils/cyber"));
const errors_model_1 = require("../4-models/errors-model");
const role_model_1 = __importDefault(require("../4-models/role-model"));
const socket_logic_1 = __importDefault(require("./socket-logic"));
async function register(user) {
    const errors = user.validatePost();
    if (errors)
        throw new errors_model_1.ValidationError(errors);
    if (await isUsernameExist(user.username))
        throw new errors_model_1.ValidationError(`username '${user.username}' exists`);
    user.password = cyber_1.default.hash(user.password);
    user.roleId = role_model_1.default.User;
    const sql = `INSERT INTO users VALUES (DEFAULT, ?, ?,?, ?,?)`;
    const values = [user.firstName, user.lastName, user.username, user.password, user.roleId];
    const info = await dal_1.default.execute(sql, values);
    user.userId = info.insertId;
    delete user.password;
    const token = cyber_1.default.getNewToken(user);
    return token;
}
async function isUsernameExist(username) {
    const sql = `SELECT EXISTS(SELECT * FROM users WHERE  username = ?) as isExists;`;
    const value = [username];
    const result = await dal_1.default.execute(sql, value);
    const isExists = result[0].isExists;
    return isExists === 1;
}
async function login(credentials) {
    const errors = credentials.validateCredentials();
    if (errors)
        throw new errors_model_1.ValidationError(errors);
    credentials.password = cyber_1.default.hash(credentials.password);
    const sql = `SELECT * FROM users WHERE username = ? AND password = ? `;
    const values = [credentials.username, credentials.password];
    const users = await dal_1.default.execute(sql, values);
    if (!users[0])
        throw new errors_model_1.UnauthorizedError("Incorrect username or password");
    const user = users[0];
    delete user.password;
    const token = cyber_1.default.getNewToken(user);
    return token;
}
async function followVacation(follow) {
    if (!await isVacationExist(follow.vacationId))
        throw new errors_model_1.ValidationError(`The vacation doesn't exist`);
    const sql = `INSERT INTO followers (userId,vacationId) VALUES(${follow.userId}, ${follow.vacationId})`;
    await dal_1.default.execute(sql);
    socket_logic_1.default.reportFollowVacation(follow);
}
async function unfollowVacation(follow) {
    const sql = `DELETE FROM followers WHERE vacationId = ${follow.vacationId} and userId = ${follow.userId}`;
    const result = await dal_1.default.execute(sql);
    if (result.affectedRows === 0)
        throw new errors_model_1.ResourceNotFoundError(follow.vacationId);
    socket_logic_1.default.reportunfollowVacation(follow);
}
async function isVacationExist(vacationId) {
    const sql = `SELECT EXISTS(SELECT vacations.vacationId FROM vacations 
    WHERE vacationId = ${vacationId}) as isExists`;
    const result = await dal_1.default.execute(sql);
    const isExists = result[0].isExists;
    return isExists === 1;
}
exports.default = {
    register,
    login,
    followVacation,
    unfollowVacation
};
