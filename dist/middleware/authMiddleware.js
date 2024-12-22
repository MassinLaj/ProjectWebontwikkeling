"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
var isAuthenticated = function (req, res, next) {
    if (!req.session.gebruikerId) {
        return res.redirect('/auth/login');
    }
    next();
};
exports.isAuthenticated = isAuthenticated;
