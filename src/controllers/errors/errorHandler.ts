import {Request, Response, NextFunction} from "express";

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction): any => {
    res.status(err.statusCode || 500).json({message: err.message});
};