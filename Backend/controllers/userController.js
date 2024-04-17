import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../middlewares/error.js";
import { UserModel } from "../models/UserModel.js";

export const register = catchAsyncError(async(req, res, next) => {
   const {name, email, phone, role, password} = req.body;
    if (!name|| !email || !phone || !role || !password) {
        return next(new ErrorHandler("Please fill all the inputs"));
    }
    const isEmail = await UserModel.findOne({email});
    if (isEmail) {
        return next(new ErrorHandler("Email Already Exists !"));
    }
    const user = await UserModel.create({
        name, 
        email, 
        phone, 
        role, 
        password,
    });
    res.status(200).json({
        success: true,
        message: "User Registered",
        user,
    });
});