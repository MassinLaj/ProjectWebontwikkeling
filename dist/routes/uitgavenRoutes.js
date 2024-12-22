"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uitgavenController_1 = require("../controllers/uitgavenController");
const router = express_1.default.Router();
router.post('/toevoegen', uitgavenController_1.voegUitgaveToe);
exports.default = router;
