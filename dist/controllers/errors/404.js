"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error404 = void 0;
const error404 = (_req, res, _next) => {
    res.status(403).json({ message: "Invalid request" });
};
exports.error404 = error404;
