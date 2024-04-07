import {
  createRendezVous,
  deleteRendezVous,
  getAllRendezVous,
  getRendezVousById,
  updateRendezVous,
} from '../../Models/Consultations/ConsultationModel'
import { getMedecinById } from '../../Models/Medecins/MedecinModel'
import { getUsagerById } from '../../Models/Patients/PatienModel'
import { verifyToken } from '../VerifyToken/VerifyToken'

export async function CreateRendezVous(req: any, res: any): Promise<void> {
  try {
    const token = req.headers.authorization
    const isTokenValid = await verifyToken(token)
    if (!isTokenValid) {
      return res.status(401).json({
        message: 'Token invalide ou expiré.',
      })
    }

    const {
      id_usager,
      id_medecin,
      date_consult,
      heure_consult,
      duree_consult,
    } = req.body

    if (
      !id_usager ||
      !id_medecin ||
      !date_consult ||
      !heure_consult ||
      !duree_consult
    ) {
      return res.status(400).json({
        message: 'Toutes les informations requises ne sont pas fournies.',
        id_usager,
        id_medecin,
        date_consult,
        heure_consult,
        duree_consult,
      })
    }

    try {
      const usager = await getUsagerById(id_usager)
      if (usager === undefined) {
        return res.status(404).json({
          message: `Aucun usager trouvé avec l'identifiant ${id_usager}.`,
        })
      }
    } catch (error) {
        return res.status(500).json({
            message: `Erreur inattendue lors de la recherche de l'usager.`,
        })
    }
    try {
      const medecin = await getMedecinById(id_medecin)
      if (medecin === undefined) {
        return res.status(404).json({
          message: `Aucun médecin trouvé avec l'identifiant ${id_medecin}.`,
        })
      }
    } catch (error) {
      return res.status(500).json({
        message: `erreur innatendue`,
      })
    }

    const rendezVous = await createRendezVous(
      id_usager,
      id_medecin,
      date_consult,
      heure_consult,
      duree_consult,
    )

    res
      .status(201)
      .json({ message: 'Rendez-vous créé avec succès.', rendezVous })
  } catch (error: any) {
    console.error('Erreur lors de la création du rendez-vous :', error)
    res.status(500).json({
      message: "Une erreur s'est produite lors de la création du rendez-vous.",
    })
  }
}

export async function GetAllRendezVous(req: any, res: any): Promise<void> {
  try {
    const token = req.headers.authorization
    const isTokenValid = await verifyToken(token)
    if (!isTokenValid) {
      return res.status(401).json({
        message: 'Token invalide ou expiré.',
      })
    }
    const rendezVous = await getAllRendezVous()

    res.status(200).json(rendezVous)
  } catch (error) {
    console.error('Erreur lors de la récupération des rendez-vous :', error)
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la récupération des rendez-vous.",
    })
  }
}

export async function UpdateRendezVous(req: any, res: any): Promise<void> {
  try {
    const token = req.headers.authorization
    const isTokenValid = await verifyToken(token)
    if (!isTokenValid) {
      return res.status(401).json({
        message: 'Token invalide ou expiré.',
      })
    }
    const { id } = req.params
    const {
      id_usager,
      id_medecin,
      date_consult,
      heure_consult,
      duree_consult,
    } = req.body

    if (!id) {
      return res.status(400).json({
        message: 'Toutes les informations requises ne sont pas fournies.',
      })
    }

    const isUpdated = await updateRendezVous(
      id,
      id_usager,
      id_medecin,
      date_consult,
      heure_consult,
      duree_consult,
    )

    if (isUpdated) {
      res.status(200).json({
        message: 'Le rendez-vous a été mis à jour avec succès.',
      })
    } else {
      res.status(404).json({
        message: `Aucun rendez-vous trouvé avec les identifiants ${id}, La mise à jour n'a pas été effectuée.`,
      })
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du rendez-vous :', error)
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la mise à jour du rendez-vous.",
    })
  }
}

export async function GetRendezVousById(req: any, res: any): Promise<void> {
  try {
    const token = req.headers.authorization
    const isTokenValid = await verifyToken(token)
    if (!isTokenValid) {
      return res.status(401).json({
        message: 'Token invalide ou expiré.',
      })
    }
    const { id } = req.params

    if (!id) {
      return res.status(400).json({
        message: 'Les identifiants du rendez-vous ne sont pas fournis.',
      })
    }

    const rendezVous = await getRendezVousById(id)

    if (!rendezVous) {
      return res.status(404).json({
        message: `Aucun rendez-vous trouvé avec les identifiants ${id}.`,
      })
    }

    res.status(200).json(rendezVous)
  } catch (error) {
    console.error(
      'Erreur lors de la récupération du rendez-vous par ID :',
      error,
    )
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la récupération du rendez-vous par ID.",
    })
  }
}

export async function DeleteRendezVous(req: any, res: any): Promise<void> {
  try {
    const token = req.headers.authorization
    const isTokenValid = await verifyToken(token)
    if (!isTokenValid) {
      return res.status(401).json({
        message: 'Token invalide ou expiré.',
      })
    }
    const { id } = req.params

    if (!id) {
      return res.status(400).json({
        message: 'Les identifiants du rendez-vous ne sont pas fournis.',
      })
    }

    const isDeleted = await deleteRendezVous(id)

    if (!isDeleted) {
      return res.status(404).json({
        message: `Aucun rendez-vous trouvé avec les identifiants ${id}. La suppression n'a pas été effectuée.`,
      })
    }

    res.status(200).json({
      message: `Le rendez-vous avec l'identifiants ${id} a été supprimé avec succès.`,
    })
  } catch (error) {
    console.error(
      'Erreur lors de la suppression du rendez-vous par ID :',
      error,
    )
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la suppression du rendez-vous par ID.",
    })
  }
}
