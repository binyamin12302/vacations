"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.env.NODE_ENV)
    process.env.NODE_ENV = "development";
class Config {
    constructor() {
        this.isDevelopment = process.env.NODE_ENV === "development";
        this.isProduction = process.env.NODE_ENV === "production";
        this.port = 0; // Node/Express
        this.sqlPort = 0;
        this.sqlHost = "";
        this.sqlUser = "";
        this.sqlPassword = "";
        this.sqlDatabase = "";
    }
}
class DevelopmentConfig extends Config {
    constructor() {
        super(...arguments);
        this.port = +(process.env.PORT || 3000); // Node/Express (3000)
        this.sqlPort = +(process.env.SQL_PORT || 26386);
        this.sqlHost = process.env.SQL_HOST || "localhost";
        this.sqlUser = process.env.SQL_USER || "root";
        this.sqlPassword = process.env.SQL_PASSWORD || "";
        this.sqlDatabase = process.env.SQL_DATABASE || "vacationproject";
    }
}
class ProductionConfig extends Config {
    constructor() {
        super(...arguments);
        this.port = +(process.env.PORT || 3000);
        this.sqlPort = +(process.env.SQL_PORT || 26386); // MySQL
        this.sqlHost = process.env.SQL_HOST || "";
        this.sqlUser = process.env.SQL_USER || "";
        this.sqlPassword = process.env.SQL_PASSWORD || "";
        this.sqlDatabase = process.env.SQL_DATABASE || "";
    }
}
const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();
exports.default = config;
