"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoURI = process.env.MONGO_URI || '';
const PORT = process.env.PORT || 3000;
mongoose_1.default
    .connect(mongoURI)
    .then(() => {
    console.log('Succesvol verbonden met MongoDB Atlas');
    app_1.default.listen(PORT, () => console.log(`Server draait op http://localhost:${PORT}`));
})
    .catch((err) => {
    console.error('Fout bij het verbinden met MongoDB Atlas:', err);
    process.exit(1);
});
