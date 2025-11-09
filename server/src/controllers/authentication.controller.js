import { ApiResponse } from "../utils/apiResponse.utils.js";
import { SuperAdmin } from "../models/superAdmin.model.js";
import { Admin } from "../models/admin.model.js";
import { User } from "../models/user.model.js";
import { is_valid_email } from "../utils/email_validator.utils.js";
import { create_token, verify_token } from "../utils/jsonwebtoken.utils.js";
import bcrypt from "bcrypt";

//############################# SUPERADMIN  REGISTRATION ####################################
export const super_admin_register = async (req, res) => {
  try {
    const { code, name, phoneNumber, email, password, university } = req?.body || {};
    if (!code || !name || !phoneNumber || !email || !password || !university) {
      return ApiResponse.error(res, "All fields are required", 400);
    }
    const logo =
      req?.file?.cloudinaryUrl ||
      "https://res.cloudinary.com/dxela17ca/image/upload/v1761381058/Your_paragraph_text-removebg-preview_znntme.png";

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
      logo,
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

//#############################   ADMIN REGISTRATION  ############################
export const admin_registration = async (req, res) => {
  try {
    const { name, employeeId, email, phoneNumber, password, department, subjects } =
      req?.body || {};

    if (
      !name ||
      !employeeId ||
      !email ||
      !phoneNumber ||
      !password ||
      !department ||
      !subjects?.length
    ) {
      return ApiResponse.error(res, "All fields are required", 400);
    }

    const token = req.cookies?.authToken || req.headers.authorization?.split(" ")[1];
    if (!token) return ApiResponse.error(res, "Unauthorized", 401);

    const decoded = verify_token({ token });
    const superAdminId = decoded._id;

    const superAdminExists = await SuperAdmin.findById(superAdminId);
    if (!superAdminExists) {
      return ApiResponse.error(res, "Unauthorized", 401);
    }

    const normalizedData = {
      employeeId: employeeId.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      phoneNumber: phoneNumber.trim(),
    };

    const [idExists, emailExists, phoneExists] = await Promise.all([
      Admin.findOne({ employeeId: normalizedData.employeeId }),
      Admin.findOne({ email: normalizedData.email }),
      Admin.findOne({ phoneNumber: normalizedData.phoneNumber }),
    ]);

    if (idExists) return ApiResponse.error(res, "Employee ID already exists", 409);
    if (emailExists) return ApiResponse.error(res, "Email already exists", 409);
    if (phoneExists) return ApiResponse.error(res, "Phone number already exists", 409);

    const departmentMatch = superAdminExists.courses.find(
      (course) => course.name.trim().toLowerCase() === department.trim().toLowerCase()
    );

    if (!departmentMatch) return ApiResponse.error(res, "unexpectd department", 400);

    const admin_acknowledgement = await Admin.create({
      name: name.trim(),
      employeeId: normalizedData.employeeId,
      email: normalizedData.email,
      phoneNumber: normalizedData.phoneNumber,
      password,
      college: superAdminId,
      department: departmentMatch.courseId,
      subjects: subjects.map((sub) => ({ subject: sub.trim().toLowerCase() })),
    });

    await SuperAdmin.updateOne(
      { _id: superAdminId },
      {
        $push: {
          admins: {
            adminId: admin_acknowledgement._id,
            name: admin_acknowledgement.name,
            department: departmentMatch.name,
            employeeId: admin_acknowledgement.employeeId,
          },
        },
      }
    );

    const { password: _, ...data } = admin_acknowledgement.toObject();
    return ApiResponse.success(res, data, "Admin registered successfully", 201);
  } catch (error) {
    console.error("Admin registration error:", error.message);
    return ApiResponse.error(res, error.message || "Internal Server Error", 500);
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

//#############################   User REGISTRATION  ############################
export const single_user_registration = async (req, res) => {
  try {
    const {
      fullName,
      admissionNumber,
      password,
      dob,
      email,
      phoneNumber,
      fatherName,
      motherName,
      course,
    } = req?.body || {};

    if (
      !admissionNumber ||
      !password ||
      !fullName ||
      !dob ||
      !email ||
      !phoneNumber ||
      !fatherName ||
      !motherName ||
      !course
    ) {
      return ApiResponse.error(res, "All fields are required", 400);
    }

    const token = req.cookies?.authToken || req.headers.authorization?.split(" ")[1];

    if (!token) return ApiResponse.error(res, "Unauthorized", 401);

    const normalizedData = {
      admissionNumber: admissionNumber.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      phoneNumber: phoneNumber.trim().toLowerCase(),
      course: course.trim().toLowerCase(),
    };

    const [admissionNumberExists, emailExists, phoneNumberExists, courseExists] = await Promise.all(
      [
        User.findOne({ admissionNumber: normalizedData.admissionNumber }),
        User.findOne({ email: normalizedData.email }),
        User.findOne({ phoneNumber: normalizedData.phoneNumber }),
        SuperAdmin.findOne({ "courses.name": normalizedData.course }),
      ]
    );

    if (admissionNumberExists)
      return ApiResponse.error(res, "Admission number already exists", 409);
    if (emailExists) return ApiResponse.error(res, "Email already exists", 409);
    if (phoneNumberExists) return ApiResponse.error(res, "Phone number already exists", 409);
    if (!courseExists) return ApiResponse.error(res, "Invalid course", 400);

    const decoded = verify_token({ token });
    const superAdminId = decoded._id;

    const superAdminExists = await SuperAdmin.findById(superAdminId);
    if (!superAdminExists) return ApiResponse.error(res, "Unauthorized", 401);

    const user_acknowledgement = await User.create({
      fullName,
      admissionNumber: normalizedData.admissionNumber,
      password,
      dob,
      email: normalizedData.email,
      phoneNumber: normalizedData.phoneNumber,
      fatherName,
      motherName,
      college: superAdminId,
      course: {
        courseId: courseExists._id,
        name: courseExists.name,
        branch: courseExists.branch,
      },
    });

    await SuperAdmin.updateOne(
      { _id: superAdminId },
      {
        $push: {
          students: {
            studentId: user_acknowledgement._id,
            fullName: user_acknowledgement.fullName,
            course: course,
          },
        },
      }
    );

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

//##################################### LOGIN ######################################################

export const login = async (req, res) => {
  try {
    const { phoneNumber, password, role } = req.body || {};

    if (!phoneNumber || !password || !role) {
      return ApiResponse.error(res, "All credentials are required", 400);
    }
    let Model;
    switch (role) {
      case "superadmin":
        Model = SuperAdmin;
        break;
      case "admin":
        Model = Admin;
        break;
      case "user":
        Model = User;
        break;
      default:
        return ApiResponse.error(res, "Invalid role specified", 400);
    }

    const user = await Model.findOne({ phoneNumber });
    if (!user) {
      return ApiResponse.error(res, "Phone number or password is incorrect", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return ApiResponse.error(res, "Phone number or password is incorrect", 401);
    }

    const { password: _, ...userData } = user.toObject();

    const token = create_token({
      _id: user._id,
      user: userData,
      role: user.role,
    });

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "strict",
    });

    return ApiResponse.success(res, { user: userData }, "Logged in successfully", 200);
  } catch (error) {
    console.error("Login Error:", error);
    return ApiResponse.error(res, "Internal Server Error", 500);
  }
};

//####################### LOGOUT ######################
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

//################################### GET PROFILE ####################################################
export const get_profile = async (req, res) => {
  try {
    const token = req?.cookies?.authToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
      console.log("here error occur");
      return ApiResponse.error(res, "Unauthorized", 401);
    }

    const decoded = verify_token({ token });
    const { _id, role } = decoded;

    let model;

    switch (role) {
      case "user":
        model = User;
        break;
      case "admin":
        model = Admin;
        break;
      case "superAdmin":
        model = SuperAdmin;
        break;
      default:
        return ApiResponse.error(res, "Invalid role in token", 400);
    }

    const user = await model.findById(_id).lean();

    if (!user) {
      return ApiResponse.error(res, "User not found", 404);
    }

    const { password, ...data } = user;
    return ApiResponse.success(res, data, "Fetched details successfully", 200);
  } catch (error) {
    console.error(error);
    return ApiResponse.error(res, error.message || "Internal server error", 500);
  }
};

//#################################### DELETE ACCOUNT ############################################
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
