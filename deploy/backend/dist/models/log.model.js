"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogQuery = void 0;
const query_1 = require("./utils/query");
const createLogQuery = async (message, stack) => {
    const insertSQL = `
        INSERT INTO "Log" ("message", "stack", "createdAt", "updatedAt") 
        VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *;
    `;
    const values = [message, stack];
    return (0, query_1.callQuery)(insertSQL, values);
};
exports.createLogQuery = createLogQuery;
//# sourceMappingURL=log.model.js.map