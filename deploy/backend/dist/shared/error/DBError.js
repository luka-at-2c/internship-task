"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBError = void 0;
const http_status_1 = __importDefault(require("http-status"));
const BaseError_1 = require("./BaseError");
class DBError extends BaseError_1.BaseError {
    constructor(message, statusCode = http_status_1.default.INTERNAL_SERVER_ERROR, isOperational = true, stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.DBError = DBError;
//# sourceMappingURL=DBError.js.map