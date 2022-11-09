import Joi, { object, ValidationError } from 'joi';

const usersSignUpSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
        
    email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'dev'] } })
            .required(),

    password: Joi.string()
        .min(8)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    repeat_password: Joi.any().valid(Joi.ref('password')).required(),

    gender: Joi.string().min(3).max(30),
    // .required(),
    
    phone: Joi.string().min(3).max(30),
    // .required(),
    
    address: Joi.string().min(3).max(30),
    // .required(),
    // access_token: Joi.string(),
})



const usersLoginSchema = Joi.object({
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'dev'] } })
    .required(),

    password: Joi.string()
        .min(8)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    repeat_password: Joi.ref('password'),

    access_token: Joi.string(),
   
})


export const validateUser = async function(name:string, email:string, password:string, confirmPassword: string, gender: string, phone: string, address: string){
    try {
        const value = await usersSignUpSchema
            .validateAsync({ name: name, email: email, password: password, repeat_password: confirmPassword, gender: gender, phone: phone, address: address});
        if(value){
            return value
        }
    } catch (error:unknown ) {
        if (error instanceof ValidationError){
            const {message} = error.details[0];
            console.log(message)
            throw new Error(message);
        }
           
    }
}


export const validateUserLoginDetails = async function(email:string, password:string, confirmPassword: string){
    try {
        const value = await usersLoginSchema
            .validateAsync({ email: email, password: password, repeat_password: confirmPassword});
        if(value){
            return value
        }
    } catch (error:unknown ) {
        if (error instanceof ValidationError){
            const {message} = error.details[0];
            console.log(message)
            throw new Error(message);
        }
           
    }
}

