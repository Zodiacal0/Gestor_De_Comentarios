import { body , param } from "express-validator";
import { validationsFields } from "./fields-validator.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { catchErrors } from "./catch-errors.js";
import { validateJWT } from "./validate-token.js";
import { uidCommentExist, uidExist } from "../helpers/db-validators.js";

export const addCommentValidator = [
    body("author").not().isEmpty().withMessage("Name is required").isMongoId().withMessage("No es un Id válido"),
    body("content").not().isEmpty().withMessage("userName is required"),
    body("publication").not().isEmpty().withMessage("Email is required").isMongoId().withMessage("No es un Id válido"),
    validationsFields,
    deleteFileOnError,
    catchErrors
];

export const getCommentValidator = [
    validateJWT,
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(uidExist),
    validationsFields,
    catchErrors
];

export const deleteCommentValidator = [
    validateJWT,
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB").custom(uidCommentExist),
    validationsFields,
    catchErrors
];

export const updateCommentValidator = [
    validateJWT,
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB").custom(uidCommentExist),
    validationsFields,
    catchErrors
];
