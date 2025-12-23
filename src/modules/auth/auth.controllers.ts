import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../../config/token";
import { prisma } from "../../config/prisma";

const register = async (req: Request, res: Response) => {
  try {
    const { avatar, name, email, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({
        success: false,
        message: "Все поля (name, email, password) обязательны!",
      });
    }

    const findUser = await prisma.user.findUnique({
      where: { email },
    });
    if (findUser) {
      return res.status(409).json({
        success: false,
        message: "Такой пользователь уже существует!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        avatar,
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = generateToken(user.id, user.email);

    res.status(201).json({
      success: true,
      token,
      userId: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      success: false,
      message: "Ошибка на сервере при регистрации",
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email и пароль обязательны!",
      });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.password) {
      return res.status(401).json({
        success: false,
        message: "Неверный email или пароль!",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({
        success: false,
        message: "Неверный email или пароль!",
      });
    }

    const token = generateToken(user.id, user.email);

    res.status(200).json({
      success: true,
      token,
      userId: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Ошибка на сервере при входе",
    });
  }
};

const resetPassword = async (req: Request, res: Response) => {
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

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Пользователь не найден!",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    res.status(200).json({
      success: true,
      message: "Пароль успешно обновлён!",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({
      success: false,
      message: "Ошибка на сервере при обновлении пароля",
    });
  }
};

export default {
  register,
  login,
  resetPassword,
};
