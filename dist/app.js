"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || 'geheim',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
}));
exports.default = app;
