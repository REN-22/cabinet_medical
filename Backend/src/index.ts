import express = require('express')
import { SetUpBD } from './Settings/SetUpBD'
import { SetUpPortAndCore, app } from './Settings/Settings'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import socket from './Settings/WebSocketSetup' // Importez la connexion WebSocket

const medecinRoutes = require('./Routes/Medecins/MedecinRoutes').default
const patientRoutes = require('./Routes/Patients/PatientRoutes').default
const consultationRoutes =
  require('./Routes/Consultations/ConsultationRoutes').default
const statsRoutes = require('./Routes/Stats/StatRoutes').default

async function AllSetUp(): Promise<void> {
  /* ----- Set Up Routes ----- */
  app.use(express.json())
  app.use('/medecins', medecinRoutes)
  app.use('/usagers', patientRoutes)
  app.use('/consultations', consultationRoutes)
  app.use('/stats', statsRoutes)

  /* ----- Set Up BD and PORT/CORE ----- */
  await SetUpBD()
  await SetUpPortAndCore()

  /* ----- Set Up de Swagger ----- */

  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Votre API',
        version: '1.0.0',
        description: 'Documentation de votre API',
      },
    },
    apis: [
      'src/Routes/Consultations/ConsultationRoutes.ts',
      'src/Routes/Medecins/MedecinRoutes.ts',
      'src/Routes/Patients/PatientRoutes.ts',
      'src/Routes/Stats/StatRoutes.ts',
    ],
  }
  const specs = swaggerJsdoc(options)

  app.use('/apimedical/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
}

AllSetUp()
