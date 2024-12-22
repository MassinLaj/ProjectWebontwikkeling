"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const isAuthenticated = (req, res, next) => {
    const session = req.session;
    if (!session.gebruikerId) {
        res.redirect('/auth/login');
        return;
    }
    next();
};
exports.isAuthenticated = isAuthenticated;
