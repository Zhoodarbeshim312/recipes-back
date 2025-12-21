"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
const generateToken = (userId, userEmail) => {
    return jsonwebtoken_1.default.sign({
        userId,
        userEmail,
    }, JWT_SECRET, { expiresIn: "7d" });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    return { userId: decoded.id, userEmail: decoded.email };
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=token.js.map