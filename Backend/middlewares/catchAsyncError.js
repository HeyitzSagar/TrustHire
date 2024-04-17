// import { login } from "../controllers/userController"

export const catchAsyncError = (something) => {
    return(req, res, next) => {
        Promise.resolve(something(req, res, next)).catch(next)
    }
}