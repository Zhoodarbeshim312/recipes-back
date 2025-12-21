"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("../modules/auth/auth.routes"));
const recipe_routes_1 = __importDefault(require("../modules/recipe/recipe.routes"));
const user_routes_1 = __importDefault(require("../modules/user/user.routes"));
const cors_1 = __importDefault(require("cors"));
const globalRouter = (0, express_1.Router)();
const corsConfig = {
    origin: ["http://localhost:3000", "http://192.168.0.100:3000"],
};
globalRouter.use("/auth", (0, cors_1.default)(corsConfig), auth_routes_1.default);
globalRouter.use("/recipe", (0, cors_1.default)(corsConfig), recipe_routes_1.default);
globalRouter.use("/user", (0, cors_1.default)(corsConfig), user_routes_1.default);
exports.default = globalRouter;
//# sourceMappingURL=routes.js.map