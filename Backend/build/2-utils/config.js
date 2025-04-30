"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.env.NODE_ENV)
    process.env.NODE_ENV = "development";
var Config = /** @class */ (function () {
    function Config() {
        this.isDevelopment = process.env.NODE_ENV === "development";
        this.isProduction = process.env.NODE_ENV === "production";
        this.port = 0;
        this.sqlHost = "";
        this.sqlUser = "";
        this.sqlPassword = "";
        this.sqlDatabase = "";
    }
    return Config;
}());
var DevelopmentConfig = /** @class */ (function (_super) {
    __extends(DevelopmentConfig, _super);
    function DevelopmentConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.port = 3001;
        _this.sqlHost = process.env.SQL_HOST || "localhost";
        _this.sqlUser = process.env.SQL_USER || "root";
        _this.sqlPassword = process.env.SQL_PASSWORD || "";
        _this.sqlDatabase = process.env.SQL_DATABASE || "vacationproject";
        return _this;
    }
    return DevelopmentConfig;
}(Config));
var ProductionConfig = /** @class */ (function (_super) {
    __extends(ProductionConfig, _super);
    function ProductionConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.port = +(process.env.PORT || 8080);
        _this.sqlHost = process.env.SQL_HOST || "";
        _this.sqlUser = process.env.SQL_USER || "";
        _this.sqlPassword = process.env.SQL_PASSWORD || "";
        _this.sqlDatabase = process.env.SQL_DATABASE || "";
        return _this;
    }
    return ProductionConfig;
}(Config));
var config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();
exports.default = config;
