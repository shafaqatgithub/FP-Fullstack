import path from "path";
import { Product } from "../models/productModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import { handleResponse } from "../utils/common.js";
import logger from "../utils/logger.js";

const filename = path.basename(import.meta.url);
const loggerInstance = logger(filename);

/**
 * @description create new product with data
 * @route /products
 * @method POST
 */
const addNewProduct = asyncHandler(async (req, res) => {
    try {
        const productData = req.body;

        const newProduct = await Product.create({ productData });
        if (newProduct) {
            return res.status(201).send(handleResponse("product created successfully", true, 201));
        }
        return res.status(500).send(handleResponse(null, false, 500, "failed to create product, please try again"));
    } catch (error) {
        loggerInstance.error(`Error in product controller - addNewProduct: ${error.message}`);
        return res.status(500).send(handleResponse(null, false, 500, "internal server error"));
    }
});

/**
 * @description list all existing products
 * @route /products
 * @method GET
 */
const getAllProducts = asyncHandler(async (req, res) => {
    try {
        const allExistingProductDocs = await Product.find({});
        if (allExistingProductDocs) {
            return res.status(201).send(handleResponse(allExistingProductDocs, true, 201));
        }
        return res.status(400).send(handleResponse(null, false, 400, "products not found"));
    } catch (error) {
        loggerInstance.error(`Error in product controller - getAllProducts: ${error.message}`);
        return res.status(500).send(handleResponse(null, false, 500, "internal server error"));
    }
});

/**
 * @description find product by id and get the product details
 * @route /products/:id
 * @method GET
 */
const getProductDetails = asyncHandler(async (req, res) => {
    try {
        const productId = req.params.id;
        const existingProductDoc = await Product.findById(productId);
        if (existingProductDoc) {
            return res.status(201).send(handleResponse(existingProductDoc, true, 201));
        }
        return res.status(400).send(handleResponse(null, false, 400, "products not found"));
    } catch (error) {
        loggerInstance.error(`Error in product controller - getProductDetails: ${error.message}`);
        return res.status(500).send(handleResponse(null, false, 500, "internal server error"));
    }
});

/**
 * @description find product by id and update the product details
 * @route /products/:id
 * @method PATCH
 */
const updateProductDetails = asyncHandler(async (req, res) => {
    try {
        const productId = req.params.id;
        const productData = req.body;
        const updatedProductDocs = await Product.findByIdAndUpdate(productId, productData, { new: true });
        if (updatedProductDocs) {
            return res.status(201).send(handleResponse("product details updated successfully", true, 201));
        }
        return res.status(400).send(handleResponse(null, false, 400, "something went wrong, please try again"));
    } catch (error) {
        loggerInstance.error(`Error in product controller - updateProductDetails: ${error.message}`);
        return res.status(500).send(handleResponse(null, false, 500, "internal server error"));
    }
});

/**
 * @description delete single product using the id
 * @route /products/:id
 * @method DELETE
 */
const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProductDocs = await Product.findByIdAndUpdate(productId);
        if (deletedProductDocs) {
            return res.status(200).send(handleResponse("product deleted successfully", true, 200));
        }
        return res.status(400).send(handleResponse(null, false, 400, "something went wrong, please try again"));
    } catch (error) {
        loggerInstance.error(`Error in product controller - deleteProduct: ${error.message}`);
        return res.status(500).send(handleResponse(null, false, 500, "internal server error"));
    }
});

export { addNewProduct, getAllProducts, getProductDetails, updateProductDetails, deleteProduct };
