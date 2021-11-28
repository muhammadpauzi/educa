import { NextFunction, Request, Response } from "express";

export const ensureAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/sign-in');
    }
}

export const ensureGuest = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        next();
    }
}