import path from "path";
import { Category } from "../models/categoryModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import { handleResponse } from "../utils/common.js";
import logger from "../utils/logger.js";

const filename = path.basename(import.meta.url);
const loggerInstance = logger(filename);

/**
 * @description create new category with data
 * @route /categories
 * @method POST
 */
const addNewCategory = asyncHandler(async (req, res) => {
    try {
        const categoryData = req.body;

        const newCategory = await Category.create({ categoryData });
        if (newCategory) {
            return res.status(201).send(handleResponse("category created successfully", true, 201));
        }
        return res.status(500).send(handleResponse(null, false, 500, "failed to create product, please try again"));
    } catch (error) {
        loggerInstance.error(`Error in category controller - insertNewCategory: ${error.message}`);
        return res.status(500).send(handleResponse(null, false, 500, "internal server error"));
    }
});

/**
 * @description list all existing categories
 * @route /categories
 * @method GET
 */
const getAllCategories = asyncHandler(async (req, res) => {
    try {
        const allExistingCategoriesDocs = await Category.find({});
        if (allExistingCategoriesDocs) {
            return res.status(201).send(handleResponse(allExistingCategoriesDocs, true, 201));
        }
        return res.status(400).send(handleResponse(null, false, 400, "categories not found"));
    } catch (error) {
        loggerInstance.error(`Error in categories controller - getAllCategories: ${error.message}`);
        return res.status(500).send(handleResponse(null, false, 500, "internal server error"));
    }
});

/**
 * @description find category by id and get the category details
 * @route /categories/:id
 * @method GET
 */
const getCategoryDetails = asyncHandler(async (req, res) => {
    try {
        const categoryId = req.params.id;
        const existingCategoryDoc = await Category.findById(categoryId);
        if (existingCategoryDoc) {
            return res.status(201).send(handleResponse(existingCategoryDoc, true, 201));
        }
        return res.status(400).send(handleResponse(null, false, 400, "categories not found"));
    } catch (error) {
        loggerInstance.error(`Error in categories controller - getCategoryDetails: ${error.message}`);
        return res.status(500).send(handleResponse(null, false, 500, "internal server error"));
    }
});

/**
 * @description find category by id and update the category details
 * @route /categories/:id
 * @method PATCH
 */
const updateCategoryDetails = asyncHandler(async (req, res) => {
    try {
        const categoryId = req.params.id;
        const categoryData = req.body;
        const updatedCategoryDocs = await Category.findByIdAndUpdate(categoryId, categoryData, { new: true });
        if (updatedCategoryDocs) {
            return res.status(201).send(handleResponse("category details updated successfully", true, 201));
        }
        return res.status(400).send(handleResponse(null, false, 400, "something went wrong, please try again"));
    } catch (error) {
        loggerInstance.error(`Error in category controller - updateCategoryDetails: ${error.message}`);
        return res.status(500).send(handleResponse(null, false, 500, "internal server error"));
    }
});

/**
 * @description delete single caategory using the id
 * @route /categories/:id
 * @method DELETE
 */
const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const categoryId = req.params.id;
        const deletedCategoryDocs = await Category.findByIdAndUpdate(categoryId);
        if (deletedCategoryDocs) {
            return res.status(200).send(handleResponse("category deleted successfully", true, 200));
        }
        return res.status(400).send(handleResponse(null, false, 400, "something went wrong, please try again"));
    } catch (error) {
        loggerInstance.error(`Error in category controller - deleteCategory: ${error.message}`);
        return res.status(500).send(handleResponse(null, false, 500, "internal server error"));
    }
});

export { addNewCategory, getAllCategories, getCategoryDetails, updateCategoryDetails, deleteCategory };
