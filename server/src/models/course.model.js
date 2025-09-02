import mongoose, { Schema } from "mongoose";

const CourseSchema = new Schema({},{timestamps:true});

export const Course = mongoose.model("Course", CourseSchema);