import { Request, Response } from "express";
import { CLASS_TITLE, CREATE_CLASS_TITLE, CREATE_WORK_TITLE, UPDATE_CLASS_TITLE, WORK_DETAIL_TITLE } from "../constants/title.contant";
import { renderWithUserDataAndFlash } from "../helpers/render.helper";
import IUser from "../interfaces/user.interface";
import IClass from "../interfaces/class.interface";
import { Class, User, Student, Work } from "../models";
import { Op } from 'sequelize';
import { validateClass } from '../validators/class.validator';
import { getAvailableCode } from "../helpers/class.helper";
import moment from 'moment';
import { getFullBaseURL } from "../utils/url.util";
import { validateJoinClass } from "../validators/join.validator";
import IWork from "../interfaces/work.interface";
import { validateWork } from "../validators/work.validator";

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

export const followedClasses = async (req: Request, res: Response): Promise<any> => {
    try {
        if (process.env.NODE_ENV == "development" || req.headers["content-type"] == 'application/json') { // prevent if opened from browser (for production)
            const { id } = <IUser>req.user;
            const students = await Student.findAll({
                where: {
                    UserId: id,
                    ClassId: {
                        [Op.ne]: null
                    }
                }, include: [Class, User]
            });
            return res.status(200).json({ students });
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

export const join = (req: Request, res: Response): any => {
    return renderWithUserDataAndFlash({
        req, res,
        title: CREATE_CLASS_TITLE,
        path: 'classes/join'
    });
}

export const joinPost = async (req: Request, res: Response): Promise<any> => {
    try {
        const { code }: IClass = req.body;
        const classData = await Class.findOne({ where: { code }, include: User });
        const { id: userId } = <IUser>req.user;

        // validate request
        const errors = await validateJoinClass({ code });
        // if validate success
        if (errors === true) {
            if (classData) {
                if (classData.getDataValue('User').id == userId) {
                    req.flash('error', 'You can\'t invite to this class.');
                } else {
                    // check if user has invited
                    const student = await Student.findOne({ where: { UserId: userId, ClassId: classData.getDataValue('id') } });
                    if (student) {
                        req.flash('error', 'You have invited!');
                    } else {
                        await Student.create({ UserId: userId, ClassId: classData.getDataValue('id') });
                        req.flash('success', 'You have successfully invited!');
                        return res.redirect(`/`);
                    }
                }
            } else {
                req.flash('error', 'The class with the code does not exist.');
            }
        } else {
            return renderWithUserDataAndFlash({
                req, res,
                title: CREATE_CLASS_TITLE,
                path: 'classes/join',
                data: {
                    errors
                }
            });
        }
        return res.redirect(`/classes/join`);
    } catch (error) {
        console.log(error);
    }
}

export const update = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const classData = await Class.findByPk(id, { include: User });
        const { id: userId } = <IUser>req.user;

        if (classData) {
            if (classData.getDataValue('User').id == userId) {
                return renderWithUserDataAndFlash({
                    req, res,
                    title: UPDATE_CLASS_TITLE,
                    path: 'classes/update',
                    data: {
                        classData
                    }
                });
            } else {
                req.flash('error', 'You don\'t have any permission to update this class.');
            }
        } else {
            req.flash('error', 'The class does not exist.');
        }
        return res.redirect(`/`);
    } catch (error) {
        console.log(error);
    }
}

export const updatePut = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const classData = await Class.findByPk(id, { include: User });
        const { id: userId } = <IUser>req.user;
        const { name, room }: IClass = req.body;

        if (classData) {
            const code = classData?.getDataValue('code');
            // validate request
            const errors = await validateClass({ name, room, code });

            // if validate success
            if (errors === true) {
                if (classData.getDataValue('User').id == userId) {
                    await classData.update({
                        name,
                        room,
                        code
                    });
                    req.flash('success', 'You have successfully updated the class.');
                } else {
                    req.flash('error', 'You don\'t have any permission to update this class.');
                }
            } else {
                return renderWithUserDataAndFlash({
                    req, res,
                    title: UPDATE_CLASS_TITLE,
                    path: 'classes/update',
                    data: {
                        errors,
                        classData
                    }
                });
            }
        } else {
            req.flash('error', 'The class does not exist.');
            return res.redirect(`/`);
        }
        return res.redirect(`/classes/${id}`);
    } catch (error) {
        console.log(error);
    }
}

export const _class = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const classData = await Class.findByPk(Number(id), { include: User });

        if (classData) {
            return renderWithUserDataAndFlash({
                req, res,
                title: CLASS_TITLE,
                path: 'classes/class',
                data: {
                    classData
                }
            });
        } else {
            req.flash('error', 'Class doesn\'t exist.')
            return res.redirect('/');
        }
    } catch (error: any) {
        console.log(error);
    }
}

export const inviteLink = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const classData = await Class.findByPk(Number(id));

        if (classData) {
            const code = classData?.getDataValue('code');
            const inviteLinkURL = `${getFullBaseURL(req)}/classes/${id}/invite?code=${code}`;
            return res.status(200).json({ inviteLinkURL, code });
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
        const classData = await Class.findByPk(Number(id), { include: User });
        const { id: userId } = <IUser>req.user;

        if (classData) {
            if (classData.getDataValue('User').id == userId) {
                req.flash('error', 'You can\'t invite to this class.');
            } else { // if user not invited yet
                if (classData?.getDataValue('code') == code) {
                    // check if user has invited
                    const student = await Student.findOne({ where: { UserId: userId, ClassId: id } });
                    if (student) {
                        req.flash('error', 'You have invited!');
                    } else {
                        await Student.create({ UserId: userId, ClassId: classData.getDataValue('id') });
                        req.flash('success', 'You have successfully invited!');
                        // fixed
                        // return res.redirect(`/classes/${classData.getDataValue('id')}`);
                    }
                } else {
                    req.flash('error', 'Failed to invite.');
                }
            }
        } else {
            req.flash('error', 'Class does not exist.');
        }
        return res.redirect('/');
    } catch (error: any) {
        console.log(error);
    }
}

export const students = async (req: Request, res: Response): Promise<any> => {
    try {
        if (process.env.NODE_ENV == "development" || req.headers["content-type"] == 'application/json') {
            const { id } = req.params; // class id
            const students = await Student.findAll({ where: { ClassId: id }, order: [['createdAt', 'DESC']], include: User });
            return res.status(200).json({ students });
        }
        return res.redirect('/');
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

export const updateClassCode = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const classData = await Class.findByPk(Number(id), { include: User });
        const { id: userId } = <IUser>req.user;
        const code = await getAvailableCode();

        if (classData) {
            // if user try to update class code  belongs to someone else
            if (classData.getDataValue('User').id == userId) {
                classData.update({
                    code
                });
                return res.status(200).json({ message: 'The code of this class successfully updated.' })
            } else {
                return res.status(403).json({ message: 'You don\'t have any permission to update the class code of this class.' })
            }
        } else {
            return res.status(404).json({ message: 'Class does not exist.' })
        }
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

export const deleteClass = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const classData = await Class.findByPk(Number(id), { include: User });
        const { id: userId } = <IUser>req.user;

        if (classData) {
            // if user try to delete class belongs to someone else
            if (classData.getDataValue('User').id == userId) {
                await classData.destroy();
                req.flash('success', 'The class successfully deleted.');
            } else {
                req.flash('error', 'You don\'t have any permission to delete this class.');
            }
        } else {
            req.flash('error', 'Class does not exist.');
        }
        return res.redirect(`/`);
    } catch (error: any) {
        console.log(error);
    }
}

export const works = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        if (process.env.NODE_ENV == "development" || req.headers["content-type"] == 'application/json') { // prevent if opened from browser (for production)
            const { id: userId } = <IUser>req.user;
            const classData = await Class.findByPk(id, { order: [[Work, 'createdAt', 'DESC']], include: [Work, User] });
            return res.status(200).json({ classData });
        }
        return res.redirect('/');
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

export const work = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id, workId } = req.params;
        const { id: userId } = <IUser>req.user;
        const work = await Work.findByPk(workId);
        const classData = await Class.findByPk(id, { include: User });
        // const isStudentOfThisClass = await Student.findOne({ where: { ClassId: Number(classData?.getDataValue('id')), UserId: userId } });

        if (classData) {
            if (work) {
                // if (isStudentOfThisClass) {
                return renderWithUserDataAndFlash({ req, res, title: WORK_DETAIL_TITLE, path: 'works/work', data: { work, classId: id, classData } });
                // } else {
                //     req.flash('error', 'You don\'t have any permission to see this work.');
                // }
            } else {
                req.flash('error', 'The work of this class does not exist.');
            }
        } else {
            req.flash('error', 'The class does not exist.');
        }
        return res.redirect('/');
    } catch (error: any) {
        console.log(error);
    }
}

export const createWork = async (req: Request, res: Response): Promise<any> => {
    return renderWithUserDataAndFlash({
        req, res,
        title: CREATE_WORK_TITLE,
        path: 'works/create'
    });
}

export const createWorkPost = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const classData = await Class.findByPk(id, { include: User });
        const { id: userId } = <IUser>req.user;
        const { name, description }: IWork = req.body;

        if (classData) {
            // validate request
            const errors = await validateWork({ name, description });

            // if validate success
            if (errors === true) {
                if (classData.getDataValue('User').id == userId) {
                    await Work.create({ name, description, ClassId: id, UserId: userId });
                    req.flash('success', 'Work has successfully created!');
                    return res.redirect(`/classes/${id}`);
                } else {
                    req.flash('error', 'You don\'t have any permission to create work of this class.');
                }
            } else { // if validate fail/error
                return renderWithUserDataAndFlash({
                    req, res,
                    title: CREATE_WORK_TITLE,
                    path: 'works/create',
                    data: {
                        errors
                    }
                });
            }
        } else {
            req.flash('error', 'The class does not exist.');
            return res.redirect(`/`);
        }
    } catch (error) {
        console.log(error);
    }
}