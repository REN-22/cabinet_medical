const express = require('express')
import {
  CreateRendezVous,
  GetAllRendezVous,
  UpdateRendezVous,
  GetRendezVousById,
  DeleteRendezVous,
} from '../../Controllers/Consultations/ConsultationController'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Consultations
 *   description: API pour la gestion des consultations
 */

/**
 * @swagger
 * /consultations:
 *   post:
 *     summary: Créer un nouveau rendez-vous de consultation
 *     tags: [Consultations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usager:
 *                 type: number
 *               id_medecin:
 *                 type: number
 *               date_consult:
 *                 type: string
 *                 format: date
 *               heure_consult:
 *                 type: string
 *               duree_consult:
 *                 type: number
 *     responses:
 *       '201':
 *         description: Rendez-vous de consultation créé avec succès
 *       '400':
 *         description: Toutes les informations requises ne sont pas fournies
 *       '401':
 *         description: Token invalide ou expiré
 *       '404':
 *         description: Aucun usager ou médecin trouvé avec les identifiants fournis
 *       '500':
 *         description: Une erreur s'est produite lors de la création du rendez-vous de consultation
 */
router.post('/', CreateRendezVous)

/**
 * @swagger
 * /consultations:
 *   get:
 *     summary: Obtenir tous les rendez-vous de consultation
 *     tags: [Consultations]
 *     responses:
 *       '200':
 *         description: Liste de tous les rendez-vous de consultation
 *       '401':
 *         description: Token invalide ou expiré
 *       '500':
 *         description: Une erreur s'est produite lors de la récupération des rendez-vous de consultation
 */
router.get('/', GetAllRendezVous)

/**
 * @swagger
 * /consultations/{id}:
 *   get:
 *     summary: Obtenir un rendez-vous de consultation par son ID
 *     tags: [Consultations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identifiant du rendez-vous de consultation
 *     responses:
 *       '200':
 *         description: Détails du rendez-vous de consultation
 *       '400':
 *         description: Les identifiants du rendez-vous de consultation ne sont pas fournis
 *       '401':
 *         description: Token invalide ou expiré
 *       '404':
 *         description: Aucun rendez-vous de consultation trouvé avec les identifiants fournis
 *       '500':
 *         description: Une erreur s'est produite lors de la récupération du rendez-vous de consultation par ID
 */
router.get('/:id', GetRendezVousById)

/**
 * @swagger
 * /consultations/{id}:
 *   patch:
 *     summary: Mettre à jour un rendez-vous de consultation
 *     tags: [Consultations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identifiant du rendez-vous de consultation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usager:
 *                 type: number
 *               id_medecin:
 *                 type: number
 *               date_consult:
 *                 type: string
 *                 format: date
 *               heure_consult:
 *                 type: string
 *               duree_consult:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Le rendez-vous de consultation a été mis à jour avec succès
 *       '400':
 *         description: Toutes les informations requises ne sont pas fournies
 *       '401':
 *         description: Token invalide ou expiré
 *       '404':
 *         description: Aucun rendez-vous de consultation trouvé avec les identifiants fournis
 *       '500':
 *         description: Une erreur s'est produite lors de la mise à jour du rendez-vous de consultation
 */
router.patch('/:id', UpdateRendezVous)

/**
 * @swagger
 * /consultations/{id}:
 *   delete:
 *     summary: Supprimer un rendez-vous de consultation par son ID
 *     tags: [Consultations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identifiant du rendez-vous de consultation
 *     responses:
 *       '200':
 *         description: Le rendez-vous de consultation a été supprimé avec succès
 *       '400':
 *         description: Les identifiants du rendez-vous de consultation ne sont pas fournis
 *       '401':
 *         description: Token invalide ou expiré
 *       '404':
 *         description: Aucun rendez-vous de consultation trouvé avec les identifiants fournis
 *       '500':
 *         description: Une erreur s'est produite lors de la suppression du rendez-vous de consultation par ID
 */
router.delete('/:id', DeleteRendezVous)

export default router
