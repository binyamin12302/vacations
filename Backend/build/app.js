"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var config_1 = __importDefault(require("./2-utils/config"));
var catch_all_1 = __importDefault(require("./3-middleware/catch-all"));
var errors_model_1 = require("./4-models/errors-model");
var socket_logic_1 = __importDefault(require("./5-logic/socket-logic"));
var auth_controller_1 = __importDefault(require("./6-controllers/auth-controller"));
var vacations_controller_1 = __importDefault(require("./6-controllers/vacations-controller"));
var expressServer = (0, express_1.default)();
expressServer.use((0, cors_1.default)());
expressServer.use(express_1.default.json());
// expressServer.use(expressFileUpload());
expressServer.use((0, express_fileupload_1.default)({ useTempFiles: true }));
expressServer.use("/api", auth_controller_1.default);
expressServer.use("/api", vacations_controller_1.default);
expressServer.use("/images", express_1.default.static(__dirname + "/1-assets/images"));
expressServer.use("*", function (request, response, next) {
    var err = new errors_model_1.RouteNotFoundError(request.method, request.originalUrl);
    next(err);
});
expressServer.use(catch_all_1.default);
var httpServer = expressServer.listen(config_1.default.port, function () { return console.log("Listening...."); });
socket_logic_1.default.init(httpServer);
