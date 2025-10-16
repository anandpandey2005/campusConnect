import validator from "email-validator";

export const is_valid_email = (emailId) => validator.validate(emailId);
