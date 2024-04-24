const express = require('express')
const router = express.Router()
import {
  CreateUsager,
  GetAllUsagers,
  GetUsagerById,
  UpdateUsager,
  DeleteUsagerById,
} from '../../Controllers/Patients/PatientController'

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: API pour la gestion des patients
 */

/**
 * @swagger
 * /usagers:
 *   post:
 *     summary: Créer un nouveau patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               civilite:
 *                 type: string
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               sexe:
 *                 type: string
 *               adresse:
 *                 type: string
 *               code_postal:
 *                 type: string
 *               ville:
 *                 type: string
 *               date_nais:
 *                 type: string
 *               lieu_nais:
 *                 type: string
 *               num_secu:
 *                 type: string
 *               id_medecin:
 *                 type: integer
 *     responses:
 *       '201':
 *         description: Usager créé avec succès
 *       '400':
 *         description: Toutes les informations requises ne sont pas fournies
 *       '401':
 *         description: Token invalide ou expiré
 *       '409':
 *         description: Un usager avec le même numéro de sécurité sociale existe déjà
 *       '500':
 *         description: Une erreur s'est produite lors de la création de l'usager
 */
router.post('/', CreateUsager)

/**
 * @swagger
 * /usagers:
 *   get:
 *     summary: Obtenir tous les patients
 *     tags: [Patients]
 *     responses:
 *       '200':
 *         description: Liste de tous les usagers
 *       '401':
 *         description: Token invalide ou expiré
 *       '500':
 *         description: Une erreur s'est produite lors de la récupération des usagers
 */
router.get('/', GetAllUsagers)

/**
 * @swagger
 * /usagers/{id}:
 *   get:
 *     summary: Obtenir un patient par son ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: Identifiant de l'usager
 *     responses:
 *       '200':
 *         description: Détails de l'usager
 *       '400':
 *         description: L'identifiant de l'usager n'est pas fourni
 *       '401':
 *         description: Token invalide ou expiré
 *       '404':
 *         description: Aucun usager trouvé avec l'identifiant spécifié
 *       '500':
 *         description: Une erreur s'est produite lors de la récupération de l'usager par ID
 */
router.get('/:id', GetUsagerById)

/**
 * @swagger
 * /usagers/{id}:
 *   patch:
 *     summary: Mettre à jour un patient
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: Identifiant de l'usager
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numSecu:
 *                 type: string
 *               civilite:
 *                 type: string
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               adresse:
 *                 type: string
 *               date_naissance:
 *                 type: string
 *               lieu_naissance:
 *                 type: string
 *               id_medecin:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: L'usager a été mis à jour avec succès
 *       '400':
 *         description: Toutes les informations requises ne sont pas fournies
 *       '401':
 *         description: Token invalide ou expiré
 *       '404':
 *         description: Aucun usager trouvé avec l'identifiant spécifié
 *       '500':
 *         description: Une erreur s'est produite lors de la mise à jour de l'usager
 */
router.patch('/:id', UpdateUsager)

/**
 * @swagger
 * /usagers/{id}:
 *   delete:
 *     summary: Supprimer un patient par son ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: Identifiant de l'usager
 *     responses:
 *       '200':
 *         description: L'usager a été supprimé avec succès
 *       '400':
 *         description: L'identifiant de l'usager n'est pas fourni
 *       '401':
 *         description: Token invalide ou expiré
 *       '404':
 *         description: Aucun usager trouvé avec l'identifiant spécifié
 *       '500':
 *         description: Une erreur s'est produite lors de la suppression de l'usager par ID
 */
router.delete('/:id', DeleteUsagerById)

export default router
