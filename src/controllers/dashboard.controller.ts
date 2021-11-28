import { Request, Response } from "express";
import { DASHBOARD_TITLE } from "../contants/title.contant";
import { renderWithTitleAndUserData } from "../helpers/render.helper";

export const index = async (req: Request, res: Response): Promise<any> => {
    return renderWithTitleAndUserData({
        req, res,
        title: DASHBOARD_TITLE,
        path: 'dashboard/index'
    });
}