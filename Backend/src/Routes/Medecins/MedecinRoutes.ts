import { MedecinController } from '../../Controllers/Medecins/MedecinController'

const express = require('express')
const router = express.Router()

router.post('/', MedecinController.createMedecin)

module.exports = router
module.exports = MedecinController
