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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cyber_1 = __importDefault(require("../2-utils/cyber"));
const verify_admin_1 = __importDefault(require("../3-middleware/verify-admin"));
const verify_logged_in_1 = __importDefault(require("../3-middleware/verify-logged-in"));
const errors_model_1 = require("../4-models/errors-model");
const vacation_model_1 = __importDefault(require("../4-models/vacation-model"));
const fs_1 = __importDefault(require("fs"));
const vacations_logic_1 = __importDefault(require("../5-logic/vacations-logic"));
const router = express_1.default.Router();
// GET http://localhost:3001/api/vacations
router.get("/vacations", verify_logged_in_1.default, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getUserId = cyber_1.default.getUserId(request);
        console.log("=== getUserId ===", getUserId);
        const vacations = yield vacations_logic_1.default.getAllVacations(getUserId);
        console.log("=== vacations ===", vacations);
        response.json(vacations);
        throw new Error("PRODUCTION TEST ERROR");
    }
    catch (error) {
        next(error);
    }
}));
// POST http://localhost:3001/api/vacations
router.post("/vacations", verify_admin_1.default, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Take image from request into the body: 
        request.body.image = (_a = request.files) === null || _a === void 0 ? void 0 : _a.image;
        console.log(request.body.image);
        const vacation = new vacation_model_1.default(request.body);
        const addedVacation = yield vacations_logic_1.default.addVacation(vacation);
        response.status(201).json(addedVacation);
    }
    catch (error) {
        next(error);
    }
}));
// PATCH http://localhost:3001/api/vacations/7 <-- id
router.patch("/vacations/:id([0-9]+)", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        request.body.id = +request.params.id;
        request.body.image = (_a = request.files) === null || _a === void 0 ? void 0 : _a.image;
        const vacation = new vacation_model_1.default(request.body);
        const updateVacation = yield vacations_logic_1.default.updatePartialVacation(vacation);
        response.json(updateVacation);
    }
    catch (err) {
        next(err);
    }
}));
// PUT http://localhost:3001/api/vacations/:id
router.put("/vacations/:id([0-9]+)", verify_admin_1.default, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        request.body.id = +request.params.id;
        request.body.image = (_a = request.files) === null || _a === void 0 ? void 0 : _a.image;
        const vacation = new vacation_model_1.default(request.body);
        const updateVacation = yield vacations_logic_1.default.updateFullVacation(vacation);
        response.json(updateVacation);
    }
    catch (error) {
        next(error);
    }
    ;
}));
// DELETE http://localhost:3001/api/vacations/:id
router.delete("/vacations/:id([0-9]+)", verify_admin_1.default, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +request.params.id;
        yield vacations_logic_1.default.deleteVacation(id);
        response.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
}));
//GET http://localhost:3001/api/vacations/images/:imageName
router.get("/vacations/images/:imageName", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageName = request.params.imageName;
        const absolutePath = path_1.default.join(__dirname, "..", "1-assets", "images", imageName);
        if (!fs_1.default.existsSync(absolutePath)) {
            throw new errors_model_1.RouteNotFoundError(request.method, request.originalUrl);
        }
        response.sendFile(absolutePath);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
