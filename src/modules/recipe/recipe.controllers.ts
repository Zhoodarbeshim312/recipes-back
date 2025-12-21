import { Request, Response } from "express";
import { prisma } from "../../config/prisma";

const getAllRecipe = async (req: Request, res: Response) => {
  try {
    const recipes = await prisma.recipe.findMany({
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
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error in getAllRecipe: ${error}`,
    });
  }
};

const getOneRecipe = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const recipe = await prisma.recipe.findUnique({
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
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error in getOneRecipe: ${error}`,
    });
  }
};

const addRecipe = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "User not authenticated",
      });
    }

    const {
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
    } = req.body;

    const recipe = await prisma.recipe.create({
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
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error in addRecipe: ${error}`,
    });
  }
};

const updateRecipe = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const { id } = req.params;
    const {
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
    } = req.body;

    const recipe = await prisma.recipe.findUnique({
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

    const updatedRecipe = await prisma.recipe.update({
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
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error in updateRecipe: ${error}`,
    });
  }
};

const deleteRecipe = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const { id } = req.params;

    const recipe = await prisma.recipe.findUnique({
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

    await prisma.recipe.delete({
      where: {
        id: String(id),
      },
    });

    res.json({
      success: true,
      message: "Рецепт удалён",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error in deleteRecipe: ${error}`,
    });
  }
};

export default {
  getAllRecipe,
  getOneRecipe,
  addRecipe,
  updateRecipe,
  deleteRecipe,
};
