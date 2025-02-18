import { Router } from "express"
import { registerPublication , getPublicationById , getPublication,  deletePublication, updatePublication} from "./publication.controller.js"
import { registerPublicationValidator, getPublicationByIdValidator, deletePublicationsValidator, updatePublicationsValidator} from "../middlewares/publication-validator.js" 
import { validateJWT } from "../middlewares/validate-token.js"
import { hasRoles } from "../middlewares/validate-role.js"

const router = Router()

router.post(
    "/registerPublication/",
    registerPublicationValidator,
    registerPublication
)

router.get(
    "/getPublication/:uid",
    getPublicationByIdValidator,
    getPublicationById
)

router.get(
    "/getPublication/",
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    getPublication
)

router.patch(
    "/deletePublication/:uid",
    deletePublicationsValidator,
    deletePublication
)

router.patch(
    "/updatePublications/:uid",
    updatePublicationsValidator,
    updatePublication
)


export default router