import express = require('express')
import { SetUpBD } from './Settings/SetUpBD'
import { SetUpPortAndCore, app } from './Settings/Settings'
const medecinRoutes = require('./Routes/Medecins/MedecinRoutes')
const patientRoutes = require('./Routes/Patients/PatientRoutes').default;
const consultationRoutes = require('./Routes/Consultations/ConsultationRoutes').default;
const statsRoutes = require('./Routes/Stats/StatRoutes').default;
//import { SetUpBD } from "./Settings/SetUpBD";
//équipe C7

async function AllSetUp(): Promise<void> {
  /* ----- Set Up Routes ----- */
  app.use(express.json())
  app.use('/medecins', medecinRoutes)
  app.use('/usagers', patientRoutes)
  app.use('/Consultations', consultationRoutes)
  app.use('/stats',statsRoutes)

  /* ----- Set Up BD and PORT/CORE ----- */
  await SetUpBD()
  await SetUpPortAndCore()
}

AllSetUp()
