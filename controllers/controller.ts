import {fetchData, writeData, fetchUsersData, writeUsersData} from '../utils/util';
import createError, {HttpError} from 'http-errors';
import {Request, Response, NextFunction} from 'express';
import asyncHandler from 'express-async-handler'
import { createData, findAllData, findById, updateData, deleteData, createNewUser } from '../models/models';
import bcrypt from 'bcryptjs';
import {v4 as uuidv4} from 'uuid'; 
import jwt from 'jsonwebtoken';
import { validateUser, validateUserLoginDetails } from '../models/inputValidator';
import dotenv from 'dotenv';
const dotENV = dotenv.config()
// import { Request } from "../request";


export const getProducts = asyncHandler(async function (req:Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;
    // const user = req.user?.fullname;
    let user;
    if(token){
      user = req.cookies.user
    }
    const data = await findAllData();
    res.status(200).render('showProducts', {title: 'Products', data, token, user: user.fullname});
  })


export const getProductsById = asyncHandler(async function(req:Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    // const user = req.user;
    const data = await findById(id);
    const token = req.cookies.token
    let user;
    if(token){
      user = req.cookies.user
    }
    res.status(200).render('getById', {title: "Product", data, user: user.fullname, token});
  })


export const addProduct = asyncHandler(async function(req:Request, res: Response, next: NextFunction) {
    const productDetails: InewProduct = req.body;
    const data = await createData(productDetails);
    const allData = await findAllData();
    const token = req.cookies.token
    // const user = req.user?.fullname
    let user;
    if(token){
      user = req.cookies.user
    }
    res.status(200).render('showProducts', {title: 'Products', data: allData, token, user: user.fullname,});
  })


export const updateProductDetails = asyncHandler(async function(req:Request, res: Response, next: NextFunction) {
    if(!req.body){
        res.status(400);
        throw new Error('No new data given');
    }
    const productDetails: IupdateProduct = req.body;
    const token = req.cookies.token
    const data = await updateData(productDetails);
    res.status(200).redirect('/users');
  })


 
export const deleteProductDetails = asyncHandler(async function(req:Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    const data = await deleteData(id);
    if (data === -1){
      res.status(404);
      throw new Error('No product which such id exists');
    }
    const token = req.cookies.token
    // const user = req.user?.fullname
    let user;
    if(token){
      user = req.cookies.user
    }
    res.status(200).render('showProducts', {title: 'Products', data, token, user: user.fullname,});
  })


  export const getAddProductPage = asyncHandler(async function(req:Request, res: Response, next: NextFunction){
    const token = req.cookies.token
    if(!token){
      res.status(401).render('login')
    }
    // console.log(req.user)
    // const user = req.user?.fullname
    let user;
    if(token){
      user = req.cookies.user
    }
    res.status(201).render('addProduct', {title: 'Add Product', token: token, user: user.fullname,});
  })

export const getUpdatePage = asyncHandler(async function(req:Request, res: Response, next: NextFunction){
  const token = req.cookies.token
  if(!token){
    res.status(401).render('login')
  }
  let user;
  if(token){
    user = req.cookies.user
  }
  // const user = req.user
  res.status(201).render('update', {title: 'Update', token: token, user: user.fullname});
})


export const getUpdatePageById = asyncHandler(async function(req:Request, res: Response, next: NextFunction){
  const id = req.path.split('/')[2]
  const token = req.cookies.token
  if(!token){
    res.status(401).render('login')
  }
  // const user = req.user?.fullname
  let user;
  if(token){
    user = req.cookies.user
  }
  res.status(201).render('updateById', {title: 'Update', token: token, id: id, user: user.fullname,});
})


export const getProductToDelete = asyncHandler(async function(req:Request, res: Response, next: NextFunction){
    const reqPath = req.path;
    // const user = req.user;
    const customerId = reqPath.split('/')[3];
    const token = req.cookies.token
    let user;
    if(token){
      user = req.cookies.user
    }
    res.status(201).render('deleteProduct', {title: 'Delete Product Records',token , id: customerId, user: user.fullname})
})

/*******************************************Authentication and Authorization************************************/

export const getRegisterPage = asyncHandler(async function(req:Request, res: Response, next: NextFunction){
  const token = req.cookies.token
  // const user = req.user?.fullname
  let user;
  console.log(`Bug: ${token}`)
  if(token){
    user = req.cookies.user
  }
  // , token, user: user.fullname
  res.render('register', {title: "Register"})
})


export const getLoginPage = asyncHandler(async function(req:Request, res: Response, next: NextFunction){
  const token = req.cookies.token
  let user;
  if(token){
    user = req.cookies.user
  }
  // const user = req.user?.fullname
  // , token, user: user.fullname
  res.render('login', {title: "Login"})
})




export const registerUser = asyncHandler(async function(req:Request, res: Response, next: NextFunction){
  const {name, email, password, confirmPassword, gender, phone, address} = req.body
  const valid = await validateUser(name, email, password, confirmPassword, gender, phone, address)
  if(valid){
    if(!name || !email || !password){
      res.status(400);
      // err.status()
      throw new Error('Please add all fields')
    }
    // Check if User email exists
    const allData = fetchUsersData();
    const userExists = allData.find((data)=> data.email === email)
    if(userExists){
      res.status(400);
      throw new Error('A user already exists with same email');
    }
    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create id
    const userId = uuidv4();
    const newUser = await createNewUser(userId, name, email, hashedPassword, gender, phone, address);
    const userData = await fetchUsersData();
    if(!newUser){ 
      res.status(400);
      throw new Error('Invalid user data');
    }
    // const user = req.user
    const token = generateToken(newUser.id);
    console.log(token)
    res.cookie('token', token);
    let user;
    if (token){
      user = newUser
      res.cookie('user', user)
    }
    console.log(newUser)
    // Store cookies
    res.status(201).redirect('/users')
    // res.status(201).render('showProducts', {token, user: user});
    writeUsersData(newUser, userData);

  }

   
})


export const loginUser = asyncHandler(async function(req: Request, res: Response, next: NextFunction){

  const {email, password, repeat_password} = req.body;
  const valid = await validateUserLoginDetails( email, password, repeat_password)
  if (valid){
    const allData = await fetchUsersData();
    const user = allData.find((user)=> user.email === email);
    if (user && (await bcrypt.compare(password, user.password))){
        //Store cookies 
        const token = await generateToken(user.id);
        console.log(user)
        res.cookie('token', token);
        if (token){
          res.cookie('user', user)
        }
        // res.cookie('user', user)
        res.status(200).redirect('/users');
        console.log(token)
        // res.status(201).render('showCustomers', {token, user: user});
    }else{
      res.status(400);
      throw new Error('Invalid password or email');
    }
  }


})  

export const logout = asyncHandler( async function(req: Request, res: Response, next: NextFunction){
    
      res.cookie('token', '')
      req.cookies.token = ''
      res.cookie('user', '')
      req.cookies.user = ''
      // res.cookie(req.cookies.token, '') 
      
      res.status(200).redirect('/');
   
})

// Generate Token
export const generateToken = function(id: string){
  if(process.env.JWT_SECRET ){
      return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
  }
    
}