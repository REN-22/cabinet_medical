const express = require('express')
const router = express.Router()
const {
  CreateMedecin,
  GetAllMedecins,
  GetMedecinById,
  UpdateMedecin,
  DeleteMedecinById,
} = require('../../Controllers/Medecins/MedecinController')

/**
 * @swagger
 * tags:
 *   name: Médecins
 *   description: API pour la gestion des médecins
 */

/**
 * @swagger
 * /medecins:
 *   post:
 *     summary: Créer un nouveau médecin
 *     tags: [Médecins]
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
 *     responses:
 *       '201':
 *         description: Médecin créé avec succès
 *       '400':
 *         description: Toutes les informations requises ne sont pas fournies
 *       '401':
 *         description: Token invalide ou expiré
 *       '500':
 *         description: Une erreur s'est produite lors de la création du médecin
 */
router.post('/', CreateMedecin)

/**
 * @swagger
 * /medecins:
 *   get:
 *     summary: Obtenir tous les médecins
 *     tags: [Médecins]
 *     responses:
 *       '200':
 *         description: Liste de tous les médecins
 *       '401':
 *         description: Token invalide ou expiré
 *       '500':
 *         description: Une erreur s'est produite lors de la récupération des médecins
 */
router.get('/', GetAllMedecins)

/**
 * @swagger
 * /medecins/{id}:
 *   get:
 *     summary: Obtenir un médecin par son ID
 *     tags: [Médecins]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: Identifiant du médecin
 *     responses:
 *       '200':
 *         description: Détails du médecin
 *       '400':
 *         description: L'identifiant du médecin n'est pas fourni
 *       '401':
 *         description: Token invalide ou expiré
 *       '404':
 *         description: Aucun médecin trouvé avec l'identifiant spécifié
 *       '500':
 *         description: Une erreur s'est produite lors de la récupération du médecin par ID
 */
router.get('/:id', GetMedecinById)

/**
 * @swagger
 * /medecins/{id}:
 *   patch:
 *     summary: Mettre à jour un médecin
 *     tags: [Médecins]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: Identifiant du médecin
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
 *     responses:
 *       '200':
 *         description: Le médecin a été mis à jour avec succès
 *       '400':
 *         description: Toutes les informations requises ne sont pas fournies
 *       '401':
 *         description: Token invalide ou expiré
 *       '404':
 *         description: Aucun médecin trouvé avec l'identifiant spécifié
 *       '500':
 *         description: Une erreur s'est produite lors de la mise à jour du médecin
 */
router.patch('/:id', UpdateMedecin)

/**
 * @swagger
 * /medecins/{id}:
 *   delete:
 *     summary: Supprimer un médecin par son ID
 *     tags: [Médecins]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: Identifiant du médecin
 *     responses:
 *       '200':
 *         description: Le médecin a été supprimé avec succès
 *       '400':
 *         description: L'identifiant du médecin n'est pas fourni
 *       '401':
 *         description: Token invalide ou expiré
 *       '404':
 *         description: Aucun médecin trouvé avec l'identifiant spécifié
 *       '500':
 *         description: Une erreur s'est produite lors de la suppression du médecin par ID
 */
router.delete('/:id', DeleteMedecinById)

export default router
