"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var gebruikersController_1 = require("../controllers/gebruikersController");
var router = express_1.default.Router();
router.get('/', gebruikersController_1.haalAlleGebruikersOp);
exports.default = router;
