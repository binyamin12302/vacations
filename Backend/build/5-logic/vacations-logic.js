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
var upload_logic_1 = require("./upload-logic");
var dal_1 = __importDefault(require("../2-utils/dal"));
var errors_model_1 = require("../4-models/errors-model");
var socket_logic_1 = __importDefault(require("./socket-logic"));
// Get all vacations:
function getAllVacations(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, vacations;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT \n              v.vacationId as id, v.destination, v.description, v.imageName, v.startDate,\n              v.endDate, v.price,\n              (CASE WHEN followers.vacationId IS NULL THEN \"Follow\" ELSE \"Unfollow\" END) AS followState,\n              (CASE WHEN f_v.followers IS NOT NULL THEN f_v.followers ELSE 0 END) AS followers\n              FROM vacations v\n              LEFT JOIN (SELECT vacationId FROM followers WHERE userId = ".concat(userId, ") followers\n              ON v.vacationId = followers.vacationId\n              LEFT JOIN (\n                SELECT vacationId, COUNT(vacationId) AS followers\n                FROM followers\n                GROUP BY vacationId\n              ) AS f_v ON v.vacationId = f_v.vacationId");
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 1:
                    vacations = _a.sent();
                    vacations.sort(function (a, b) { return new Date(a.startDate).getTime() - new Date(b.startDate).getTime(); });
                    vacations.sort(function (a, b) { return b.followState.localeCompare("Unfollow"); });
                    return [2 /*return*/, vacations];
            }
        });
    });
}
// Add one vacation:
function addVacation(vacation) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, file, filePath, _a, sql, values, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    errors = vacation.validatePost();
                    if (errors)
                        throw new errors_model_1.ValidationError(errors);
                    if (!vacation.image) return [3 /*break*/, 2];
                    file = vacation.image;
                    filePath = file.tempFilePath || file.name;
                    _a = vacation;
                    return [4 /*yield*/, (0, upload_logic_1.uploadImage)(filePath)];
                case 1:
                    _a.imageName = _b.sent();
                    delete vacation.image;
                    _b.label = 2;
                case 2:
                    sql = "INSERT INTO vacations (description, destination, imageName, startDate, endDate, price)\n               VALUES (?, ?, ?, ?, ?, ?)";
                    values = [
                        vacation.description,
                        vacation.destination,
                        vacation.imageName,
                        vacation.startDate,
                        vacation.endDate,
                        vacation.price
                    ];
                    return [4 /*yield*/, dal_1.default.execute(sql, values)];
                case 3:
                    result = _b.sent();
                    vacation.id = result.insertId;
                    socket_logic_1.default.reportAddVacation(vacation);
                    return [2 /*return*/, vacation];
            }
        });
    });
}
// Get one vacation:
function getOneVacation(id) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, vacations, vacation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT vacationId AS id, destination, description, imageName, startDate, endDate, price\n               FROM vacations WHERE vacationId = ".concat(id);
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 1:
                    vacations = _a.sent();
                    vacation = vacations[0];
                    if (!vacation)
                        throw new errors_model_1.ResourceNotFoundError(id);
                    return [2 /*return*/, vacation];
            }
        });
    });
}
function getPreviousImage(id) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, image;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT imageName FROM vacations WHERE vacationId = ".concat(id);
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 1:
                    image = _a.sent();
                    return [2 /*return*/, image[0].imageName];
            }
        });
    });
}
// Update full vacation:
function updateFullVacation(vacation) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, file, filePath, _a, sql, values, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    errors = vacation.validatePut();
                    if (errors)
                        throw new errors_model_1.ValidationError(errors);
                    if (!vacation.image) return [3 /*break*/, 2];
                    file = vacation.image;
                    filePath = file.tempFilePath || file.name;
                    _a = vacation;
                    return [4 /*yield*/, (0, upload_logic_1.uploadImage)(filePath)];
                case 1:
                    _a.imageName = _b.sent();
                    delete vacation.image;
                    _b.label = 2;
                case 2:
                    sql = "UPDATE vacations SET\n              description = ?, destination = ?, imageName = ?, startDate = ?, endDate = ?, price = ?\n              WHERE vacationId = ?";
                    values = [
                        vacation.description,
                        vacation.destination,
                        vacation.imageName,
                        vacation.startDate,
                        vacation.endDate,
                        vacation.price,
                        vacation.id
                    ];
                    return [4 /*yield*/, dal_1.default.execute(sql, values)];
                case 3:
                    result = _b.sent();
                    socket_logic_1.default.reportUpdateVacation(vacation);
                    if (result.affectedRows === 0)
                        throw new errors_model_1.ResourceNotFoundError(vacation.id);
                    return [2 /*return*/, vacation];
            }
        });
    });
}
// Update partial vacation:
function updatePartialVacation(vacation) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, previousVacation, file, filePath, _a, values, fieldsToUpdate, fields, _i, fields_1, field, sql, result, updatedVacation;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    errors = vacation.validatePatch();
                    if (errors)
                        throw new errors_model_1.ValidationError(errors);
                    return [4 /*yield*/, getOneVacation(vacation.id)];
                case 1:
                    previousVacation = _b.sent();
                    if (!vacation.image) return [3 /*break*/, 5];
                    file = vacation.image;
                    filePath = file.tempFilePath || file.name;
                    if (!previousVacation.imageName) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, upload_logic_1.deleteImage)(previousVacation.imageName)];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    _a = vacation;
                    return [4 /*yield*/, (0, upload_logic_1.uploadImage)(filePath)];
                case 4:
                    _a.imageName = _b.sent();
                    delete vacation.image;
                    return [3 /*break*/, 6];
                case 5:
                    vacation.imageName = previousVacation.imageName;
                    _b.label = 6;
                case 6:
                    values = [];
                    fieldsToUpdate = [];
                    fields = ["description", "destination", "startDate", "endDate", "price", "imageName"];
                    for (_i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
                        field = fields_1[_i];
                        if (vacation[field] !== undefined) {
                            fieldsToUpdate.push("".concat(field, " = ?"));
                            values.push(vacation[field]);
                        }
                    }
                    sql = "UPDATE vacations SET ".concat(fieldsToUpdate.join(", "), " WHERE vacationId = ?");
                    values.push(vacation.id);
                    return [4 /*yield*/, dal_1.default.execute(sql, values)];
                case 7:
                    result = _b.sent();
                    if (result.affectedRows === 0)
                        throw new errors_model_1.ResourceNotFoundError(vacation.id);
                    return [4 /*yield*/, getOneVacation(vacation.id)];
                case 8:
                    updatedVacation = _b.sent();
                    socket_logic_1.default.reportUpdateVacation(updatedVacation);
                    return [2 /*return*/, updatedVacation];
            }
        });
    });
}
// Delete vacation:
function deleteVacation(id) {
    return __awaiter(this, void 0, void 0, function () {
        var previousImage, sql;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getPreviousImage(id)];
                case 1:
                    previousImage = _a.sent();
                    sql = "DELETE FROM vacations WHERE vacationId = ".concat(id);
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, upload_logic_1.deleteImage)(previousImage)];
                case 3:
                    _a.sent();
                    socket_logic_1.default.reportDeleteVacation(id);
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = {
    getAllVacations: getAllVacations,
    addVacation: addVacation,
    updateFullVacation: updateFullVacation,
    deleteVacation: deleteVacation,
    updatePartialVacation: updatePartialVacation
};
