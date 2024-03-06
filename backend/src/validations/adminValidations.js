import { check, validationResult } from "express-validator";
import { handleResponse } from "../utils/common.js";

const data = { success: false, message: "Invalid request" };
const validator = {};

/**
 * PRODUCT VALIDATIONS
 */
validator.addNewProduct = [
    check("productName").notEmpty().withMessage("productname cannot be empty"),
    check("productDescription").notEmpty().withMessage("product description cannot be empty"),
    check("productCategory")
        .notEmpty()
        .withMessage("product description cannot be empty")
        .isMongoId()
        .withMessage("product category must be a valid mongodb id"),
    check("productCost").notEmpty().withMessage("productCost cannot be empty").isNumeric().withMessage("product cost must be a number"),
    check("productCountInStock")
        .notEmpty()
        .withMessage("productCountInStock cannot be empty")
        .isNumeric("productCountInStock must be a number"),
    (req, res, next) => {
        const errors = validationResult(req).array();
        if (errors.length > 0) {
            data.message = errors[0].msg;
            return res.status(400).send(handleResponse(null, false, 400, errors[0].msg));
        }

        return next();
    }
];

validator.updateProductDetails = [
    check("productName").notEmpty().withMessage("productname cannot be empty"),
    check("productDescription").notEmpty().withMessage("product description cannot be empty"),
    check("productCategory")
        .notEmpty()
        .withMessage("product description cannot be empty")
        .isMongoId()
        .withMessage("product category must be a valid mongodb id"),
    check("productCost").notEmpty().withMessage("productCost cannot be empty").isNumeric().withMessage("product cost must be a number"),
    check("productCountInStock")
        .notEmpty()
        .withMessage("productCountInStock cannot be empty")
        .isNumeric("productCountInStock must be a number"),
    (req, res, next) => {
        const errors = validationResult(req).array();
        if (errors.length > 0) {
            data.message = errors[0].msg;
            return res.status(400).send(handleResponse(null, false, 400, errors[0].msg));
        }

        return next();
    }
];

/**
 * PRODUCT VALIDATIONS
 */
validator.addNewCategory = [
    check("categoryName").notEmpty().withMessage("category name cannot be empty"),
    check("categoryStatus")
        .optional()
        .notEmpty()
        .withMessage("categoryStatus cannot be empty")
        .isNumeric()
        .withMessage("categoryStatus must be a number"),
    (req, res, next) => {
        const errors = validationResult(req).array();
        if (errors.length > 0) {
            data.message = errors[0].msg;
            return res.status(400).send(handleResponse(null, false, 400, errors[0].msg));
        }

        return next();
    }
];

validator.updateCategoryDetails = [
    check("categoryName").notEmpty().withMessage("category name cannot be empty"),
    check("categoryStatus")
        .optional()
        .notEmpty()
        .withMessage("categoryStatus cannot be empty")
        .isNumeric()
        .withMessage("categoryStatus must be a number"),
    (req, res, next) => {
        const errors = validationResult(req).array();
        if (errors.length > 0) {
            data.message = errors[0].msg;
            return res.status(400).send(handleResponse(null, false, 400, errors[0].msg));
        }

        return next();
    }
];

export default validator;
