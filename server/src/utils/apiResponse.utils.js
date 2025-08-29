export class ApiResponse {
  constructor(
    success,
    message,
    data = null,
    statusCode,
    errors = null,
    path = null
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
    this.errors = errors;
    this.timestamp = new Date().toISOString();
    this.path = path;
  }

  static success(res, data = {}, message = "Success", statusCode = 200) {
    return res
      .status(statusCode)
      .json(
        new ApiResponse(
          true,
          message,
          data,
          statusCode,
          null,
          res.req?.originalUrl
        )
      );
  }

  static error(
    res,
    message = "Something went wrong",
    statusCode = 500,
    errors = null
  ) {
    return res
      .status(statusCode)
      .json(
        new ApiResponse(
          false,
          message,
          null,
          statusCode,
          errors,
          res.req?.originalUrl
        )
      );
  }
}
