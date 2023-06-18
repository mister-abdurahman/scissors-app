"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_model_1 = __importDefault(require("../models/user.model"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = (0, express_1.default)();
const userRouter = express_1.default.Router();
app.use((0, cookie_parser_1.default)());
require("dotenv").config();
// jwt is in secs and cookie is in millisecs
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.SECRET_KEY, { expiresIn: maxAge });
};
userRouter.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!email || !password || !firstName || !lastName) {
            console.log(firstName, lastName, email, password);
            throw new Error("Ensure you fill all the inputs correctly");
        }
        // const user = await userModel.create({firstName, lastName, email, password:hashedPassword})
        const newUser = new user_model_1.default({ firstName, lastName, email, password });
        await newUser.save();
        const token = createToken(newUser._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ newUser: newUser._id });
    }
    catch (error) {
        console.log(error);
        res.status(422).json({ error });
    }
});
userRouter.post('/login', async function (req, res) {
    const { email, password } = req.body;
    try {
        //   const retrievedUser:RetrievedUserDetail  = await userModel.findOne({email})
        //   if(!retrievedUser) throw Error('Incorrect Email')
        //   const isMatch = await retrievedUser.comparePassword(password)
        //   console.log(isMatch)
        //   res.status(200).json({id: retrievedUser._id})
        const user = await user_model_1.default.login(email, password);
        res.status(200).json({ user: user._id });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
});
userRouter.get('/set-cookie', async (req, res) => {
    res.cookie('newUser', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
    res.cookie('isWorking', false, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
    res.send('you got the cookies');
});
userRouter.get('/read-cookie', (req, res) => {
    res.json({ cookies: req.headers.cookie });
});
exports.default = userRouter;
// I can now signup and login, next up is cookie and jwt auth.
//netninja: https://www.youtube.com/watch?v=SnoAwLP1a-0&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp
// JWT signing:
// Headers: tells the server what type of signature is being used (meta)
// Payload: used to identify the user (contains user id)
// Makes the token secure (like a stamp of authnticity)
//# sourceMappingURL=user.route.js.map