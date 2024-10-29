"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callQuery = void 0;
const index_1 = require("../../index");
const DBError_1 = require("../../shared/error/DBError");
const logger_1 = require("./../../config/logger");
const callQuery = async (sqlQuery, queryValues, getAll = false) => {
    let client;
    try {
        client = await index_1.pool.connect();
        const result = await client.query(sqlQuery, queryValues);
        return getAll ? result.rows : result.rows[0];
    }
    catch (error) {
        logger_1.logger.error(error);
        throw new DBError_1.DBError(error);
    }
    finally {
        if (client) {
            client.release();
        }
    }
};
exports.callQuery = callQuery;
//# sourceMappingURL=query.js.map