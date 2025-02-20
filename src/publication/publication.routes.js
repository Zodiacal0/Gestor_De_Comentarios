import { Router } from "express"
import { registerPublication , getPublicationById , getPublication,  deletePublication, updatePublication} from "./publication.controller.js"
import { registerPublicationValidator, getPublicationByIdValidator, deletePublicationsValidator, updatePublicationsValidator} from "../middlewares/publication-validator.js" 
import { validateJWT } from "../middlewares/validate-token.js"
import { hasRoles } from "../middlewares/validate-role.js"

const router = Router()

/**
 * @swagger
 * /publication/registerPublication:
 *   post:
 *     summary: Register a new publication
 *     tags: [Publications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               owner:
 *                 type: string
 *     responses:
 *       201:
 *         description: Publication created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized - Token missing or invalid
 */
router.post(
    "/registerPublication/",
    validateJWT,
    registerPublicationValidator,
    registerPublication
);

/**
 * @swagger
 * /publication/getPublication/{uid}:
 *   get:
 *     summary: Get a publication by ID (Admin only)
 *     tags: [Publications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Publication retrieved successfully
 *       403:
 *         description: Forbidden - Admin role required
 *       401:
 *         description: Unauthorized - Token missing or invalid
 */
router.get(
    "/getPublication/:uid",
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    getPublicationByIdValidator,
    getPublicationById
);

/**
 * @swagger
 * /publication/getPublication:
 *   get:
 *     summary: Get all publications (Admin only)
 *     tags: [Publications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of publications
 *       403:
 *         description: Forbidden - Admin role required
 *       401:
 *         description: Unauthorized - Token missing or invalid
 */
router.get(
    "/getPublication/",
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    getPublication
);

/**
 * @swagger
 * /publication/deletePublication/{uid}:
 *   patch:
 *     summary: Delete a publication (soft delete)
 *     tags: [Publications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Publication deleted successfully
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       403:
 *         description: Forbidden - You are not the owner or admin
 */
router.patch(
    "/deletePublication/:uid",
    validateJWT,
    deletePublicationsValidator,
    deletePublication
);

/**
 * @swagger
 * /publication/updatePublications/{uid}:
 *   patch:
 *     summary: Update a publication
 *     tags: [Publications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Publication updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized - Token missing or invalid
 */
router.patch(
    "/updatePublications/:uid",
    validateJWT,
    updatePublicationsValidator,
    updatePublication
);

export default router;
