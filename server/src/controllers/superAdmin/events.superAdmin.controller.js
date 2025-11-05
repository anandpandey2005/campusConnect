import { Admin } from "../../models/admin.model.js";
import { Event } from "../../models/event.model.js";
import { SuperAdmin } from "../../models/superAdmin.model.js";
import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/apiResponse.utils.js";
import { verify_token } from "../../utils/jsonwebtoken.utils.js";

//############################# ADD EVENTS ########################

export const add_event = async (req, res) => {
  try {
    const { title, description, link } = req?.body || {};
    if (!title) {
      return ApiResponse.error(res, "title must be non-empty", 400);
    }
    const image = req?.file?.cloudinaryUrl || " ";

    if (!image) {
      image = "#";
      console.warn("No image uploaded, setting image to '#'");
    }

    const token = req?.cookies?.authToken || req?.headers?.authorization?.split(" ")[1];

    if (!token) {
      return ApiResponse.error(res, "unauthorized", 401);
    }

    const decoded = verify_token({ token });
    const superAdminId = decoded._id;
    const superAdminExists = await SuperAdmin.findById(superAdminId);

    if (!superAdminExists) {
      console.log("1");
      return ApiResponse.error(res);
    }

    const event_acknowledgement = await Event.create({
      image,
      title,
      description,
      link,
      college: superAdminExists._id,
    });

    if (!event_acknowledgement) {
      return ApiResponse.error(res);
    }

    const added = await SuperAdmin.updateOne(
      {
        _id: superAdminId,
      },
      {
        $push: {
          events: {
            eventId: event_acknowledgement._id,
            title: event_acknowledgement.title,
            link: event_acknowledgement.link,
          },
        },
      }
    );

    if (!added) {
      return ApiResponse.error(res);
    }

    return ApiResponse.success(res, "event added", 201);
  } catch (error) {
    return ApiResponse.error(res);
  }
};

// ################################## GET EVENTS ################################
export const get_events_details = async (req, res) => {
  try {
    const token =
      req?.cookies?.authToken ||
      (req?.headers?.authorization ? req.headers.authorization.split(" ")[1] : null);

    if (!token) {
      return ApiResponse.error(res, "Session expired. Please log in again.", 401);
    }

    let decoded;
    try {
      decoded = verify_token({ token });
    } catch (err) {
      return ApiResponse.error(res, "Invalid or expired token.", 401);
    }

    const { _id, role, user } = decoded;
    const collegeId = user?.college;

    const roleModelMap = { user: User, admin: Admin, superAdmin: SuperAdmin };
    const model = roleModelMap[role];

    if (!model) {
      return ApiResponse.error(res, "Unexpected role or unauthorized access.", 403);
    }

    const loggedInUser = await model.findById(_id);
    if (!loggedInUser) {
      return ApiResponse.error(res, "User not found.", 404);
    }

    const collegeDoc = await SuperAdmin.findById(collegeId).populate({
      path: "events.eventId", // 👈 populate nested eventId
      model: "Event", // optional if ref already defined
    });

    if (!collegeDoc) {
      return ApiResponse.error(res, "College record not found.", 404);
    }

    return ApiResponse.success(res, collegeDoc.events, "Events fetched successfully.", 200);
  } catch (error) {
    console.error("get_events_details error:", error);
    return ApiResponse.error(res, "Internal server error", 500);
  }
};
