"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const MONGODB_URL = process.env.MONGODB_URL;
// connect to mongodb
function connectToMongoDB() {
    mongoose_1.default.connect(MONGODB_URL);
    mongoose_1.default.connection.on('connected', () => {
        console.log('Connected to MongoDB successfully');
    });
    mongoose_1.default.connection.on('error', (err) => {
        console.log('Error connecting to MongoDB', err);
    });
}
module.exports = { connectToMongoDB };
//# sourceMappingURL=db.js.map