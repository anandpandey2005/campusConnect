import { SuperAdmin } from "../../models/superAdmin.model.js";
import { ApiResponse } from "../../utils/apiResponse.utils.js";
import { verify_token } from "../../utils/jsonwebtoken.utils.js";
//####################### GET DETAILS ########################
export const get_superAdmin_profile_details = async (req, res) => {
  try {
    const token = req.cookies?.authToken || req.headers.authorization?.split(" ")[1];

    if (!token) return ApiResponse.error(res, "LOGGED IN FAILED", 400);

    const decoded = verify_token({ token });

    return ApiResponse.success(res, decoded.user, "Fetched details", 200);
  } catch (error) {
    return ApiResponse.error(res, "internal server error" || error.message, 500);
  }
};
