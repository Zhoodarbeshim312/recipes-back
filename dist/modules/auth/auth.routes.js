"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controllers_1 = __importDefault(require("./auth.controllers"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Регистрация нового пользователя
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               avatar:
 *                 type: string
 *                 example: https://i.pinimg.com/avatar.jpg
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: MyPassword123
 *     responses:
 *       201:
 *         description: Пользователь успешно создан
 *       401:
 *         description: Пользователь уже существует
 */
router.post("/register", auth_controllers_1.default.register);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Логин пользователя
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: MyPassword123
 *     responses:
 *       200:
 *         description: Успешный логин, возвращает токен
 *       401:
 *         description: Неверный пароль
 *       404:
 *         description: Пользователь не найден
 */
router.post("/login", auth_controllers_1.default.login);
/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Сброс пароля
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               newPassword:
 *                 type: string
 *                 example: NewPassword123
 *     responses:
 *       200:
 *         description: Пароль успешно обновлён
 *       400:
 *         description: Ошибка в данных
 *       404:
 *         description: Пользователь не найден
 */
router.post("/reset-password", auth_controllers_1.default.resetPassword);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map