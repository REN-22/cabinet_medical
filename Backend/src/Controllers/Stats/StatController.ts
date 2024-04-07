import { Request, Response } from 'express'
import { getAllMedecins } from '../../Models/Medecins/MedecinModel'
import { getAllRendezVous } from '../../Models/Consultations/ConsultationModel'
import { getAllUsagers } from '../../Models/Patients/PatienModel'
import { verifyToken } from '../VerifyToken/VerifyToken'

export async function getHoursWorkedPerMedecin(req: any, res: any) {
  try {
    const token = req.headers.authorization
    const isTokenValid = await verifyToken(token)
    if (!isTokenValid) {
      return res.status(401).json({
        message: 'Token invalide ou expiré.',
      })
    }
    const medecins = await getAllMedecins()
    const rendezVous = await getAllRendezVous()

    const hoursWorkedPerMedecin: { [key: number]: string } = {}

    medecins.forEach((medecin: any) => {
      hoursWorkedPerMedecin[medecin.id_medecin] = `${medecin.nom} ${
        medecin.prenom
      } ${calculateHoursForMedecin(rendezVous, medecin.id_medecin)}`
    })

    res.status(200).json(hoursWorkedPerMedecin)
  } catch (error) {
    res.status(500).json({
      error: 'Error occurred while calculating hours worked per medecin',
    })
  }
}

function calculateHoursForMedecin(
  rendezVous: any[],
  medecinId: number,
): string {
  let totalHours = 0

  const rendezVousMedecin = rendezVous.filter(
    (rdv: any) => rdv.id_medecin === medecinId,
  )

  rendezVousMedecin.forEach((rdv: any) => {
    const dureeParts = rdv.duree.split(':')
    const hours = parseInt(dureeParts[0], 10)
    const minutes = parseInt(dureeParts[1], 10)
    const seconds = parseInt(dureeParts[2], 10)
    const hoursWorked = hours + minutes / 60 + seconds / 3600
    totalHours += hoursWorked
  })

  const formattedHours = Math.floor(totalHours)
  const formattedMinutes = Math.round((totalHours - formattedHours) * 60)

  return `${formattedHours}h ${formattedMinutes}min`
}

export async function getStatistiquesPatients(req: any, res: any) {
  try {
    const token = req.headers.authorization
    const isTokenValid = await verifyToken(token)
    if (!isTokenValid) {
      return res.status(401).json({
        message: 'Token invalide ou expiré.',
      })
    }
    const usagers = await getAllUsagers()

    let nombreFemmes = 0
    let nombreHommes = 0
    let nombreFemmesMoins25 = 0
    let nombreHommesMoins25 = 0
    let nombreFemmes25a50 = 0
    let nombreHommes25a50 = 0
    let nombreFemmesPlus50 = 0
    let nombreHommesPlus50 = 0

    const dateActuelle = new Date()

    usagers.forEach((usager: any) => {
      if (usager.sexe.toUpperCase() === 'F') {
        nombreFemmes++

        const age = calculerAge(new Date(usager.date_naissance), dateActuelle)
        if (age < 25) {
          nombreFemmesMoins25++
        } else if (age >= 25 && age <= 50) {
          nombreFemmes25a50++
        } else {
          nombreFemmesPlus50++
        }
      } else if (usager.sexe.toUpperCase() === 'H') {
        nombreHommes++

        const age = calculerAge(usager.date_naissance, dateActuelle)
        if (age < 25) {
          nombreHommesMoins25++
        } else if (age >= 25 && age <= 50) {
          nombreHommes25a50++
        } else {
          nombreHommesPlus50++
        }
      }
    })

    res.status(200).json({
      nombreFemmes,
      nombreHommes,
      nombreFemmesMoins25,
      nombreHommesMoins25,
      nombreFemmes25a50,
      nombreHommes25a50,
      nombreFemmesPlus50,
      nombreHommesPlus50,
    })
  } catch (error) {
    res.status(500).json({
      error:
        "Une erreur s'est produite lors du calcul des statistiques des patients",
    })
  }
}

function calculerAge(dateNaissance: Date, dateReference: Date): number {
  if (dateNaissance instanceof Date && !isNaN(dateNaissance.getTime())) {
    const anneeNaissance = dateNaissance.getFullYear()
    const moisNaissance = dateNaissance.getMonth()
    const jourNaissance = dateNaissance.getDate()

    const anneeReference = dateReference.getFullYear()
    const moisReference = dateReference.getMonth()
    const jourReference = dateReference.getDate()

    let age = anneeReference - anneeNaissance

    // Vérifier si la date de naissance n'est pas dans le futur
    if (
      moisReference < moisNaissance ||
      (moisReference === moisNaissance && jourReference < jourNaissance)
    ) {
      age--
    }

    return age
  } else {
    console.error('La date de naissance est invalide :', dateNaissance)
    return -1 // Valeur d'âge invalide pour signaler le problème
  }
}
