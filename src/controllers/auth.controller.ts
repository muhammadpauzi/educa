import { Request, Response } from 'express';
import { SIGN_IN_TITLE } from '../contants/title.contant';
import { renderWithUserDataAndFlash } from '../helpers/render.helper';

export const signIn = async (req: Request, res: Response): Promise<any> => {
    return renderWithUserDataAndFlash({
        req, res,
        title: SIGN_IN_TITLE,
        path: 'auth/sign-in'
    });
}

export const signOut = (req: Request, res: Response): any => {
    req.logout();
    req.flash('success', 'You have successfully signed out!')
    return res.redirect('/sign-in');
}