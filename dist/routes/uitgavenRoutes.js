"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const uitgavenController_1 = require("../controllers/uitgavenController");
const router = express_1.default.Router();
// Formulier om een nieuwe uitgave toe te voegen
router.get('/toevoegen', authMiddleware_1.isAuthenticated, (req, res) => {
    res.render('voeg-uitgave-toe'); // Render het formulier
});
// Route om een uitgave toe te voegen
router.post('/toevoegen', authMiddleware_1.isAuthenticated, uitgavenController_1.voegUitgaveToe);
// Route om alle uitgaven op te halen
router.get('/', authMiddleware_1.isAuthenticated, uitgavenController_1.haalUitgavenOp);
// Route om een specifieke uitgave op te halen voor bewerken
router.get('/bewerken/:id', authMiddleware_1.isAuthenticated, uitgavenController_1.haalUitgaveOp);
// Route om een uitgave bij te werken
router.post('/bewerken/:id', authMiddleware_1.isAuthenticated, uitgavenController_1.updateUitgave);
// Route om een uitgave te verwijderen
router.get('/verwijderen/:id', authMiddleware_1.isAuthenticated, uitgavenController_1.verwijderUitgave);
exports.default = router;
