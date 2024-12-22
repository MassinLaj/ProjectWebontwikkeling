"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const uitgavenRoutes_1 = __importDefault(require("./routes/uitgavenRoutes"));
const authMiddleware_1 = require("./middleware/authMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// Debugging Middleware voor sessies
app.use((req, res, next) => {
    console.log('Sessie:', req.session);
    next();
});
// Set up sessions
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || 'geheim',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Gebruik true in productie met HTTPS
}));
// Set view engine to EJS
app.set('view engine', 'ejs');
app.use(express_1.default.static('public'));
// Routes
app.use('/auth', authRoutes_1.default);
app.use('/uitgaven', authMiddleware_1.isAuthenticated, uitgavenRoutes_1.default);
// Dashboard route voor ingelogde gebruikers
app.get('/dashboard', authMiddleware_1.isAuthenticated, (req, res) => {
    const gebruikerId = req.session.gebruikerId; // Forceer TypeScript om gebruikerId te accepteren
    res.render('dashboard', { gebruikerId });
});
// Root Route
app.get('/', (req, res) => {
    res.render('index'); // Render de index.ejs view
});
exports.default = app;
