"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class VacationModel {
    constructor(vacation) {
        this.followState = "";
        this.followers = "";
        this.id = vacation.id;
        this.description = vacation.description;
        this.destination = vacation.destination;
        this.imageName = vacation?.imageName;
        this.image = vacation.image;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
    }
    // Validation Methods:
    validatePost() {
        const result = VacationModel.postValidationSchema.validate(this);
        return result.error?.message || "";
    }
    validatePut() {
        const result = VacationModel.putValidationSchema.validate(this);
        return result.error?.message || "";
    }
    validatePatch() {
        const result = VacationModel.patchValidationSchema.validate(this);
        return result.error?.message || "";
    }
}
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
exports.default = VacationModel;
