import { Course } from "../../models/course.model.js";
import { SuperAdmin } from "../../models/superAdmin.model.js";
import { ApiResponse } from "../../utils/apiResponse.utils.js";
import { verify_token } from "../../utils/jsonwebtoken.utils.js";

//############################ ADD COURSE ##################################
export const add_course = async (req, res) => {
  try {
    const { name, branch, duration } = req?.body || {};

    if (!name || !duration) {
      return ApiResponse.error(res, "name and duration must be non-empty", 400);
    }

    const token = req.cookies?.authToken || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return new ApiResponse.error(res, "Unauthorized: Token missing", 401);
    }

    const decoded = verify_token({ token });
    if (!decoded || !decoded._id) {
      return ApiResponse.error(res, "Unauthorized: Invalid token", 401);
    }

    const superAdminId = decoded._id;

    const superAdminExists = await SuperAdmin.findById(superAdminId);

    if (!superAdminExists) {
      return ApiResponse.error(res, "Unauthorized", 401);
    }

    const newCourse = await Course.create({
      name,
      branch,
      duration,
      college: superAdminId,
    });

    if (!newCourse) {
      return ApiResponse.error(res, "Failed to create course", 500);
    }

    const added = await SuperAdmin.updateOne(
      { _id: superAdminId },
      { $push: { courses: newCourse._id } }
    );
    if (!added) {
      return ApiResponse.error(res);
    }

    return ApiResponse.error(res, "Course added successfully", 200);
  } catch (error) {
    console.error("Error adding course:", error);

    return ApiResponse.error(res, "Internal Server Error", 500);
  }
};
