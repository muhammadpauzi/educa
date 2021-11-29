import { Request, Response } from "express";
import { CLASS_TITLE, CREATE_CLASS_TITLE } from "../constants/title.contant";
import { renderWithUserDataAndFlash } from "../helpers/render.helper";
import { Class, User } from "../models";
import { ClassValidator, validateClass } from '../validators/class.validator';

export const index = async (req: Request, res: Response): Promise<any> => {
    try {
        const classes = await Class.findAll({ include: User });
        return res.status(200).json({ classes });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

export const create = (req: Request, res: Response): any => {
    return renderWithUserDataAndFlash({
        req, res,
        title: CREATE_CLASS_TITLE,
        path: 'classes/create'
    });
}

export const store = async (req: Request, res: Response): Promise<any> => {
    try {
        const errors = await validateClass(req.body);
        // if success
        if (errors === true) {

        }
        return renderWithUserDataAndFlash({
            req, res,
            title: CREATE_CLASS_TITLE,
            path: 'classes/create',
            data: {
                errors
            }
        });
    } catch (error) {
        console.log(error);
    }
}