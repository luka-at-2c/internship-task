"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const config_1 = require("./config/config");
const morgan_1 = require("./config/morgan");
const error_1 = require("./middlewares/error");
const api_1 = require("./routes/api");
const healthcheck_route_1 = require("./routes/healthcheck/healthcheck.route");
exports.app = (0, express_1.default)();
if (config_1.config.env !== "test") {
    exports.app.use(morgan_1.successHandler);
    exports.app.use(morgan_1.errorHandler);
}
// Parse request body as json and set a limit of 1MB
exports.app.use(express_1.default.json({ limit: "1mb" }));
// Parse urlencoded body and set a limit of 1MB
exports.app.use(express_1.default.urlencoded({ extended: true, limit: "1mb" }));
// Allow Node to get real IP address even if behind proxy
exports.app.enable("trust proxy");
// Secure HTTP headers
exports.app.use((0, helmet_1.default)());
exports.app.use((0, cors_1.default)({
    origin: `${config_1.config.frontend.url}`.split(","),
    credentials: true,
    exposedHeaders: "token",
}));
exports.app.use("/api", api_1.apiRouter);
exports.app.use("/", healthcheck_route_1.healthcheckRouter);
// Convert Error to ApiError if needed
exports.app.use(error_1.errorConverter);
// Handle Errors
exports.app.use(error_1.errorHandler);
//# sourceMappingURL=app.js.map