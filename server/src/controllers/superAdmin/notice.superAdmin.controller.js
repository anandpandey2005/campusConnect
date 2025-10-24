import { Notice } from "../../models/notice.model.js";
import { SuperAdmin } from "../../models/superAdmin.model.js";
import { ApiResponse } from "../../utils/apiResponse.utils.js";
import { verify_token } from "../../utils/jsonwebtoken.utils.js";

//#################################  PUSH NOTICE ########################

export const push_notice = async (req, res) => {
  try {
    const { title, description, link } = req?.body || {};
    const cloudinaryUrl = req?.file?.cloudinaryUrl || "";

    let file = cloudinaryUrl;

    if (!cloudinaryUrl || cloudinaryUrl.length < 1) {
      file = "#";
      console.warn("No file uploaded, setting file to '#'");
    }

    if (!title) {
      return ApiResponse.error(res, "title must be non-empty", 400);
    }

    const token = req.cookies?.authToken || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return ApiResponse.error(res, "unauthorized", 401);
    }

    const decoded = verify_token({ token });

    const superAdminId = decoded._id;

    const superAdminExists = await SuperAdmin.findById(superAdminId);
    if (!superAdminExists) {
      return ApiResponse.error(res);
    }

    const notice_acknowledgemnet = await Notice.create({
      link,
      title,
      description,
      file: file,
      college: superAdminExists._id,
    });

    if (!notice_acknowledgemnet) {
      return ApiResponse.error(res);
    }

    const added = await SuperAdmin.updateOne(
      {
        _id: superAdminId,
      },
      {
        $push: {
          notices: {
            noticeId: notice_acknowledgemnet._id,
            title: notice_acknowledgemnet.title,
            link: notice_acknowledgemnet.link,
            file: file,
          },
        },
      }
    );

    if (!added) {
      return ApiResponse.error(res);
    }

    return ApiResponse.success(res, "notice pushed", 201);
  } catch (error) {
    console.error("Push Notice Error:", error);
    return ApiResponse.error(res);
  }
};
