"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const joi_password_1 = require("joi-password");
class CredentialsModel {
    constructor(credentials) {
        this.username = credentials.username;
        this.password = credentials.password;
    }
    validateCredentials() {
        var _a;
        const result = CredentialsModel.postCredentialsValidationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    }
}
// POST Validation Schema:
CredentialsModel.postCredentialsValidationSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    password: joi_password_1.joiPassword.string().required(),
});
exports.default = CredentialsModel;
