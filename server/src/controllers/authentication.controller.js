import { ApiResponse } from "../utils/apiResponse.utils.js";
import { College } from "../models/college.model.js";
import { Faculty } from "../models/faculty.model.js";
import { Student } from "../models/student.model.js";
import { is_valid_email } from "../utils/email_validator.utils.js";
import { create_token } from "../utils/jsonwebtoken.utils.js";
import bcrypt from "bcrypt";

//############################# COLLEGE  REGISTRATION ####################################
export const super_admin_register = async (req, res) => {
  try {
    // data destructering
    const { code, name, phonenumber, email, password, university } = req?.body || {};
    if (!code || !name || !phonenumber || !email || !password || !university) {
      return ApiResponse.error(res, "all fields are  required", 400);
    }

    if (!is_valid_email(email)) {
      return ApiResponse.error(res, "email invalid !", 400);
    }

    // checking is college already exit if its  exits then please  return an error otherwise retrun registration acknowledgement
    const is_already_registered = await College.findOne({
      $and: [{ name }, { code }, { university }],
    });

    if (is_already_registered) {
      return ApiResponse.error(res, "college already registerd !", 409);
    } else {
      const register_acknowledgement = await College.create({
        code,
        name,
        phonenumber,
        email,
        password,
        university,
      });

      const { password: _, ...data } = register_acknowledgement.toObject();

      return ApiResponse.success(res, data, "registered succesfully", 200);
    }
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

// ########################### COLLEGE LOGIN #################################

export const super_admin_login = async (req, res) => {
  try {
    const { phonenumber, password } = req?.body || {};
    if (!phonenumber || !password) {
      return ApiResponse.error(res, "all fields are  required", 400);
    }

    const user = await College.findOne({ phonenumber }).lean();
    const password_verified = await bcrypt.compare(password, user.password);

    if (!user || !password_verified) {
      return ApiResponse.error(res, "user or password invalid", 400);
    }

    const token = create_token({ _id: user._id, user: user, role: user.role });

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 1000 * 56,
      sameSite: "strict",
    });

    return ApiResponse.success(res, user, "logged in successfully", 200);
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};
//#############################   ADMIN REGISTRATION  ############################
export const admin_registration = async (req, res) => {
  try {
    const { employeeId, password } = req?.body || {};

    if (!employeeId || !password) {
      return ApiResponse.error(res, "All fields are required", 400);
    }

    const existingUser = await Faculty.findOne({ employeeId });
    if (existingUser) {
      return ApiResponse.error(res, "User already exists", 409);
    }

    const user_acknowledgement = await Faculty.create({
      employeeId,
      password,
    });

    const { password: _, ...data } = user_acknowledgement.toObject();

    return ApiResponse.success(res, data, "Registered successfully", 201);
  } catch (error) {
    console.error("Admin registration error:", error);
    return ApiResponse.error(res, "Internal Server Error", 500);
  }
};

//#############################   ADMIN LOGIN ############################
export const admin_login = async (req, res) => {
  try {
    const { employeeId, password } = req?.body || {};

    if (!employeeId || !password) {
      return ApiResponse.error(res, "Invalid user or password", 400);
    }

    const user = await Faculty.findOne({ employeeId }).lean();
    if (!user) {
      return ApiResponse.error(res, "Invalid user or password", 400);
    }

    const password_verified = await bcrypt.compare(password, user.password);
    if (!password_verified) {
      return ApiResponse.error(res, "Invalid user or password", 400);
    }

    const { password: _, ...data } = user;

    const token = create_token({ _id: user._id, user: data, role: user.role });

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 1000 * 56,
      sameSite: "strict",
    });

    return ApiResponse.success(res, { user: data }, "Login successful", 200);
  } catch (error) {
    console.error("Admin login error:", error.message);
    return ApiResponse.error(res, "Server error", 500);
  }
};

// ############################# STUDENT LOGIN ############################
export const student_login = async (req, res) => {
  try {
    const { admissionNumber, password } = req?.body || {};
    if (!admissionNumber || !password) {
      return ApiResponse.error(res, "all credentials are  required", 400);
    }

    const user = await Student.findOne({ admissionNumber }).lean();
    if (!user) {
      return ApiResponse.error(res, "invalid user or password", 400);
    }

    const password_verified = await bcrypt.compare(this.password, user.password);
    if (!password_verified) {
      return ApiResponse.error(res, "invalid user or password", 400);
    }

    const { password: _, ...data } = user;

    const token = create_token({ _id: user._id, user: data, role: user.role });

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 1000 * 56,
      sameSite: "strict",
    });

    return ApiResponse.success(res, data, "logged in succesfully", 200);
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};
