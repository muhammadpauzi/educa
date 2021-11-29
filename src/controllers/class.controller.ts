import { Request, Response } from "express";
import { CLASS_TITLE, CREATE_CLASS_TITLE } from "../constants/title.contant";
import { renderWithUserDataAndFlash } from "../helpers/render.helper";
import IUser from "../interfaces/user.interface";
import IClass from "../interfaces/class.interface";
import { Class, User } from "../models";
import { validateClass } from '../validators/class.validator';
import { getAvailableCode } from "../helpers/class.helper";
import moment from 'moment';

export const index = async (req: Request, res: Response): Promise<any> => {
    try {
        if (process.env.NODE_ENV == "development" || req.headers["content-type"] == 'application/json') { // prevent if opened from browser (for production)
            const { id } = <IUser>req.user;
            const user = await User.findByPk(id, { order: [[Class, 'createdAt', 'DESC']], include: Class });
            return res.status(200).json({ user });
        }
        return res.redirect('/');
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
        const { name, room }: IClass = req.body;
        let code = await getAvailableCode();
        // validate request
        const errors = await validateClass({ name, room, code });
        // if validate success
        if (errors === true) {
            const { id } = <IUser>req.user; // fix: 'id' does not exist on type of User / Express.User
            await Class.create({ name, room, code, UserId: Number(id) });
            req.flash('success', 'Class has successfully created!');
            return res.redirect('/');
        }
        // if validate fail/error
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

export const _class = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const classData = await Class.findByPk(Number(id), { include: User });
        return renderWithUserDataAndFlash({
            req, res,
            title: CLASS_TITLE,
            path: 'classes/class',
            data: {
                classData
            }
        });
    } catch (error: any) {
        console.log(error);
    }
}