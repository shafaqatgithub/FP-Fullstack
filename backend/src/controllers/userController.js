import { User } from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

/**
 *
 * @param {*} userID
 * @returns
 */
const generateAccessAndRefreshToken = async (userID) => {
    try {
        const user = await User.findById(userID);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        // console.log(`access token: ${accessToken}, refresh token: ${refreshToken}`);
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            process.env.NODE_ENV.toLowerCase() !== "production"
                ? error?.message
                : "Internal Server Error"
        );
    }
};

export { generateAccessAndRefreshToken };
