import { Request, Response } from "express";

export const index = async (req: Request, res: Response): Promise<any> => {
    return res.render('dashboard/index');
}