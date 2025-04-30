"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var joi_password_1 = require("joi-password");
var CredentialsModel = /** @class */ (function () {
    function CredentialsModel(credentials) {
        this.username = credentials.username;
        this.password = credentials.password;
    }
    CredentialsModel.prototype.validateCredentials = function () {
        var _a;
        var result = CredentialsModel.postCredentialsValidationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    // POST Validation Schema:
    CredentialsModel.postCredentialsValidationSchema = joi_1.default.object({
        username: joi_1.default.string().required(),
        password: joi_password_1.joiPassword.string().required(),
    });
    return CredentialsModel;
}());
exports.default = CredentialsModel;
