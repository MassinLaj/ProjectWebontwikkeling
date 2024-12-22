"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Dashboard voor ingelogde gebruikers
router.get('/dashboard', authMiddleware_1.isAuthenticated, (req, res) => {
    res.render('dashboard', { gebruikerId: req.session.gebruikerId });
});
exports.default = router;
