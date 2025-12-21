import { Router } from "express";
import recipeControllers from "./recipe.controllers";
import authMiddleware from "../../middleWare/authMiddleware";

const router = Router();

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
router.get("/getAllRecipe", recipeControllers.getAllRecipe);

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
router.get("/getOneRecipe/:id", recipeControllers.getOneRecipe);

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
router.post("/addRecipe", authMiddleware, recipeControllers.addRecipe);

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
router.put("/updateRecipe/:id", authMiddleware, recipeControllers.updateRecipe);

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
router.delete(
  "/deleteRecipe/:id",
  authMiddleware,
  recipeControllers.deleteRecipe
);

export default router;
