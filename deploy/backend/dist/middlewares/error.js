"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.errorConverter = void 0;
const http_status_1 = __importDefault(require("http-status"));
const log_model_1 = require("../models/log.model");
const ApiError_1 = require("../shared/error/ApiError");
const config_1 = require("./../config/config");
const logger_1 = require("./../config/logger");
const errorConverter = (err, _req, _res, next) => {
    let error = err;
    if (!(error instanceof ApiError_1.ApiError)) {
        const statusCode = error.statusCode
            ? http_status_1.default.BAD_REQUEST
            : http_status_1.default.INTERNAL_SERVER_ERROR;
        const message = error.message || http_status_1.default[statusCode];
        error = new ApiError_1.ApiError(message, statusCode, true, err.stack);
    }
    next(error);
};
exports.errorConverter = errorConverter;
/*  eslint-disable @typescript-eslint/no-unused-vars */
// @ts-ignore
const errorHandler = (err, _req, res, next) => {
    let { statusCode, message } = err;
    if (config_1.config.env !== "development" && !err.isOperational) {
        statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
        message = http_status_1.default[http_status_1.default.INTERNAL_SERVER_ERROR];
    }
    // eslint-disable-next-line no-param-reassign
    res.locals.errorMessage = err.message;
    const response = Object.assign({ success: false, error: {
            code: statusCode || "500",
            message: message || "An unexpected error occurred",
        } }, (config_1.config.env === "development" && { stack: err.stack }));
    if (config_1.config.env === "development") {
        logger_1.logger.error(err);
    }
    (0, log_model_1.createLogQuery)(message, err.stack);
    res.status(statusCode).send(response);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.js.map