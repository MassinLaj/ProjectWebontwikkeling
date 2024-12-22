"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authController_1 = require("../controllers/authController");
var router = express_1.default.Router();
router.get('/login', function (req, res) { return res.render('login'); });
router.post('/login', authController_1.login);
router.get('/register', function (req, res) { return res.render('register'); });
router.post('/register', authController_1.register);
router.get('/logout', authController_1.logout);
exports.default = router;
