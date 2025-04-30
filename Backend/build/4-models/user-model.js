"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var joi_password_1 = require("joi-password");
var UserModel = /** @class */ (function () {
    function UserModel(user) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        this.roleId = user.roleId;
    }
    UserModel.prototype.validatePost = function () {
        var _a;
        var result = UserModel.postValidationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    UserModel.prototype.idUser = function () {
        return this.userId;
    };
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
    return UserModel;
}());
exports.default = UserModel;
