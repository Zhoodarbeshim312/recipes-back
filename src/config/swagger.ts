import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import path from "path";

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
    path.join(__dirname, "../routes/**/*.ts"),
    path.join(__dirname, "../modules/**/*.ts"),
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app: Express, port: number) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`✅ Swagger Docs: http://localhost:${port}/docs`);
};
