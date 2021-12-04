import { Request, Response } from "express";
import { Class, Student } from "../models";

export const index = async (req: Request, res: Response): Promise<any> => {
    try {
        if (process.env.NODE_ENV == "development" || req.headers["content-type"] == 'application/json') {
            const classData = await Class.findAll({ order: [[Student, 'createdAt', 'DESC']], include: Student });
            return res.status(200).json({ classData });
        }
        return res.redirect('/');
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}