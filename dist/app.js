"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
var body_parser_1 = __importDefault(require("body-parser"));
var gebruikersRoutes_1 = __importDefault(require("./routes/gebruikersRoutes"));
var uitgavenRoutes_1 = __importDefault(require("./routes/uitgavenRoutes"));
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(express_1.default.static('public'));
app.use('/', gebruikersRoutes_1.default);
app.use('/uitgaven', uitgavenRoutes_1.default);
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(function () { return console.log('Verbonden met MongoDB'); })
    .catch(function (err) { return console.error('Fout bij het verbinden met MongoDB:', err); });
exports.default = app;
