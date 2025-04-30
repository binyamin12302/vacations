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
        const result = UserModel.postValidationSchema.validate(this);
        return result.error?.message;
    }
    idUser() {
        return this.userId;
    }
}
UserModel.postValidationSchema = joi_1.default.object({
    userId: joi_1.default.forbidden(),
    firstName: joi_1.default.string().required().min(2).max(30),
    lastName: joi_1.default.string().required().min(2).max(30),
    username: joi_1.default.string().min(8).max(40).required(),
    password: joi_password_1.joiPassword.string()
        .min(8)
        .max(30)
        .minOfLowercase(2)
        .minOfUppercase(2)
        .minOfNumeric(2)
        .minOfSpecialCharacters(1)
        .noWhiteSpaces()
        .required(),
    roleId: joi_1.default.forbidden()
});
exports.default = UserModel;
