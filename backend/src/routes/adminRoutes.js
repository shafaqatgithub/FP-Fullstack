import { Router } from "express";
import validator from "../validations/adminValidations";
import {
    addNewCategory,
    getAllCategories,
    getCategoryDetails,
    updateCategoryDetails,
    deleteCategory
} from "../controllers/categoryController";
import { deleteProduct, getAllProducts, getProductDetails, updateProductDetails } from "../controllers/productController";

const adminRouter = Router();

// PRODUCT CATEGORY ROUTES
adminRouter.route("/categories").post(validator.addNewCategory, addNewCategory).get(getAllCategories);
adminRouter
    .route("/categories/:id")
    .get(getCategoryDetails)
    .patch(validator.updateCategoryDetails, updateCategoryDetails)
    .delete(deleteCategory);

// PRODUCT  ROUTES
adminRouter.route("/products").post(validator.addNewProduct, addNewCategory).get(getAllProducts);
adminRouter.route("/products/:id").get(getProductDetails).patch(validator.updateProductDetails, updateProductDetails).delete(deleteProduct);

export default adminRouter;
