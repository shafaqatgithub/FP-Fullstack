import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema(
    {
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
            required: true,
        },
        firstName: { type: String, required: true, lowercase: true },
        lastName: { type: String, required: true, lowercase: true },
        avatar: {
            type: String,
            trim: true,
        },
        role: {
            type: mongoose.Schema.ObjectId,
            ref: "Role",
            autopopulate: true,
        },
        isLoggedIn: { type: Boolean },
    },
    { timestamps: true }
);

/** @section User Schema Methods ⬇️ */

/**
 * @description:
 * Match user entered password to hashed password in database
 */
adminSchema.methods.matchPasswords = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    // Encrypt password using bcrypt
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
}); // "function" because "arrow functions" do not have a context of "this"

adminSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

adminSchema.methods.generateRefreshToken = function () {
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

export const Admin = mongoose.model("Admin", adminSchema);
