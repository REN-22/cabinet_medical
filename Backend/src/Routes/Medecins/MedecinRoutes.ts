const express = require('express')
const router = express.Router()
const {
  CreateMedecin,
  GetAllMedecins,
  GetMedecinById,
  UpdateMedecin,
  DeleteMedecinById,
} = require('../../Controllers/Medecins/MedecinController')

// Créer un nouveau médecin
router.post('/', CreateMedecin)

// Obtenir tous les médecins
router.get('/', GetAllMedecins)

// Obtenir un médecin par son ID
router.get('/:id', GetMedecinById)

// Mettre à jour un médecin
router.patch('/:id', UpdateMedecin)

// Supprimer un médecin par son ID
router.delete('/:id', DeleteMedecinById)

module.exports = router
