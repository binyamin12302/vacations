"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const config_1 = __importDefault(require("./2-utils/config"));
const catch_all_1 = __importDefault(require("./3-middleware/catch-all"));
const errors_model_1 = require("./4-models/errors-model");
const socket_logic_1 = __importDefault(require("./5-logic/socket-logic"));
const auth_controller_1 = __importDefault(require("./6-controllers/auth-controller"));
const vacations_controller_1 = __importDefault(require("./6-controllers/vacations-controller"));
const expressServer = (0, express_1.default)();
const clientUrl = process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://vacations-three.vercel.app";
expressServer.use((0, cors_1.default)({
    origin: clientUrl,
    credentials: true
}));
expressServer.use(express_1.default.json());
// expressServer.use(expressFileUpload());
expressServer.use((0, express_fileupload_1.default)({ useTempFiles: true,
    tempFileDir: "/tmp"
}));
expressServer.use("/api", auth_controller_1.default);
expressServer.use("/api", vacations_controller_1.default);
expressServer.use("/images", express_1.default.static(__dirname + "/1-assets/images"));
expressServer.use("*", (request, response, next) => {
    const err = new errors_model_1.RouteNotFoundError(request.method, request.originalUrl);
    next(err);
});
expressServer.use(catch_all_1.default);
const httpServer = expressServer.listen(config_1.default.port, () => console.log("Server running on port", config_1.default.port));
socket_logic_1.default.init(httpServer);
