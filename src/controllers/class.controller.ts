import { Request, Response } from "express";
import { CLASS_TITLE, CREATE_CLASS_TITLE } from "../constants/title.contant";
import { renderWithUserDataAndFlash } from "../helpers/render.helper";
import IUser from "../interfaces/user.interface";
import IClass from "../interfaces/class.interface";
import { Class, User } from "../models";
import { validateClass } from '../validators/class.validator';
import { getAvailableCode } from "../helpers/class.helper";
import moment from 'moment';
import { getFullBaseURL } from "../utils/url.util";
import Student from "../models/student.model";

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
            await Class.create({ name, room, code, UserId: id });
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

export const inviteLink = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const _class = await Class.findByPk(Number(id));
        if (_class) {
            const inviteLinkURL = `${getFullBaseURL(req)}/classes/${id}/invite?code=${_class?.getDataValue('code')}`;
            return res.status(200).json({ inviteLinkURL });
        } else {
            return res.status(404).json({ message: "Class does not exist." });
        }
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

export const invite = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const { code } = req.query;
        const _class = await Class.findByPk(Number(id), { include: User });
        const { id: userId } = <IUser>req.user;

        if (_class) {
            if (_class.getDataValue('User').id != userId) {
                if (_class?.getDataValue('code') == code) {
                    const student = await Student.findOne({ where: { UserId: userId } });
                    if (student) {
                        req.flash('error', 'You have invited!');
                    } else {
                        await Student.create({ UserId: userId, ClassId: _class.getDataValue('id') });
                        req.flash('success', 'You have successfully invited!');
                        return res.redirect(`/classes/${_class.getDataValue('id')}`);
                    }
                } else {
                    req.flash('error', 'Failed to invite.');
                }
            } else {
                req.flash('error', 'You can\'t invite to this class.');
            }
        } else {
            req.flash('error', 'Class does not exist.');
        }
        return res.redirect('/');
    } catch (error: any) {
        console.log(error);
    }
}
