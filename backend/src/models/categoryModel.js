import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        categoryName: { type: String, maxLength: 50, trim: true, required: true },
        categoryStatus: { type: Number, enum: [1, 2], default: 1 }
    },
    { timestamps: true }
);

export const Category = mongoose.model("Cattegory", categorySchema);
