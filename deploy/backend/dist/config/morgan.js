"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.successHandler = void 0;
const morgan_1 = __importDefault(require("morgan"));
const config_1 = require("./config");
const logger_1 = require("./logger");
morgan_1.default.token("message", (_, res) => { var _a; return ((_a = res.errored) === null || _a === void 0 ? void 0 : _a.message) || ""; });
const getIpFormat = () => config_1.config.env === "production" ? ":remote-addr - " : "";
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;
exports.successHandler = (0, morgan_1.default)(successResponseFormat, {
    skip: (_, res) => res.statusCode >= 400,
    stream: { write: (message) => logger_1.logger.info(message.trim()) },
});
exports.errorHandler = (0, morgan_1.default)(errorResponseFormat, {
    skip: (_, res) => res.statusCode < 400,
    stream: {
        write: (message) => {
            const error = new Error(message.trim());
            logger_1.logger.error(error);
        },
    },
});
//# sourceMappingURL=morgan.js.map