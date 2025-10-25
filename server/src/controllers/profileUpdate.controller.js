import { Admin } from "../models/admin.model";
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
