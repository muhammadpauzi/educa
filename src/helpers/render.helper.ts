import { Response } from "express";
import IRender from "../interfaces/render.interface";

export const renderWithTitleAndUserData = ({ req, res, title, path, data = {} }: IRender) => {
    data.title = title;
    data.user = {
        ...req.user,
        isAuthenticated: req.isAuthenticated()
    };
    return res.render(path, data);
}