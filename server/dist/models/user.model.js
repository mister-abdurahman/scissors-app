"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
const userSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: [true, "Enter your Email"], unique: true },
    password: {
        type: String,
        minLength: 4,
        required: [
            true,
            "Your password should contain lower and upper letter case, a number, a character and be at least 5 length long",
        ],
    },
    urlId: { type: Array, default: [] },
}, { timestamps: true });
// function is fired before doc is saved to db
userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const salt = await bcrypt_1.default.genSalt(saltRounds);
        const hash = await bcrypt_1.default.hash(this.password, salt);
        this.password = hash;
        next();
    }
    catch (error) {
        return next(error);
    }
});
// userSchema.methods.comparePassword = async function (password: string) {
//   try {
//     const match = await bcrypt.compare(password, this.password);
//     if(!match) throw Error('Incorrect Password')
//     return match;
//   } catch (error) {
//     throw new Error('Error comparing passwords');
//   }
// };
// static method to login user
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt_1.default.compare(password, user.password);
        if (auth)
            return user;
        throw Error('Incorrect Password');
    }
    throw Error("Incorrect Email");
};
exports.default = (0, mongoose_1.model)('user', userSchema);
//# sourceMappingURL=user.model.js.map