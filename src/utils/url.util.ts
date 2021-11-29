import { Request } from 'express';

export const getFullBaseURL = (req: Request) => {
    return req.protocol + '://' + req.get('host');
}