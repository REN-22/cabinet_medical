const express = require('express')
import {
    CreateRendezVous,
    GetAllRendezVous,
    UpdateRendezVous,
    GetRendezVousById,
    DeleteRendezVous,
} from '../../Controllers/Consultations/ConsultationController';

const router = express.Router();

// Créer un nouveau patient
router.post('/', CreateRendezVous);

// Obtenir tous les patients
router.get('/', GetAllRendezVous);

// Obtenir un patient par son ID
router.get('/:id', GetRendezVousById);

// Mettre à jour un patient
router.patch('/:id', UpdateRendezVous);

// Supprimer un patient par son ID
router.delete('/:id', DeleteRendezVous);

export default router;