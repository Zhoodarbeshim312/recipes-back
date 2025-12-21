"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../config/prisma");
const getAllRecipe = async (req, res) => {
    try {
        const recipes = await prisma_1.prisma.recipe.findMany({
            include: {
                user: true,
                comments: true,
                save: true,
            },
        });
        res.json({
            success: true,
            recipes,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: `Error in getAllRecipe: ${error}`,
        });
    }
};
const getOneRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await prisma_1.prisma.recipe.findUnique({
            where: {
                id: String(id),
            },
            include: {
                user: true,
                comments: true,
                save: true,
            },
        });
        if (!recipe)
            return res.status(404).json({
                success: false,
                message: "Рецепт не найден",
            });
        res.json({
            success: true,
            recipe,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: `Error in getOneRecipe: ${error}`,
        });
    }
};
const addRecipe = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                error: "User not authenticated",
            });
        }
        const { title, description, images, ingredients, instructions, nutrition, fill, cookingTime, preparationTime, category, } = req.body;
        const recipe = await prisma_1.prisma.recipe.create({
            data: {
                title,
                description,
                images: images || [],
                ingredients,
                instructions,
                nutrition: nutrition || {},
                fill: fill || null,
                cookingTime: cookingTime || null,
                preparationTime: preparationTime || null,
                category,
                user: {
                    connect: { id: userId }, // вот здесь привязываем рецепт к пользователю
                },
            },
        });
        res.status(201).json({
            success: true,
            recipe,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: `Error in addRecipe: ${error}`,
        });
    }
};
const updateRecipe = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;
        const { title, description, images, ingredients, instructions, nutrition, fill, cookingTime, preparationTime, category, } = req.body;
        const recipe = await prisma_1.prisma.recipe.findUnique({
            where: {
                id: String(id),
            },
        });
        if (!recipe)
            return res.status(404).json({
                success: false,
                message: "Рецепт не найден",
            });
        if (recipe.userId !== userId)
            return res.status(403).json({
                success: false,
                message: "Нет доступа",
            });
        const updatedRecipe = await prisma_1.prisma.recipe.update({
            where: {
                id: String(id),
            },
            data: {
                title,
                description,
                images,
                ingredients,
                instructions,
                nutrition,
                fill,
                cookingTime,
                preparationTime,
                category,
            },
        });
        res.json({
            success: true,
            recipe: updatedRecipe,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: `Error in updateRecipe: ${error}`,
        });
    }
};
const deleteRecipe = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;
        const recipe = await prisma_1.prisma.recipe.findUnique({
            where: {
                id: String(id),
            },
        });
        if (!recipe)
            return res.status(404).json({
                success: false,
                message: "Рецепт не найден",
            });
        if (recipe.userId !== userId)
            return res.status(403).json({
                success: false,
                message: "Нет доступа",
            });
        await prisma_1.prisma.recipe.delete({
            where: {
                id: String(id),
            },
        });
        res.json({
            success: true,
            message: "Рецепт удалён",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: `Error in deleteRecipe: ${error}`,
        });
    }
};
exports.default = {
    getAllRecipe,
    getOneRecipe,
    addRecipe,
    updateRecipe,
    deleteRecipe,
};
//# sourceMappingURL=recipe.controllers.js.map