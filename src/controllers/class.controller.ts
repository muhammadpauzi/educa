import { Request, Response } from "express";
import { CLASS_TITLE } from "../contants/title.contant";
import { renderWithUserDataAndFlash } from "../helpers/render.helper";

export const index = async (req: Request, res: Response): Promise<any> => {
    return renderWithUserDataAndFlash({
        req, res,
        title: CLASS_TITLE,
        path: 'class/index'
    });
}