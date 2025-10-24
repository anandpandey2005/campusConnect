import { Event } from "../../models/event.model.js";
import { SuperAdmin } from "../../models/superAdmin.model.js";
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
