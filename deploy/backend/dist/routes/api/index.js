"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.apiRouter = express_1.default.Router();
const defaultRoutes = [{}];
const addRoutes = (router, routes) => {
    routes.forEach((route) => {
        if (Array.isArray(route.route)) {
            // If the route has nested routes, recursively add them
            const nestedRouter = express_1.default.Router();
            addRoutes(nestedRouter, route.route);
            router.use(route.path, nestedRouter);
        }
        else {
            router.use(route.path, route.route);
        }
    });
};
addRoutes(exports.apiRouter, defaultRoutes);
//# sourceMappingURL=index.js.map