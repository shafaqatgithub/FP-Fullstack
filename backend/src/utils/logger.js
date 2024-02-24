import winston from "winston";
import expressWinston from "express-winston";

/**
 * Express winston logger config (customised)
 */
const requestLogger = (app) => {
  app.use(
    expressWinston.logger({
      transports: [
        new winston.transports.File({
          filename: "request.log",
          level: "info",
        }),
      ],
      format: winston.format.combine(
        winston.format.json(),
        winston.format.colorize(),
      ),
      meta: true, // optional: control whether you want to log the meta data about the request (default to true)
      msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
      expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
      ignoreRoute: function (req, res) {
        return false;
      }, // optional: allows to skip some log messages based on request and/or response
    }),
  );
};

/**
 * Winston logger config (simple)
 */
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({
      filename: "src/logs/error.log",
      level: "error",
    }),
    new winston.transports.File({ filename: "src/logs/combined.log" }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

export { logger, requestLogger };
