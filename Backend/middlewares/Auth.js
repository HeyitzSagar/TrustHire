import { catchAsyncError } from "./catchAsyncError";
import { UserModel } from "../models/UserModel.js";
import ErrorHandler from './error.js';


export const isAuthorised = catchAsyncError(async(req, res, next) => {
    const {token} = req.cookies;
    if (!token) {
        return next(new ErrorHandler("User is not authorized"), 400);
    } 
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await UserModel.findById(decode.id);
    next();
});