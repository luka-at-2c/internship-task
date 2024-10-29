"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino_1 = __importDefault(require("pino"));
const config_1 = require("./config");
const customLogger = (0, pino_1.default)({
    formatters: {
        level: (label) => ({ level: label.toUpperCase() }),
    },
    level: config_1.config.server.log_level,
    redact: { paths: ["password"] },
    transport: config_1.config.env !== "development"
        ? undefined
        : { target: "pino-pretty", options: { colorize: true } },
});
const devLogger = {
    debug: (message) => {
        customLogger.debug(message);
    },
    trace: (message) => {
        customLogger.trace(message);
    },
    info: (message) => {
        customLogger.info(message);
    },
    warn: (message) => {
        customLogger.warn(message);
    },
    error: (err) => {
        const { message, stack } = err;
        customLogger.error({ message, stack });
    },
};
const prodLogger = Object.assign(Object.assign({}, devLogger), { error: (err) => {
        const { message, stack } = err;
        customLogger.error({ message, stack });
        // TODO: Add error to the DB
    } });
exports.logger = config_1.config.env === "development" ? devLogger : prodLogger;
//# sourceMappingURL=logger.js.map