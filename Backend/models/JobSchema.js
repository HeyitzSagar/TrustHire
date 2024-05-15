import mongoose from "mongoose";
import { type } from "os";
import { title } from "process";

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Provide Job title"],
    minLength: [3, "Job title must contains atleast three characters"],
    maxLength: [50, "Should not be greater than 50 character"],
  },
  description: {
    type: String,
    required: [true, "Please provide the job description"],
    minLength: [3, "Description cannot be less than three char"],
    maxLength: [350, "Description cannot be greater than 350 char"],
  },
  category: {
    type: String,
    required: [true, "Job category is required"],
  },
  country: {
    type: String,
    required: [true, "Country  is required"],
  },
  city: {
    type: String,
    required: [true, " city is required"],
  },
  location: {
    type: String,
    required: [true, "Exact location is required"],
    minLength: [50, "Job location must contain atleast 50 character"],
  },
  fixedSalary: {
    type: Number,
    minLength: [4, "fixed salary must contains 4 digit"],
    maxLength: [9, "Cannot be greater than nine digits"],
  },
  SalaryFrom: {
    type: Number,
    minLength: [4, " Salary from must contains 4 digit"],
    maxLength: [9, "Salary from Cannot be greater than nine digits"],
  },
  SalaryTo: {
    type: Number,
    minLength: [4, " Salary from must contains 4 digit"],
    maxLength: [9, "Salary from Cannot be greater than 9 digits"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  jobPostedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Job = mongoose.model("Job", JobSchema);
