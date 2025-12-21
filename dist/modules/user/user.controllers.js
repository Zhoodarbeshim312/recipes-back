"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../config/prisma");
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma_1.prisma.user.findUnique({
            where: {
                id: String(id),
            },
            select: {
                id: true,
                avatar: true,
                name: true,
                lastName: true,
                email: true,
                createdAt: true,
                updatedAt: true,
                recipe: true,
                comments: true,
                save: true,
            },
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            user,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: `Error in getUserById: ${error}`,
        });
    }
};
exports.default = {
    getUserById,
};
//# sourceMappingURL=user.controllers.js.map