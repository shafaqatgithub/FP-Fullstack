import express, { json } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import paginateResults from "./middlewares/paginationMiddleware.js";

const app = express();

const corsOptions = {
    origin: ["http://localhost:3000", "*"], // Replace with the actual origin of your client application
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Enable credentials (cookies, HTTP authentication) cross-origin
    optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(helmet());
app.use(cors(corsOptions));
app.use(paginateResults);

export { app };
