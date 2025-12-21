"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const token_1 = require("../../config/token");
const prisma_1 = require("../../config/prisma");
const register = async (req, res) => {
    try {
        const { avatar, name, lastName, email, password } = req.body;
        if (!email || !name || !password || !lastName) {
            return res.status(400).json({
                success: false,
                message: "Все поля (name, email, password) обязательны!",
            });
        }
        const findUser = await prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (findUser) {
            return res.status(409).json({
                success: false,
                message: "Такой пользователь уже существует!",
            });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await prisma_1.prisma.user.create({
            data: {
                avatar,
                name,
                lastName,
                email,
                password: hashedPassword,
            },
        });
        const token = (0, token_1.generateToken)(user.id, user.email);
        res.status(201).json({
            success: true,
            token,
            userId: user.id,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            lastName: user.lastName,
        });
    }
    catch (error) {
        console.error("Register error:", error);
        res.status(500).json({
            success: false,
            message: "Ошибка на сервере при регистрации",
        });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email и пароль обязательны!",
            });
        }
        const user = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (!user || !user.password) {
            return res.status(401).json({
                success: false,
                message: "Неверный email или пароль!",
            });
        }
        const checkPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!checkPassword) {
            return res.status(401).json({
                success: false,
                message: "Неверный email или пароль!",
            });
        }
        const token = (0, token_1.generateToken)(user.id, user.email);
        res.status(200).json({
            success: true,
            token,
            userId: user.id,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            lastName: user.lastName,
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Ошибка на сервере при входе",
        });
    }
};
const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        if (!email || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Email и новый пароль обязательны!",
            });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Пароль должен содержать минимум 6 символов!",
            });
        }
        const user = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Пользователь не найден!",
            });
        }
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        await prisma_1.prisma.user.update({
            where: { email },
            data: { password: hashedPassword },
        });
        res.status(200).json({
            success: true,
            message: "Пароль успешно обновлён!",
        });
    }
    catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({
            success: false,
            message: "Ошибка на сервере при обновлении пароля",
        });
    }
};
exports.default = {
    register,
    login,
    resetPassword,
};
//# sourceMappingURL=auth.controllers.js.map