import { Admin } from "../models/admin.model.js";
import { SuperAdmin } from "../models/superAdmin.model.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.utils.js";
import { verify_token } from "../utils/jsonwebtoken.utils.js";

//########################## UPDATE PROFILE ################################

export const update_profile = async (req, res) => {
  try {
    const token = req?.cookies?.authToken || req?.headers?.authorization?.split(" ")[1];

    if (!token) {
      return ApiResponse.error(res, "unauthorized", 401);
    }

    const decoded = verify_token({ token });
    let modelName = decoded.role;

    switch (modelName) {
      case "user":
        modelName = "User";
        break;

      case "admin":
        modelName = "Admin";
        break;

      case "superAdmin":
        modelName = "SuperAdmin";
        break;

      default:
        throw new Error("Invalid role in token");
    }
  } catch (error) {
    return ApiResponse.error(res);
  }
};

//############################ FIND ANY PROFILE #######################

export const get_any_profile = async (req, res) => {
  try {
    const token = req.cookies?.authToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
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
