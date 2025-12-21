import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import recipeRoutes from "../modules/recipe/recipe.routes";
import userRoutes from "../modules/user/user.routes";
import cors from "cors";

const globalRouter = Router();
const corsConfig = {
  origin: ["http://localhost:3000", "http://192.168.0.100:3000"],
};
globalRouter.use("/auth", cors(corsConfig), authRoutes);
globalRouter.use("/recipe", cors(corsConfig), recipeRoutes);
globalRouter.use("/user", cors(corsConfig), userRoutes);
export default globalRouter;
