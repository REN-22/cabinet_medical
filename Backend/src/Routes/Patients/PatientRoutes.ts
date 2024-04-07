const express = require('express')
import {
CreateUsager,
GetAllUsagers,
GetUsagerById,
UpdateUsager,
DeleteUsagerById,
} from '../../Controllers/Patients/PatientController';

const router = express.Router();

// Créer un nouveau patient
router.post('/', CreateUsager);

// Obtenir tous les patients
router.get('/', GetAllUsagers);

// Obtenir un patient par son ID
router.get('/:id', GetUsagerById);

// Mettre à jour un patient
router.patch('/:id', UpdateUsager);

// Supprimer un patient par son ID
router.delete('/:id', DeleteUsagerById);

export default router;