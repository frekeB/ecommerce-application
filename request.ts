import { Request } from "express"
export interface IGetUserAuthInfoRequest extends Request {
  user?: Iuser 
  // or any other type
}