import { ApiResponse } from "../utils/apiResponse.utils.js";
import { College } from "../models/college.model.js";
import { is_valid_email } from "../utils/email_validator.utils.js";
import { create_token } from "../utils/jsonwebtoken.utils.js";
import bcrypt from "bcrypt";

//############################# REGISTRATION ####################################
export const College_register = async (req, res) => {
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
  } catch {
    return ApiResponse.error();
  }
};

// ########################### LOGIN #################################

export const college_login = async (req, res) => {
  try {
    const { phonenumber, password } = req?.body || {};
    if (!phonenumber || !password) {
      return ApiResponse.error(res, 400);
    }

    const user = await College.findOne({ phonenumber }).lean();
    const password_verified = await bcrypt.compare(password, user.password);

    if (!user || !password_verified) {
      return ApiResponse.error(res, "user or password invalid", 400);
    }

    const token = create_token({ _id: user._id, user: user, role: user.role });

    res.cookie("authToken", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000 * 56,
      sameSite: "strict",
    });

    return ApiResponse.success(res, user, "logged in successfully", 200);
  } catch {
    return ApiResponse.error(res);
  }
};
