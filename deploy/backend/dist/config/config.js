"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const path = __importStar(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const envalid_1 = require("envalid");
dotenv_1.default.config({ path: path.resolve(`${__dirname}/../../.env`) });
const envVars = (0, envalid_1.cleanEnv)(process.env, {
    NODE_ENV: (0, envalid_1.str)(),
    APP_PORT: (0, envalid_1.num)(),
    APP_ENVIRONMENT: (0, envalid_1.str)(),
    APP_LOG_LEVEL: (0, envalid_1.str)(),
    DB_USERNAME: (0, envalid_1.str)(),
    DB_PASSWORD: (0, envalid_1.str)(),
    DB_NAME: (0, envalid_1.str)(),
    DB_CONNECTION_STRING: (0, envalid_1.str)(),
    DB_INTERNAL_PORT: (0, envalid_1.num)(),
    DB_EXTERNAL_PORT: (0, envalid_1.num)(),
    FRONTEND_URL: (0, envalid_1.str)(),
    FRONTEND_HOST: (0, envalid_1.str)(),
    FRONTEND_PORT: (0, envalid_1.num)(),
}, {
    reporter: ({ errors }) => {
        /* eslint-disable no-unreachable-loop, no-restricted-syntax */
        for (const [environmentVariable, error] of Object.entries(errors)) {
            if (error instanceof envalid_1.EnvError) {
                throw new envalid_1.EnvError(`${environmentVariable} EnvError ${error}`);
            }
            else if (error instanceof envalid_1.EnvMissingError) {
                throw new envalid_1.EnvMissingError(`${environmentVariable} EnvMissingError ${error}`);
            }
            else {
                throw new TypeError(`${environmentVariable} error ${error}`);
            }
        }
    },
});
exports.config = {
    nodeEnv: envVars.NODE_ENV,
    env: envVars.APP_ENVIRONMENT,
    server: {
        port: envVars.APP_PORT,
        log_level: envVars.APP_LOG_LEVEL,
    },
    database: {
        connection_url: envVars.DB_CONNECTION_STRING,
        database_name: envVars.DB_NAME,
        database_port: envVars.DB_INTERNAL_PORT,
        options: {
            user: envVars.DB_USERNAME,
            pass: envVars.DB_PASSWORD,
        },
    },
    frontend: {
        url: envVars.FRONTEND_URL,
        host: envVars.FRONTEND_HOST,
        port: envVars.FRONTEND_PORT,
    },
};
//# sourceMappingURL=config.js.map