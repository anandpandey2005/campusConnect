import { LostFoundProduct } from "../../models/lostfoundproduct.model.js";
import { ApiResponse } from "../../utils/apiResponse.utils.js";
import { verify_token } from "../../utils/jsonwebtoken.utils.js";
import { SuperAdmin } from "../../models/superAdmin.model.js";
import { Admin } from "../../models/admin.model.js";
import { User } from "../../models/user.model.js";

// ######################### ADD LOST & FOUND PRODUCT #############################

export const lost_found_product = async (req, res) => {
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
    console.log(decoded.role);
    console.log("to3");

    let Model;
    switch (decoded.role) {
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
        return ApiResponse.error(res, "unauthorized access", 401);
    }
    console.log("top4");
    const creator = await Model.findById(decoded._id);
    if (!creator) {
      return ApiResponse.error(res, "User not found", 404);
    }

    const { title, description, venue, contact, handoverTo, tag, branch, status } = req.body || {};

    let image = req?.file?.cloudinaryUrl;

    if (!image) {
      image = undefined;
    }

    if (!title || !venue) {
      return ApiResponse.error(res, "Title and Venue are required", 400);
    }

    const newPost = await LostFoundProduct.create({
      image,
      title,
      description,
      venue,
      contact,
      handoverTo,
      tag,
      branch,
      status,
      createdBy: creator._id,
      createdByModel: decoded.role,
    });

    return ApiResponse.success(res, newPost, "Lost & Found item created successfully", 201);
  } catch (error) {
    return ApiResponse.error(res, error.message || "Something went wrong", 500);
  }
};

// ################################# GET LOST FOUND PRODUCT #######################

export const get_lost_found_product = async (req, res) => {
  try {
    const token =
      req?.cookies?.authToken ||
      (req?.headers?.authorization ? req?.headers?.authorization.split(" ")[1] : null);

    if (!token) {
      return ApiResponse.error(res, "Unauthorized access", 401);
    }

    const decoded = verify_token({ token });
    if (!decoded || !decoded._id || !decoded.role) {
      return ApiResponse.error(res, "Unauthorized access", 401);
    }

    const data = await LostFoundProduct.find().lean();
    if (!data || data.length === 0) {
      return ApiResponse.error(res, "No product", 404);
    }

    return ApiResponse.success(res, data, "products fetched successfully", 200);
  } catch (error) {
    return ApiResponse.error(res);
  }
};

//######################## DELETE LOST AND FOUND PRODUCT ##################

export const delete_lost_found_product = async (req, res) => {
  try {
    const token =
      req?.cookies?.authToken ||
      (req?.headers?.authorization ? req?.headers?.authorization.split(" ")[1] : null);

    if (!token) {
      return ApiResponse.error(res, "unauthirized access", 409);
    }

    const { _id } = req?.body || {};

    if (!_id) {
      return ApiResponse.error(res, "try again later", 404);
    }

    const product_acknowledgement = await LostFoundProduct.findByIdAndDelete(_id);
    if (!product_acknowledgement) {
      return ApiResponse.error(res, "uncought error", 400);
    }

    return ApiResponse.success(res, "successfully deleted", 200);
  } catch (error) {
    return ApiResponse.error(res, error.message || "internal server error");
  }
};
