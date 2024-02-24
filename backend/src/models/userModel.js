import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
         lowercase: true,
         unique: true,
         trim: true,
      },
      fullName: {
         type: String,
         required: true,
         trim: true,
         index: true,
      },
      avatar: {
         type: String, // cloudinary url
         required: true,
      },
      coverImage: {
         type: String,
      },
      password: {
         type: String,
         required: [true, "Password is required"],
      },
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
 * 
 * @summary:
 * 1. userSchema.pre("save", async function (next) {: This line indicates that the middleware is being set up for the "save" event of the specified Mongoose schema (userSchema).
 * 
 * 2. if (!this.isModified("password")) { next(); }: This checks whether the "password" field has been modified. If it hasn't been modified (e.g., when updating a user profile but not changing the password), the middleware skips the password hashing and proceeds to the next middleware or the save operation.
 * 
 * 3. const salt = await bcrypt.genSalt(10);: A salt is generated using bcrypt.genSalt, and it is awaited to ensure that the salt is generated asynchronously.
 * 
 * 4. this.password = await bcrypt.hash(this.password, salt);: The password is hashed using the generated salt with bcrypt.hash. This line is also awaited to ensure the hashing operation is performed asynchronously.
 * 
 * 5. next();: The next function is called to indicate that the middleware has completed its task, and the save operation can continue.
 * 
 * 6. This middleware ensures that the password is hashed before saving the document. The use of isModified helps avoid unnecessarily rehashing the password if it hasn't been changed.

Make sure you have the necessary dependencies installed, including Mongoose and bcrypt, for this code to work:
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

export const User = mongoose.model("User", userSchema);
