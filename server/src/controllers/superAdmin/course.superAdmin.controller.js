import { Course } from "../../models/course.model.js";
import { SuperAdmin } from "../../models/superAdmin.model.js";
import { ApiResponse } from "../../utils/apiResponse.utils.js";
import { verify_token } from "../../utils/jsonwebtoken.utils.js";

//############################ ADD COURSE ##################################
export const add_course = async (req, res) => {
  try {
    const token =
      req?.cookies?.authToken ||
      (req?.headers?.authorization ? req.headers.authorization.split(" ")[1] : null);

    if (!token) {
      return ApiResponse.error(res, "Unauthorized access ", 401);
    }

    const decoded = verify_token({ token });
    if (!decoded || !decoded._id || !decoded.role) {
      return ApiResponse.error(res, "Unauthorized access", 401);
    }

    const { name, branch, duration } = req?.body || {};

    if (!name || !duration) {
      return ApiResponse.error(res, "name and duration must be non-empty", 400);
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
      {
        $push: {
          courses: {
            courseId: newCourse._id,
            name: newCourse.name,
            branch: newCourse.branch,
            duration: newCourse.duration,
          },
        },
      }
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
