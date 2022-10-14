"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, _req, res, _next) => {
    res.status(err.statusCode || 500).json({ message: err.message });
};
exports.errorHandler = errorHandler;
