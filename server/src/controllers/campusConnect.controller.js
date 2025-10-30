import { CampusConnect } from "../models/campusConenct.model.js";
import { ApiResponse } from "../utils/apiResponse.utils.js";

//#################### ADD IMAGE ######################
export const campusConnect_add = async (req, res) => {
  try {
    const image = req?.file?.cloudinaryUrl || " ";
    if (!image) {
      return ApiResponse.error(res, "Image field must be non-empty", 400);
    }

    const data = await CampusConnect.create({
      image,
    });

    return ApiResponse.success(res, data, "Image pushed", 200);
  } catch (error) {
    console.error("Error adding images:", error);
    return ApiResponse.error(res);
  }
};

// ################ GET ALL ################

export const campusConnect_getAll = async (req, res) => {
  try {
    const gallery = await CampusConnect.find();

    if (!gallery || gallery.length === 0) {
      return ApiResponse.error(res, "No data found", 404);
    }

    const data = gallery.map((key) => {
      return key.image;
    });
    console.log(data);
    return ApiResponse.success(res, data, "Fetched successfully", 200);
  } catch (error) {
    console.error("Error fetching images:", error);
    return ApiResponse.error(res);
  }
};
