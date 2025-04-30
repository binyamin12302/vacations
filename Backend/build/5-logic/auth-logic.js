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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dal_1 = __importDefault(require("../2-utils/dal"));
var cyber_1 = __importDefault(require("../2-utils/cyber"));
var errors_model_1 = require("../4-models/errors-model");
var role_model_1 = __importDefault(require("../4-models/role-model"));
var socket_logic_1 = __importDefault(require("./socket-logic"));
function register(user) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, sql, values, info, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = user.validatePost();
                    if (errors)
                        throw new errors_model_1.ValidationError(errors);
                    return [4 /*yield*/, isUsernameExist(user.username)];
                case 1:
                    if (_a.sent())
                        throw new errors_model_1.ValidationError("username '".concat(user.username, "' exists"));
                    user.password = cyber_1.default.hash(user.password);
                    user.roleId = role_model_1.default.User;
                    sql = "INSERT INTO users VALUES (DEFAULT, ?, ?,?, ?,?)";
                    values = [user.firstName, user.lastName, user.username, user.password, user.roleId];
                    return [4 /*yield*/, dal_1.default.execute(sql, values)];
                case 2:
                    info = _a.sent();
                    user.userId = info.insertId;
                    delete user.password;
                    token = cyber_1.default.getNewToken(user);
                    return [2 /*return*/, token];
            }
        });
    });
}
function isUsernameExist(username) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, value, result, isExists;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT EXISTS(SELECT * FROM users WHERE  username = ?) as isExists;";
                    value = [username];
                    return [4 /*yield*/, dal_1.default.execute(sql, value)];
                case 1:
                    result = _a.sent();
                    isExists = result[0].isExists;
                    return [2 /*return*/, isExists === 1];
            }
        });
    });
}
function login(credentials) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, sql, values, users, user, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = credentials.validateCredentials();
                    if (errors)
                        throw new errors_model_1.ValidationError(errors);
                    credentials.password = cyber_1.default.hash(credentials.password);
                    sql = "SELECT * FROM users WHERE username = ? AND password = ? ";
                    values = [credentials.username, credentials.password];
                    return [4 /*yield*/, dal_1.default.execute(sql, values)];
                case 1:
                    users = _a.sent();
                    if (!users[0])
                        throw new errors_model_1.UnauthorizedError("Incorrect username or password");
                    user = users[0];
                    delete user.password;
                    token = cyber_1.default.getNewToken(user);
                    return [2 /*return*/, token];
            }
        });
    });
}
function followVacation(follow) {
    return __awaiter(this, void 0, void 0, function () {
        var sql;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, isVacationExist(follow.vacationId)];
                case 1:
                    if (!(_a.sent()))
                        throw new errors_model_1.ValidationError("The vacation doesn't exist");
                    sql = "INSERT INTO followers (userId,vacationId) VALUES(".concat(follow.userId, ", ").concat(follow.vacationId, ")");
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 2:
                    _a.sent();
                    socket_logic_1.default.reportFollowVacation(follow);
                    return [2 /*return*/];
            }
        });
    });
}
function unfollowVacation(follow) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "DELETE FROM followers WHERE vacationId = ".concat(follow.vacationId, " and userId = ").concat(follow.userId);
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 1:
                    result = _a.sent();
                    if (result.affectedRows === 0)
                        throw new errors_model_1.ResourceNotFoundError(follow.vacationId);
                    socket_logic_1.default.reportunfollowVacation(follow);
                    return [2 /*return*/];
            }
        });
    });
}
function isVacationExist(vacationId) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, result, isExists;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT EXISTS(SELECT vacations.vacationId FROM vacations \n    WHERE vacationId = ".concat(vacationId, ") as isExists");
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 1:
                    result = _a.sent();
                    isExists = result[0].isExists;
                    return [2 /*return*/, isExists === 1];
            }
        });
    });
}
exports.default = {
    register: register,
    login: login,
    followVacation: followVacation,
    unfollowVacation: unfollowVacation
};
