import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../middlewares/error.js";
import { UserModel } from "../models/UserModel.js";
import { sendtoken } from "../utils/jwttoken.js";


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
   sendtoken(user, 200, res, "User Registered Successfully");
});

export const login = catchAsyncError(async(req, res, next) => {
    const {email, password, role} = req.body;
    if (!email || !password || !role) {
        return next(new ErrorHandler("Please provide email, password and role", 400))
    }
    const user = await UserModel.findOne({email}).select("+password");
    if(!user)
    {
        new ErrorHandler("Invalid Email or Password", 400);
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched)
    {
        new ErrorHandler("Invalid Email or Password", 400);
    }
    if (user.role !== role) {
        new ErrorHandler("User with this role not found.", 400);
    }
    sendtoken(user, 200, res, "User logged in Successfully !")
})