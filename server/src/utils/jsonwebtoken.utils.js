import jwt from "jsonwebtoken";

export const create_token = (object) => {
  try {
    return jwt.sign(object, process.env.JSON_WEBTOKEN_KEY, { expiresIn: "7d" });
  } catch (error) {
    console.error("JWT creation error:", error);
    return null;
  }
};
export const verify_token = () => {};
