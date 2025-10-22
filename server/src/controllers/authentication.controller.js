import { ApiResponse } from "../utils/apiResponse.utils.js";
import { SuperAdmin } from "../models/superAdmin.model.js";
import { Admin } from "../models/admin.model.js";
import { User } from "../models/user.model.js";
import { is_valid_email } from "../utils/email_validator.utils.js";
import { create_token, verify_token } from "../utils/jsonwebtoken.utils.js";
import bcrypt from "bcrypt";

//############################# SuperAdmin  REGISTRATION ####################################
export const super_admin_register = async (req, res) => {
  try {
    const { code, name, phoneNumber, email, password, university } = req?.body || {};

    if (!code || !name || !phoneNumber || !email || !password || !university) {
      return ApiResponse.error(res, "All fields are required", 400);
    }

    if (!is_valid_email(email)) {
      return ApiResponse.error(res, "Invalid email format!", 400);
    }

    // Convert to lowercase for match
    const normalizedData = {
      code: code.trim().toLowerCase(),
      name: name.trim().toLowerCase(),
      university: university.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      phoneNumber: phoneNumber.trim(),
    };

    //Check duplicates individually
    const [emailExists, phoneExists, nameUniversityExists] = await Promise.all([
      SuperAdmin.findOne({ email: normalizedData.email }),
      SuperAdmin.findOne({ phoneNumber: normalizedData.phoneNumber }),
      SuperAdmin.findOne({
        name: normalizedData.name,
        university: normalizedData.university,
      }),
    ]);

    if (emailExists) {
      return ApiResponse.error(res, "already registered!", 409);
    }
    if (phoneExists) {
      return ApiResponse.error(res, "already registered!", 409);
    }
    if (nameUniversityExists) {
      return ApiResponse.error(res, "already registered for this university!", 409);
    }

    //Registration allowed for same code if university is different
    const register_acknowledgement = await SuperAdmin.create({
      code: normalizedData.code,
      name: normalizedData.name,
      phoneNumber: normalizedData.phoneNumber,
      email: normalizedData.email,
      password,
      university: normalizedData.university,
    });

    // Exclude password before sending response
    const { password: _, ...data } = register_acknowledgement.toObject();

    return ApiResponse.success(res, data, "Registered successfully", 201);
  } catch (error) {
    return ApiResponse.error(res, error.message || "Something went wrong", 500);
  }
};

// ########################### SuperAdmin LOGIN #################################

export const super_admin_login = async (req, res) => {
  try {
    const { phoneNumber, password } = req?.body || {};
    if (!phoneNumber || !password) {
      return ApiResponse.error(res, "all fields must be non-empty", 400);
    }

    const user = await SuperAdmin.findOne({ phoneNumber }).lean();
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

    const existingUser = await Admin.findOne({ employeeId });
    if (existingUser) {
      return ApiResponse.error(res, "User already exists", 409);
    }

    const user_acknowledgement = await Admin.create({
      employee_id: employeeId,
      password,
    });

    const { password: _, ...data } = user_acknowledgement.toObject();

    return ApiResponse.success(res, data, "Registered successfully", 201);
  } catch (error) {
    console.error("Admin registration error:", error);
    return ApiResponse.error(res, "Internal Server Error", 500);
  }
};
//#############################   MANY ADMIN REGISTRATION  ############################
export const many_admin_registration = async (req, res) => {
  try {
    const { faculties } = req?.body || {};

    if (!faculties || !Array.isArray(faculties) || faculties.length === 0) {
      return ApiResponse.error(res, "Admin data must be a non-empty array", 400);
    }

    const duplicateIds = faculties
      .map((f) => f.employeeId)
      .filter((id, i, arr) => arr.indexOf(id) !== i);

    if (duplicateIds.length > 0) {
      return ApiResponse.error(
        res,
        `Duplicate employeeIds in request: ${duplicateIds.join(", ")}`,
        400
      );
    }

    const existing = await Admin.find({
      employeeId: { $in: faculties.map((f) => f.employeeId) },
    }).lean();

    if (existing.length > 0) {
      const existingIds = existing.map((u) => u.employeeId);
      return ApiResponse.error(
        res,
        `These employeeIds already exist: ${existingIds.join(", ")}`,
        409
      );
    }

    const inserted = await Admin.insertMany(faculties);

    const responseData = inserted.map(({ password, ...rest }) => rest);

    return ApiResponse.success(res, responseData, "All Admin registered successfully", 201);
  } catch (error) {
    console.error("Bulk admin registration error:", error);
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

    const user = await Admin.findOne({ employeeId }).lean();
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
//#############################   User REGISTRATION  ############################
export const User_registration = async (req, res) => {
  try {
    const { admissionNumber, password } = req?.body || {};

    if (!admissionNumber || !password) {
      return ApiResponse.error(res, "All fields are required", 400);
    }

    const existingUser = await Admin.findOne({ admissionNumber });
    if (existingUser) {
      return ApiResponse.error(res, "User already exists", 409);
    }

    const user_acknowledgement = await User.create({
      admission_number: admissionNumber,
      password,
    });

    const { password: _, ...data } = user_acknowledgement.toObject();

    return ApiResponse.success(res, data, "Registered successfully", 201);
  } catch (error) {
    console.error("User registration error:", error);
    return ApiResponse.error(res, "Internal Server Error", 500);
  }
};

//######################## MANY User REGISTER ##################################
export const many_User_registration = async (req, res) => {
  try {
    const { Users } = req?.body || {};

    if (!Users || !Array.isArray(Users) || Users.length === 0) {
      return ApiResponse.error(res, "Admin data must be a non-empty array", 400);
    }

    const duplicateIds = Users.map((f) => f.admission_number).filter(
      (id, i, arr) => arr.indexOf(id) !== i
    );

    if (duplicateIds.length > 0) {
      return ApiResponse.error(
        res,
        `Duplicate employeeIds in request: ${duplicateIds.join(", ")}`,
        400
      );
    }
    const existing = await User.find({
      employeeId: { $in: Users.map((f) => f.admission_number) },
    }).lean();

    if (existing.length > 0) {
      const existingIds = existing.map((u) => u.admission_number);
      return ApiResponse.error(
        res,
        `These admission number already exist: ${existingIds.join(", ")}`,
        409
      );
    }

    const inserted = await User.insertMany(Users);

    const responseData = inserted.map(({ password, ...rest }) => rest);

    return ApiResponse.success(res, responseData, "All User registered successfully", 201);
  } catch (error) {
    console.error("Bulk User registration error:", error);
    return ApiResponse.error(res, "Internal Server Error", 500);
  }
};

// ############################# User LOGIN ############################
export const User_login = async (req, res) => {
  try {
    const { admissionNumber, password } = req?.body || {};
    if (!admissionNumber || !password) {
      return ApiResponse.error(res, "all credentials are  required", 400);
    }

    const user = await User.findOne({ admissionNumber }).lean();
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

//####################### logout ######################
export const logout = (req, res) => {
  try {
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return ApiResponse.success(res, "logout successfully", 200);
  } catch (error) {
    return ApiResponse.error(res, error.message || "internal server error", 500);
  }
};

//#################################### delete account ############################################
export const deleteAccount = async (req, res) => {
  try {
    const token = req.cookies?.authToken || req.headers.authorization?.split(" ")[1];

    const { password } = req?.body || {};
    if (!token) return ApiResponse.error(res, "Unauthorized: Token missing", 401);
    if (!password) return ApiResponse.error(res, "Password is required", 400);

    const decoded = verify_token({ token });
    const userId = decoded._id;
    const role = decoded.role;

    if (!userId || !role) {
      return ApiResponse.error(res, "Invalid or expired token", 401);
    }

    let Model;
    switch (role) {
      case "superAdmin":
        Model = SuperAdmin;
        break;
      case "admin":
        Model = Admin;
        break;
      case "user":
        Model = User;
        break;
      default:
        return ApiResponse.error(res, "Invalid user role", 400);
    }

    const user = await Model.findById(userId);
    if (!user) {
      return ApiResponse.error(res, "User not found", 404);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return ApiResponse.error(res, "Invalid password", 401);
    }

    await Model.findByIdAndDelete(userId);

    res.clearCookie("authToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return ApiResponse.success(res, "Account deleted successfully", 200);
  } catch (error) {
    console.error("Delete account error:", error);
    return ApiResponse.error(res, error.message || "Internal Server Error", 500);
  }
};
