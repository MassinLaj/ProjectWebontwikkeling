"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verwijderUitgave = exports.bewerkUitgave = exports.haalUitgaveOp = exports.voegUitgaveToe = void 0;
var express_1 = __importDefault(require("express"));
var uitgavenController_1 = require("../controllers/uitgavenController");
Object.defineProperty(exports, "voegUitgaveToe", { enumerable: true, get: function () { return uitgavenController_1.voegUitgaveToe; } });
Object.defineProperty(exports, "haalUitgaveOp", { enumerable: true, get: function () { return uitgavenController_1.haalUitgaveOp; } });
Object.defineProperty(exports, "bewerkUitgave", { enumerable: true, get: function () { return uitgavenController_1.bewerkUitgave; } });
Object.defineProperty(exports, "verwijderUitgave", { enumerable: true, get: function () { return uitgavenController_1.verwijderUitgave; } });
var router = express_1.default.Router();
router.post('/toevoegen', uitgavenController_1.voegUitgaveToe);
router.get('/bewerken/:id', uitgavenController_1.haalUitgaveOp);
router.post('/bewerken/:id', uitgavenController_1.bewerkUitgave);
router.get('/verwijderen/:id', uitgavenController_1.verwijderUitgave);
exports.default = router;
