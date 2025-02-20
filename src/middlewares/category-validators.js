import { body , param } from "express-validator";
import { validationsFields } from "./fields-validator.js";
import { validateJWT } from "./validate-token.js";
import { hasRoles } from "./validate-role.js";

export const registerBrandValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").not().isEmpty().withMessage("Name is required"),
    body("description").not().isEmpty().withMessage("Description is required"),
    validationsFields
];


export const deleteCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").not().isEmpty().withMessage("The ID is Required").isMongoId().withMessage("The Id isn't valid"),
    validationsFields
];

export const updateCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").not().isEmpty().withMessage("The ID is Required").isMongoId().withMessage("The Id isn't valid"),
    body("name").optional(),
    body("description").optional(),
    validationsFields
];

