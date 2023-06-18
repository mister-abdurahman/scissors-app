"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const url_model_1 = __importDefault(require("../models/url.model"));
const urlRouter = express_1.default.Router();
urlRouter.get('/', async (req, res) => {
    const allURLS = await url_model_1.default.find();
    return res.status(200).json({ allURLS });
});
urlRouter.post('/', async (req, res) => {
    //    await urlModel.create({initial_url: req.body.initial_url ,shortened_url: req.body.shortened_url, clicks: req.body.clicks})
    const url = await url_model_1.default.create(req.body);
    //   res.redirect('/')
    return res.status(200).json({ url });
});
// route to the url when clicked:
urlRouter.get('/:shortUrl', async (req, res) => {
    const shortUrl = await url_model_1.default.findOne({ shortened_url: req.params.shortUrl });
    if (shortUrl == null)
        return res.sendStatus(404);
    shortUrl.clicks++;
    shortUrl.save();
    return res.status(200).json({ shortUrl });
    //    res.redirect(shortUrl.initial_url)
});
exports.default = urlRouter;
//# sourceMappingURL=url.route.js.map