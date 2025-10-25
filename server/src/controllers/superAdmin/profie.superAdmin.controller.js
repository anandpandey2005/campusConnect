import { SuperAdmin } from "../../models/superAdmin.model.js";
import { ApiResponse } from "../../utils/apiResponse.utils.js";
import { verify_token } from "../../utils/jsonwebtoken.utils.js";

//####################### GET DETAILS ########################
export const get_superAdmin_profile_details = async (req, res) => {
  try {
    const token = req.cookies?.authToken || req.headers.authorization?.split(" ")[1];

    if (!token) return ApiResponse.error(res, " Unauthorized", 401);

    const decoded = verify_token({ token });
    const _id = decoded._id;

    const user = await SuperAdmin.findOne({ _id }).lean();

    const { password: _, ...data } = user;

    return ApiResponse.success(res, data, "Fetched details", 200);
  } catch (error) {
    return ApiResponse.error(res, "internal server error" || error.message, 500);
  }
};

