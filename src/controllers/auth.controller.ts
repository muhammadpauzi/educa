import { Request, Response } from 'express';

export const signIn = async (req: Request, res: Response): Promise<any> => {
    return res.render('auth/sign-in');
}

export const signUp = async (req: Request, res: Response): Promise<any> => {
    return res.render('auth/sign-up');
}