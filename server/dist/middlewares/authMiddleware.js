"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET_KEY = process.env.SECRET_KEY;
const requireAuth = (req, res, next) => {
    // console.log("jwt value is:", jwt)
    // console.log("req.cookies.jwt value is:", req.cookies?.jwt)
    if (req.cookies?.jwt) {
        jsonwebtoken_1.default.verify(req.cookies.jwt, SECRET_KEY, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/');
            }
            else {
                console.log(decodedToken);
                next();
            }
        });
    }
    else {
        res.redirect('/');
    }
};
exports.requireAuth = requireAuth;
//# sourceMappingURL=authMiddleware.js.map