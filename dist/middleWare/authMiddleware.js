"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("../config/token");
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Token не доступен!",
            });
        }
        const token = authHeader.split(" ")[1];
        const decoded = (0, token_1.verifyToken)(token);
        req.userId = decoded.userId;
        req.userEmail = decoded.userEmail;
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "Неверный или отсутствующий токен",
        });
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map