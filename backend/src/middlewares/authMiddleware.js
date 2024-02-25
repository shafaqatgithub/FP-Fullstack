import { User } from "../models/userModel.js";
import { ApiError } from "../utils/apiError.js";
import asyncHandler from "./asyncHandler.js";
import jwt from "jsonwebtoken";
import { Admin } from "../models/adminModel.js";

export const authorizeUser = asyncHandler(async (req, _, next) => {
    try {
        const token = await (req.cookies?.AccessToken ||
            req.header("Authorization")?.replace("Bearer ", ""));

        if (!token) {
            throw new ApiError(401, "Unauthorised request");
        }

        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decode?._id).select(
            "-password -refreshToken"
        );

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user;

        next();
    } catch (error) {
        throw new ApiError(
            401,
            error?.message || "not authorized! token failed"
        );
    }
});

export const authorizeAdmin = asyncHandler(async (req, _, next) => {
    try {
        const token = await (req.cookies?.AccessToken ||
            req.header("Authorization")?.replace("Bearer ", ""));

        if (!token) {
            throw new ApiError(401, "Unauthorised request");
        }

        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const admin = await Admin.findById(decode?._id).select(
            "-password -refreshToken"
        );

        if (!admin) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.admin = admin;

        next();
    } catch (error) {
        throw new ApiError(
            401,
            error?.message || "not authorized! token failed"
        );
    }
});

export { authorizeAdmin, authorizeUser };
