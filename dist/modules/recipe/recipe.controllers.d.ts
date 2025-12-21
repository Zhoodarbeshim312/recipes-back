import { Request, Response } from "express";
declare const _default: {
    getAllRecipe: (req: Request, res: Response) => Promise<void>;
    getOneRecipe: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    addRecipe: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateRecipe: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteRecipe: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
export default _default;
//# sourceMappingURL=recipe.controllers.d.ts.map