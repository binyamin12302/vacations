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
const user_model_1 = __importDefault(require("../4-models/user-model"));
const auth_logic_1 = __importDefault(require("../5-logic/auth-logic"));
const credentials_model_1 = __importDefault(require("../4-models/credentials-model"));
const cyber_1 = __importDefault(require("../2-utils/cyber"));
const verify_logged_in_1 = __importDefault(require("../3-middleware/verify-logged-in"));
const follow_model_1 = __importDefault(require("../4-models/follow-model"));
const router = express_1.default.Router();
// POST http://localhost:3001/api/auth/register
router.post("/auth/register", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new user_model_1.default(request.body);
        const token = yield auth_logic_1.default.register(user);
        response.status(201).json(token);
    }
    catch (error) {
        next(error);
    }
}));
// POST http://localhost:3001/api/auth/login
router.post("/auth/login", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credentials = new credentials_model_1.default(request.body);
        const token = yield auth_logic_1.default.login(credentials);
        response.json(token);
    }
    catch (error) {
        next(error);
    }
}));
// POST http://localhost:3001/api/auth/follow
router.post("/auth/follow", verify_logged_in_1.default, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userId = cyber_1.default.getUserId(request);
        request.body.userId = userId;
        const followModel = new follow_model_1.default(request.body);
        const followedVacation = yield auth_logic_1.default.followVacation(followModel);
        response.json(followedVacation);
    }
    catch (error) {
        next(error);
    }
}));
// DELETE http://localhost:3001/api/auth/unfollow/:id
router.delete("/auth/unfollow/:id([0-9]+)", verify_logged_in_1.default, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = cyber_1.default.getUserId(request);
        const vacationId = +request.params.id;
        const followModel = new follow_model_1.default({ userId, vacationId });
        yield auth_logic_1.default.unfollowVacation(followModel);
        response.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
