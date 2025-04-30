"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var VacationModel = /** @class */ (function () {
    function VacationModel(vacation) {
        this.id = vacation.id;
        this.description = vacation.description;
        this.destination = vacation.destination;
        this.imageName = vacation === null || vacation === void 0 ? void 0 : vacation.imageName;
        this.image = vacation.image;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
    }
    // Validation Methods:
    VacationModel.prototype.validatePost = function () {
        var _a;
        var result = VacationModel.postValidationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    VacationModel.prototype.validatePut = function () {
        var _a;
        var result = VacationModel.putValidationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    VacationModel.prototype.validatePatch = function () {
        var _a;
        var result = VacationModel.patchValidationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    // Validation Schemas:
    VacationModel.postValidationSchema = joi_1.default.object({
        id: joi_1.default.forbidden(),
        description: joi_1.default.string().required().min(5).max(90),
        destination: joi_1.default.string().required().min(2).max(30),
        imageName: joi_1.default.string().min(10).max(255),
        startDate: joi_1.default.date().required(),
        endDate: joi_1.default.date().required(),
        price: joi_1.default.number().required().min(100).max(10000),
        image: joi_1.default.required()
    });
    VacationModel.putValidationSchema = joi_1.default.object({
        id: joi_1.default.number().required().integer().min(1),
        description: joi_1.default.string().required().min(5).max(90),
        destination: joi_1.default.string().required().min(2).max(30),
        imageName: joi_1.default.string().min(10).max(255),
        startDate: joi_1.default.date().required(),
        endDate: joi_1.default.date().required(),
        price: joi_1.default.number().required().min(100).max(10000),
        image: joi_1.default.optional()
    });
    VacationModel.patchValidationSchema = joi_1.default.object({
        id: joi_1.default.number().required().integer().min(1),
        description: joi_1.default.string().optional().min(5).max(90),
        destination: joi_1.default.string().optional().min(2).max(30),
        imageName: joi_1.default.string().min(10).max(255),
        startDate: joi_1.default.date().optional(),
        endDate: joi_1.default.date().optional(),
        price: joi_1.default.number().optional().min(100).max(10000),
        image: joi_1.default.optional()
    });
    return VacationModel;
}());
exports.default = VacationModel;
