import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const addressSchema = new mongoose.Schema(
    {
        addressLine: { type: String, maxLength: 500, required: true },
        latitude: { type: String },
        longitude: { type: String },
    },
    { timestamps: true }
);

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            lowercase: true,
            index: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            match: [
                /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
                "Please enter a valid email address",
            ],
            lowercase: true,
            unique: true,
            trim: true,
        },
        firstName: {
            type: String,
            required: [true, "first name field is required"],
            trim: true,
            index: true,
        },
        lastName: {
            tyoe: String,
            required: [true, "lastname field is required"],
            trim: true,
        },
        avatar: {
            type: String,
        },
        coverImage: {
            type: String,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        userAddresses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Address",
            },
        ],
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true }
);

/** @section User Schema Methods ⬇️ */

/**
 * @description:
 * Match user entered password to hashed password in database
 */
userSchema.methods.matchPasswords = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

/**
 * @description:
 * This code is a Mongoose "pre" middleware for the "save" event on a Mongoose schema, and it's commonly used in the context of user authentication to hash passwords before storing them.
 */
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    // Encrypt password using bcrypt
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
}); // "function" because "arrow functions" do not have a context of "this"

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

const Address = mongoose.model("Address", addressSchema);
const User = mongoose.model("User", userSchema);

export { User, Address };
