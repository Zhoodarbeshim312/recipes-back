import { Router } from "express";
import userControllers from "./user.controllers";

const router = Router();

/**
 * @openapi
 * /api/user/getUser/{id}:
 *   get:
 *     tags:
 *       - User
 *     summary: Получить одного пользователя
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Пользователь найден
 *       404:
 *         description: Пользователь не найден
 */
router.get("/getUser/:id", userControllers.getUserById);
export default router;
