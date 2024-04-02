"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express Swagger API',
            version: '1.0.0',
            description: 'A simple Express Swagger API',
        },
    },
    // Paths to files containing OpenAPI definitions
    apis: ['./src/routes/*.ts'],
};
exports.default = (0, swagger_jsdoc_1.default)(options);
