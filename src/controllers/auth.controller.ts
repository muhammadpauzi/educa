import { Request, Response } from 'express';
import { SIGN_IN_TITLE } from '../contants/title.contant';
import { renderWithTitle } from '../helpers/render.helper';

export const signIn = async (req: Request, res: Response): Promise<any> => {
    return renderWithTitle(res, {
        title: SIGN_IN_TITLE,
        path: 'auth/sign-in'
    });
}