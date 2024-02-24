class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong!",
    errors = [],
    stack = "",
  ) {
    // Call the constructor of the parent class (Error)
    super(message);

    // Assign values to properties
    this.statusCode = statusCode; // HTTP status code
    this.data = null; // Additional data (set to null by default)
    this.message = message; // Error message
    this.success = false; // Indicate whether the operation was successful
    this.errors = errors; // Array of error details

    // Set the stack trace
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Export the ApiError class
export { ApiError };
