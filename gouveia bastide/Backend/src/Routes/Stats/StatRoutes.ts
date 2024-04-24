const express = require('express')
const router = express.Router()
import {
  getHoursWorkedPerMedecin,
  getStatistiquesPatients,
} from '../../Controllers/Stats/StatController'

/**
 * @swagger
 * tags:
 *   name: Statistiques
 *   description: API pour les statistiques sur les médecins et les patients
 */

/**
 * @swagger
 * /statistiques/medecins:
 *   get:
 *     summary: Obtenir les heures travaillées par médecin
 *     tags: [Statistiques]
 *     responses:
 *       '200':
 *         description: Les heures travaillées par médecin ont été récupérées avec succès
 *       '401':
 *         description: Token invalide ou expiré
 *       '500':
 *         description: Une erreur s'est produite lors de la récupération des heures travaillées par médecin
 */
router.get('/medecins', getHoursWorkedPerMedecin)

/**
 * @swagger
 * /statistiques/usagers:
 *   get:
 *     summary: Obtenir des statistiques sur les patients
 *     tags: [Statistiques]
 *     responses:
 *       '200':
 *         description: Statistiques sur les patients récupérées avec succès
 *       '401':
 *         description: Token invalide ou expiré
 *       '500':
 *         description: Une erreur s'est produite lors du calcul des statistiques des patients
 */
router.get('/usagers', getStatistiquesPatients)

export default router
