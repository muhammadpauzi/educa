import { Request, Response } from "express";

export default interface IRender {
    req: Request,
    res: Response,
    title: string,
    path: string,
    data?: any
}