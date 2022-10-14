import {Request, Response, NextFunction} from "express";

export const error404 = (_req: Request, res: Response, _next: NextFunction): any => {
    res.status(403).json({message: "Invalid request"});
};