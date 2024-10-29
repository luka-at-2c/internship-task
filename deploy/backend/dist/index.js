"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const app_1 = require("./app");
const config_1 = require("./config/config");
const logger_1 = require("./config/logger");
// @ts-ignore
let server;
const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger_1.logger.warn("Server closed");
            process.exit(1);
        });
    }
    else {
        logger_1.logger.warn("Server not started");
        process.exit(1);
    }
};
const unexpectedErrorHandler = (error) => {
    logger_1.logger.error(error);
    exitHandler();
};
exports.pool = new pg_1.Pool({
    user: config_1.config.database.options.user,
    host: config_1.config.database.connection_url,
    database: config_1.config.database.database_name,
    password: config_1.config.database.options.pass,
    port: config_1.config.database.database_port,
});
exports.pool.on("error", (err) => {
    logger_1.logger.error(err);
    process.exit(-1);
});
const startServer = () => {
    server = app_1.app.listen(config_1.config.server.port, () => {
        logger_1.logger.info(`Server started at port: ${config_1.config.server.port}`);
    });
};
if (process.env.NODE_ENV !== "test") {
    startServer();
}
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on("SIGTERM", () => {
    logger_1.logger.info("SIGTERM received");
    if (server) {
        server.close();
    }
});
//# sourceMappingURL=index.js.map