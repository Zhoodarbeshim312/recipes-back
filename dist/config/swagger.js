"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDocs = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const path_1 = __importDefault(require("path"));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Documentation",
            version: "1.0.0",
            description: "Express + Prisma + TypeScript API documentation",
        },
        // ✅ ДОБАВЛЯЕМ components
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                Recipe: {
                    type: "object",
                    properties: {
                        title: { type: "string" },
                        description: { type: "string" },
                        images: {
                            type: "array",
                            items: { type: "string" },
                        },
                        ingredients: {
                            type: "array",
                            items: { type: "string" },
                        },
                        instructions: {
                            type: "array",
                            items: { type: "string" },
                        },
                        nutrition: { type: "object" },
                        fill: { type: "integer" },
                        cookingTime: { type: "string" },
                        preparationTime: { type: "string" },
                        category: { type: "string" },
                    },
                },
            },
        },
    },
    apis: [
        path_1.default.join(__dirname, "../routes/**/*.ts"),
        path_1.default.join(__dirname, "../modules/**/*.ts"),
    ],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const swaggerDocs = (app, port) => {
    app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    console.log(`✅ Swagger Docs: http://localhost:${port}/docs`);
};
exports.swaggerDocs = swaggerDocs;
//# sourceMappingURL=swagger.js.map