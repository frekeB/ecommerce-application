import express, { Express, Request, Response, NextFunction } from 'express';
import { getProducts, getProductsById, addProduct, updateProductDetails, deleteProductDetails, getRegisterPage, getLoginPage, getUpdatePage, getUpdatePageById, getAddProductPage, getProductToDelete, logout, registerUser, loginUser} from '../controllers/controller';
import {isLoggedIn} from '../middleware/authMiddleWare'
// const app = require('../app');
// import app from '../app';

const router = express.Router();

/* GET users listing. */
router.get('/', isLoggedIn, getProducts)
router.get('/register', getRegisterPage)
router.get('/login', getLoginPage)
router.get('/products/delete/:id', isLoggedIn, getProductToDelete)
router.get('/update/', isLoggedIn, getUpdatePage)
router.get('/update/:id', isLoggedIn, getUpdatePageById)
router.get('/logout', logout)
router.get('/add', isLoggedIn, getAddProductPage)

router.post('/add', isLoggedIn, addProduct);
router.put('/update/', isLoggedIn, updateProductDetails);
router.post('/register', registerUser)

router.get('/:id', isLoggedIn, getProductsById);
router.delete('/delete/:id', isLoggedIn,deleteProductDetails);

router.post('/login', loginUser)

export default router;
