import { body , param} from "express-validator";
import { validationsFields } from "./fields-validator.js";
import { catchErrors } from "./catch-errors.js";
import { validateJWT } from "./validate-token.js";
import { hasRoles } from "./validate-role.js";
import { uidExist , uidPublicationExist} from "../helpers/db-validators.js";

export const registerPublicationValidator = [
    validateJWT,
    body("title").not().isEmpty().withMessage("El título es requerido"),
    body("category").not().isEmpty().withMessage("La categoría es requerida").isIn(["TECHNOLOGY","MATHEMATICS", "SPORTS","SCIENCE","LIFESTYLE"]).withMessage("Invalid category"),
    body("publicationContent").not().isEmpty().withMessage("Content is Required"),
    body("owner").isMongoId().withMessage("Invalid Id").custom(uidExist),
    validationsFields,
    catchErrors
];

export const getPublicationByIdValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(uidPublicationExist),
    validationsFields,
    catchErrors
];

export const deletePublicationsValidator = [
    validateJWT,
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB").custom(uidPublicationExist),
    validationsFields,
    catchErrors
];

export const updatePublicationsValidator = [
    validateJWT,
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB").custom(uidPublicationExist),
    validationsFields,
    catchErrors
];
