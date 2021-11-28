import { Response } from "express";
import IRender from "../interfaces/render.interface";

export const renderWithTitle = (res: Response, { title, path, data = {} }: IRender) => {
    data.title = title;
    return res.render(path, data);
}