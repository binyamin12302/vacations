"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var config_1 = __importDefault(require("./config"));
// Create pool of connection and supply one when needed: 
var connection = mysql_1.default.createPool({
    host: config_1.default.sqlHost, // computer name
    user: config_1.default.sqlUser, // database username
    password: config_1.default.sqlPassword, // database password
    database: config_1.default.sqlDatabase // database name
});
function execute(sql, values) {
    return new Promise(function (resolve, reject) {
        connection.query(sql, values, function (err, result) {
            // If there is an error: 
            if (err) {
                reject(err);
                return;
            }
            // No error - report result data: 
            resolve(result);
        });
    });
}
exports.default = {
    execute: execute
};
