import { Request, Response } from 'express';
import { SIGN_IN_TITLE } from '../contants/title.contant';
import { renderWithTitleAndUserData } from '../helpers/render.helper';

export const signIn = async (req: Request, res: Response): Promise<any> => {
    return renderWithTitleAndUserData({
        req, res,
        title: SIGN_IN_TITLE,
        path: 'auth/sign-in'
    });
}