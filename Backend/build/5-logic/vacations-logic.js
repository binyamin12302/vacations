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
const upload_logic_1 = require("./upload-logic");
const dal_1 = __importDefault(require("../2-utils/dal"));
const errors_model_1 = require("../4-models/errors-model");
const socket_logic_1 = __importDefault(require("./socket-logic"));
// Get all vacations:
function getAllVacations(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT 
              v.vacationId as id, v.destination, v.description, v.imageName, v.startDate,
              v.endDate, v.price,
              (CASE WHEN followers.vacationId IS NULL THEN 'Follow' ELSE 'Unfollow' END) AS followState,
              (CASE WHEN f_v.followers IS NOT NULL THEN f_v.followers ELSE 0 END) AS followers
              FROM vacations v
              LEFT JOIN (SELECT vacationId FROM followers WHERE userId = ${userId}) followers
              ON v.vacationId = followers.vacationId
              LEFT JOIN (
                SELECT vacationId, COUNT(vacationId) AS followers
                FROM followers
                GROUP BY vacationId
              ) AS f_v ON v.vacationId = f_v.vacationId 
                ORDER BY v.vacationId DESC; 
                `;
        const vacations = yield dal_1.default.execute(sql);
        return vacations;
    });
}
// Add one vacation:
function addVacation(vacation) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = vacation.validatePost();
        if (errors)
            throw new errors_model_1.ValidationError(errors);
        if (vacation.image) {
            const file = vacation.image;
            const filePath = file.tempFilePath;
            vacation.imageName = yield (0, upload_logic_1.uploadImage)(filePath);
            delete vacation.image;
        }
        const sql = `INSERT INTO vacations (description, destination, imageName, startDate, endDate, price)
               VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [
            vacation.description,
            vacation.destination,
            vacation.imageName,
            vacation.startDate,
            vacation.endDate,
            vacation.price,
        ];
        const result = yield dal_1.default.execute(sql, values);
        vacation.id = result.insertId;
        socket_logic_1.default.reportAddVacation(vacation);
        return vacation;
    });
}
// Get one vacation:
function getOneVacation(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT vacationId AS id, destination, description, imageName, startDate, endDate, price
               FROM vacations WHERE vacationId = ${id}`;
        const vacations = yield dal_1.default.execute(sql);
        const vacation = vacations[0];
        if (!vacation)
            throw new errors_model_1.ResourceNotFoundError(id);
        return vacation;
    });
}
function getPreviousImage(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT imageName FROM vacations WHERE vacationId = ${id}`;
        const image = yield dal_1.default.execute(sql);
        return image[0].imageName;
    });
}
// Update full vacation:
function updateFullVacation(vacation) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = vacation.validatePut();
        if (errors)
            throw new errors_model_1.ValidationError(errors);
        if (vacation.image) {
            const file = vacation.image;
            const filePath = file.tempFilePath;
            vacation.imageName = yield (0, upload_logic_1.uploadImage)(filePath);
            delete vacation.image;
        }
        const sql = `UPDATE vacations SET
              description = ?, destination = ?, imageName = ?, startDate = ?, endDate = ?, price = ?
              WHERE vacationId = ?`;
        const values = [
            vacation.description,
            vacation.destination,
            vacation.imageName,
            vacation.startDate,
            vacation.endDate,
            vacation.price,
            vacation.id,
        ];
        const result = yield dal_1.default.execute(sql, values);
        socket_logic_1.default.reportUpdateVacation(vacation);
        if (result.affectedRows === 0)
            throw new errors_model_1.ResourceNotFoundError(vacation.id);
        return vacation;
    });
}
// Update partial vacation:
function updatePartialVacation(vacation) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = vacation.validatePatch();
        if (errors)
            throw new errors_model_1.ValidationError(errors);
        const previousVacation = yield getOneVacation(vacation.id);
        if (vacation.image) {
            const file = vacation.image;
            const filePath = file.tempFilePath;
            if (previousVacation.imageName) {
                yield (0, upload_logic_1.deleteImage)(previousVacation.imageName);
            }
            vacation.imageName = yield (0, upload_logic_1.uploadImage)(filePath);
            delete vacation.image;
        }
        else {
            vacation.imageName = previousVacation.imageName;
        }
        const values = [];
        const fieldsToUpdate = [];
        const fields = [
            "description",
            "destination",
            "startDate",
            "endDate",
            "price",
            "imageName",
        ];
        for (const field of fields) {
            if (vacation[field] !== undefined) {
                fieldsToUpdate.push(`${field} = ?`);
                values.push(vacation[field]);
            }
        }
        const sql = `UPDATE vacations SET ${fieldsToUpdate.join(", ")} WHERE vacationId = ?`;
        values.push(vacation.id);
        const result = yield dal_1.default.execute(sql, values);
        if (result.affectedRows === 0)
            throw new errors_model_1.ResourceNotFoundError(vacation.id);
        const updatedVacation = yield getOneVacation(vacation.id);
        socket_logic_1.default.reportUpdateVacation(updatedVacation);
        return updatedVacation;
    });
}
// Delete vacation:
function deleteVacation(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const previousImage = yield getPreviousImage(id);
        const sql = `DELETE FROM vacations WHERE vacationId = ${id}`;
        yield dal_1.default.execute(sql);
        yield (0, upload_logic_1.deleteImage)(previousImage);
        socket_logic_1.default.reportDeleteVacation(id);
    });
}
exports.default = {
    getAllVacations,
    addVacation,
    updateFullVacation,
    deleteVacation,
    updatePartialVacation,
};
