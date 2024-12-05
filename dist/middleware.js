"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware = (config) => {
    return (req, res, next) => {
        // ミドルウェアのロジック
        next();
    };
};
exports.default = middleware;
