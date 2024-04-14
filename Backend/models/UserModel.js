import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name must cotains at least 3 characters"],
    maxLength: [30, "Name should not cotains greater than 30 characters"],
  },
  email: {
    type: String,
    required: [true, "please Provide your email"],
    validate: [validator.isEmail, "Please provide a valid Email"],
  },
  phone: {
    type: Number,
    required: [true, "Please provide your Phone Number"],
  },
  password: {
    type: String,
    required: [true, "Please provide your Password"],
    minLength: [3, "length should be greater than 3"],
    maxLength: [8, "length should not be greater than 16"],
  },
  role: {
    type: String,
    required: [true, "Please provide your role"],
    enum: ["Job Seeker", "Employer"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});



// hashing the password

UserSchema.pre("save", async function(next)
{
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// comparing password 
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// jwt web token generations
UserSchema.methods.getJWTToken = function () {
    return jwt.sign
}