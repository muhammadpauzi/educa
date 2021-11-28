import IRender from "../interfaces/render.interface";

export const renderWithUserDataAndFlash = ({ req, res, title, path, data = {} }: IRender) => {
    data.title = title;
    data.user = {
        ...req.user,
        isAuthenticated: req.isAuthenticated()
    };
    data.errorMessage = req.flash('error');
    data.successMessage = req.flash('success');
    return res.render(path, data);
}