import express, { json } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import paginateResults from "./middlewares/paginationMiddleware.js";
import swaggerApiDocumentation from "./swaggerDocs/swaggerApiDocumentation.js";
import swaggerUi from "swagger-ui-express";
import mongoose from "mongoose";
import fs from "fs";
import path, { dirname } from "path";
import morgan from "morgan";
import { fileURLToPath } from "url";

const app = express();

const corsOptions = {
    origin: ["http://localhost:3000", "*"], // Replace with the actual origin of your client application
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Enable credentials (cookies, HTTP authentication) cross-origin
    optionsSuccessStatus: 204 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

mongoose.connection.on("error", (error) => console.error(`Error in MongoDb connection: ${error}`));
mongoose.connection.on("reconnected", () => console.log("Mongo reconnected successfully!"));
mongoose.connection.on("disconnected", () => console.log("MongoDB disconnected!"));
mongoose.connection.on("connected", () => {
    /** Middleware Configuration */
    app.set("etag", false);

    const jsonOptions = {
        limit: "100mb", // Limit the request body size
        strict: true, // Only parse arrays and objects (no primitives)
        type: "application/json" // Expected content type
    };
    app.use(express.json(jsonOptions));

    app.use((err, req, res, next) => {
        if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
            res.send({ response: "invalid JSON input" }); // Handling JSON parsing error
        } else {
            next(err); // Forwarding other errors to the next middleware
        }
    });

    const accessLogStream = fs.createWriteStream(path.join(dirname(fileURLToPath(import.meta.url)), "access.log"), { flags: "a" });

    // setup logger
    app.use(
        morgan(
            (tokens, req, res) => {
                const method = tokens.method(req, res);
                const url = tokens.url(req, res);
                const status = tokens.status(req, res);
                const contentLength = tokens.res(req, res, "content-length");
                const responseTime = tokens["response-time"](req, res);
                const date = new Date().toJSON();

                let logData = [method, url, status, contentLength, "-", `${responseTime}ms`, date];

                // Add request body for POST requests
                if (method === "POST") {
                    logData.splice(5, 0, JSON.stringify(req.body));
                }

                // Add additional tokens
                if (tokens[":rest"]) {
                    logData = logData.concat(tokens[":rest"](req, res) || []);
                }

                return logData.join(" ");
            },
            { stream: accessLogStream }
        )
    );

    app.use(express.json({ limit: "16kb" }));
    app.use(express.urlencoded({ extended: true, limit: "16kb" }));
    app.use(express.static("public"));
    app.use(cookieParser());
    app.use(
        helmet({
            contentSecurityPolicy: false, // Disabling contentSecurityPolicy
            xDownloadOptions: false
        })
    );
    app.use(cors(corsOptions));
    app.use(paginateResults);

    // swagger UI for api docs
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerApiDocumentation));
});

export { app };
