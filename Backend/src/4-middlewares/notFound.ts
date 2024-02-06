import { Request, Response, NextFunction } from "express";
import { RouteNotFound } from "../3-models/error-models";
import path from "path";

export function routeNotFound(req: Request, res: Response, next: NextFunction): void {
    const err = new RouteNotFound(req.originalUrl)
    next(err);
}
export function pageNotFound(req: Request, res: Response, next: NextFunction): void {
    res.sendFile(path.join(__dirname, "..", "7-frontend", "index.html"));
}