"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const joi_password_1 = require("joi-password");
class UserModel {
    constructor(user) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        this.roleId = user.roleId;
    }
    validatePost() {
        var _a;
        const result = UserModel.postValidationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    }
    idUser() {
        return this.userId;
    }
}
UserModel.postValidationSchema = joi_1.default.object({
    userId: joi_1.default.forbidden(),
    firstName: joi_1.default.string()
        .required()
        .min(2)
        .max(30)
        .pattern(/^[A-Za-zא-ת\s\-]+$/),
    lastName: joi_1.default.string()
        .required()
        .min(2)
        .max(30)
        .pattern(/^[A-Za-zא-ת\s\-']+$/),
    username: joi_1.default.string()
        .min(8)
        .max(30)
        .required()
        .pattern(/^[A-Za-zא-ת0-9_-]+$/),
    password: joi_password_1.joiPassword
        .string()
        .min(8)
        .max(30)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .minOfSpecialCharacters(1)
        .noWhiteSpaces()
        .required(),
    roleId: joi_1.default.forbidden(),
});
exports.default = UserModel;
