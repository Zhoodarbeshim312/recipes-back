"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recipe_controllers_1 = __importDefault(require("./recipe.controllers"));
const authMiddleware_1 = __importDefault(require("../../middleWare/authMiddleware"));
const router = (0, express_1.Router)();
/**
 * @openapi
 * /api/recipe/getAllRecipe:
 *   get:
 *     tags:
 *       - Recipe
 *     summary: Получить все рецепты
 *     responses:
 *       200:
 *         description: Список рецептов
 */
router.get("/getAllRecipe", recipe_controllers_1.default.getAllRecipe);
/**
 * @openapi
 * /api/recipe/getOneRecipe/{id}:
 *   get:
 *     tags:
 *       - Recipe
 *     summary: Получить один рецепт
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Рецепт найден
 *       404:
 *         description: Рецепт не найден
 */
router.get("/getOneRecipe/:id", recipe_controllers_1.default.getOneRecipe);
/**
 * @openapi
 * /api/recipe/addRecipe:
 *   post:
 *     tags:
 *       - Recipe
 *     summary: Добавить рецепт
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recipe'
 *     responses:
 *       201:
 *         description: Рецепт создан
 */
router.post("/addRecipe", authMiddleware_1.default, recipe_controllers_1.default.addRecipe);
/**
 * @openapi
 * /api/recipe/updateRecipe/{id}:
 *   put:
 *     tags:
 *       - Recipe
 *     summary: Обновить рецепт
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Рецепт обновлён
 */
router.put("/updateRecipe/:id", authMiddleware_1.default, recipe_controllers_1.default.updateRecipe);
/**
 * @openapi
 * /api/recipe/deleteRecipe/{id}:
 *   delete:
 *     tags:
 *       - Recipe
 *     summary: Удалить рецепт
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Рецепт удалён
 */
router.delete("/deleteRecipe/:id", authMiddleware_1.default, recipe_controllers_1.default.deleteRecipe);
exports.default = router;
//# sourceMappingURL=recipe.routes.js.map