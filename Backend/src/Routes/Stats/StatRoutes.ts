const express = require('express')
import {
    getHoursWorkedPerMedecin,
    getStatistiquesPatients,
} from '../../Controllers/Stats/StatController';

const router = express.Router();

router.get('/medecins', getHoursWorkedPerMedecin);

router.get('/usagers', getStatistiquesPatients);

export default router;