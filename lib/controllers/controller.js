"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.logout = exports.loginUser = exports.registerUser = exports.getLoginPage = exports.getRegisterPage = exports.getProductToDelete = exports.getUpdatePageById = exports.getUpdatePage = exports.getAddProductPage = exports.deleteProductDetails = exports.updateProductDetails = exports.addProduct = exports.getProductsById = exports.getProducts = void 0;
const util_1 = require("../utils/util");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const models_1 = require("../models/models");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const inputValidator_1 = require("../models/inputValidator");
const dotenv_1 = __importDefault(require("dotenv"));
const dotENV = dotenv_1.default.config();
// import { Request } from "../request";
exports.getProducts = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.cookies.token;
        // const user = req.user?.fullname;
        let user;
        if (token) {
            user = req.cookies.user;
        }
        const data = yield (0, models_1.findAllData)();
        res.status(200).render('showProducts', { title: 'Products', data, token, user: user.fullname });
    });
});
exports.getProductsById = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        // const user = req.user;
        const data = yield (0, models_1.findById)(id);
        const token = req.cookies.token;
        let user;
        if (token) {
            user = req.cookies.user;
        }
        res.status(200).render('getById', { title: "Product", data, user: user.fullname, token });
    });
});
exports.addProduct = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const productDetails = req.body;
        const data = yield (0, models_1.createData)(productDetails);
        const allData = yield (0, models_1.findAllData)();
        const token = req.cookies.token;
        // const user = req.user?.fullname
        let user;
        if (token) {
            user = req.cookies.user;
        }
        res.status(200).render('showProducts', { title: 'Products', data: allData, token, user: user.fullname, });
    });
});
exports.updateProductDetails = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.body) {
            res.status(400);
            throw new Error('No new data given');
        }
        const productDetails = req.body;
        const token = req.cookies.token;
        const data = yield (0, models_1.updateData)(productDetails);
        res.status(200).redirect('/users');
    });
});
exports.deleteProductDetails = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        const data = yield (0, models_1.deleteData)(id);
        if (data === -1) {
            res.status(404);
            throw new Error('No product which such id exists');
        }
        const token = req.cookies.token;
        // const user = req.user?.fullname
        let user;
        if (token) {
            user = req.cookies.user;
        }
        res.status(200).render('showProducts', { title: 'Products', data, token, user: user.fullname, });
    });
});
exports.getAddProductPage = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).render('login');
        }
        // console.log(req.user)
        // const user = req.user?.fullname
        let user;
        if (token) {
            user = req.cookies.user;
        }
        res.status(201).render('addProduct', { title: 'Add Product', token: token, user: user.fullname, });
    });
});
exports.getUpdatePage = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).render('login');
        }
        let user;
        if (token) {
            user = req.cookies.user;
        }
        // const user = req.user
        res.status(201).render('update', { title: 'Update', token: token, user: user.fullname });
    });
});
exports.getUpdatePageById = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.path.split('/')[2];
        const token = req.cookies.token;
        if (!token) {
            res.status(401).render('login');
        }
        // const user = req.user?.fullname
        let user;
        if (token) {
            user = req.cookies.user;
        }
        res.status(201).render('updateById', { title: 'Update', token: token, id: id, user: user.fullname, });
    });
});
exports.getProductToDelete = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const reqPath = req.path;
        // const user = req.user;
        const customerId = reqPath.split('/')[3];
        const token = req.cookies.token;
        let user;
        if (token) {
            user = req.cookies.user;
        }
        res.status(201).render('deleteProduct', { title: 'Delete Product Records', token, id: customerId, user: user.fullname });
    });
});
/*******************************************Authentication and Authorization************************************/
exports.getRegisterPage = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.cookies.token;
        // const user = req.user?.fullname
        let user;
        console.log(`Bug: ${token}`);
        if (token) {
            user = req.cookies.user;
        }
        // , token, user: user.fullname
        res.render('register', { title: "Register" });
    });
});
exports.getLoginPage = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.cookies.token;
        let user;
        if (token) {
            user = req.cookies.user;
        }
        // const user = req.user?.fullname
        // , token, user: user.fullname
        res.render('login', { title: "Login" });
    });
});
exports.registerUser = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, password, confirmPassword, gender, phone, address } = req.body;
        const valid = yield (0, inputValidator_1.validateUser)(name, email, password, confirmPassword, gender, phone, address);
        if (valid) {
            if (!name || !email || !password) {
                res.status(400);
                // err.status()
                throw new Error('Please add all fields');
            }
            // Check if User email exists
            const allData = (0, util_1.fetchUsersData)();
            const userExists = allData.find((data) => data.email === email);
            if (userExists) {
                res.status(400);
                throw new Error('A user already exists with same email');
            }
            // Hash Password
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
            // Create id
            const userId = (0, uuid_1.v4)();
            const newUser = yield (0, models_1.createNewUser)(userId, name, email, hashedPassword, gender, phone, address);
            const userData = yield (0, util_1.fetchUsersData)();
            if (!newUser) {
                res.status(400);
                throw new Error('Invalid user data');
            }
            // const user = req.user
            const token = (0, exports.generateToken)(newUser.id);
            console.log(token);
            res.cookie('token', token);
            let user;
            if (token) {
                user = newUser;
                res.cookie('user', user);
            }
            console.log(newUser);
            // Store cookies
            res.status(201).redirect('/users');
            // res.status(201).render('showProducts', {token, user: user});
            (0, util_1.writeUsersData)(newUser, userData);
        }
    });
});
exports.loginUser = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password, repeat_password } = req.body;
        const valid = yield (0, inputValidator_1.validateUserLoginDetails)(email, password, repeat_password);
        if (valid) {
            const allData = yield (0, util_1.fetchUsersData)();
            const user = allData.find((user) => user.email === email);
            if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
                //Store cookies 
                const token = yield (0, exports.generateToken)(user.id);
                console.log(user);
                res.cookie('token', token);
                if (token) {
                    res.cookie('user', user);
                }
                // res.cookie('user', user)
                res.status(200).redirect('/users');
                console.log(token);
                // res.status(201).render('showCustomers', {token, user: user});
            }
            else {
                res.status(400);
                throw new Error('Invalid password or email');
            }
        }
    });
});
exports.logout = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.cookie('token', '');
        req.cookies.token = '';
        res.cookie('user', '');
        req.cookies.user = '';
        // res.cookie(req.cookies.token, '') 
        res.status(200).redirect('/');
    });
});
// Generate Token
const generateToken = function (id) {
    if (process.env.JWT_SECRET) {
        return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });
    }
};
exports.generateToken = generateToken;
//# sourceMappingURL=controller.js.map