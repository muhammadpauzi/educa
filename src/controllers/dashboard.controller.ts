import { Request, Response } from "express";
import { DASHBOARD_TITLE } from "../constants/title.contant";
import { renderWithUserDataAndFlash } from "../helpers/render.helper";

export const index = async (req: Request, res: Response): Promise<any> => {
    return renderWithUserDataAndFlash({
        req, res,
        title: DASHBOARD_TITLE,
        path: 'dashboard/index'
    });
}