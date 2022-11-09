"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { findAllData } from './../models/models';
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    const token = req.cookies.token;
    console.log(token);
    const user = req.cookies.user;
    res.status(200).render('index', { title: 'Home', token, user: user === null || user === void 0 ? void 0 : user.fullname, });
});
exports.default = router;
//# sourceMappingURL=index.js.map