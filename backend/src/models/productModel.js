import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            trim: true,
            maxLength: 200,
            required: true,
            index: true,
        },
        productDescription: {
            type: String,
            maxLength: 2000,
        },
        productCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        productImage: { type: String },
        productCost: { type: Number, min: 0, max: 100000, required: true },
        productCountInStock: {
            type: Number,
            min: 0,
            max: 100000,
            required: true,
        },
        isAvailable: { type: Boolean, default: true },
        reviews: [reviewSchema],
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        numReviews: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
