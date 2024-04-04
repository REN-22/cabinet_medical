import {
  createMedecin,
  deleteMedecinById,
  getAllMedecins,
  getMedecinById,
  updateMedecin,
} from '../../Models/Medecins/MedecinModel'

export async function CreateMedecin(req: any, res: any): Promise<void> {
  try {
    const { civilite, nom, prenom } = req.body

    if (!civilite || !nom || !prenom) {
      return res.status(400).json({
        message: 'Toutes les informations requises ne sont pas fournies.',
      })
    }

    const idMedecin = createMedecin(civilite, nom, prenom)

    res.status(201).json({ message: 'Medecin créer avec succès' })
  } catch (error) {
    console.error('Erreur lors de la création du médecin :', error)
    res.status(500).json({
      message: "Une erreur s'est produite lors de la création du médecin.",
    })
  }
}

export async function GetAllMedecins(req: any, res: any): Promise<void> {
  try {
    const medecins = await getAllMedecins() // Utilisation de la fonction getAllMedecins pour récupérer tous les médecins de la base de données

    res.status(200).json(medecins)
  } catch (error) {
    console.error('Erreur lors de la récupération des médecins :', error)
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la récupération des médecins.",
    })
  }
}

export async function UpdateMedecin(req: any, res: any): Promise<void> {
  try {
    const { id } = req.params
    let { civilite, nom, prenom } = req.body

    if (!id) {
      res.status(400).json({
        message: 'Toutes les informations requises ne sont pas fournies.',
      })
    }

    const medecin = await getMedecinById(id)

    if (!medecin) {
      res.status(404).json({
        message: `Aucun médecin trouvé avec l'identifiant ${id}. La mise à jour n'a pas été effectuée.`,
      })
    }

    if (civilite === undefined) {
      civilite = medecin.civilite
    }
    if (nom === undefined) {
      nom = medecin.nom
    }
    if (prenom === undefined) {
      prenom = medecin.prenom
    }

    const isUpdated = await updateMedecin(id, civilite, nom, prenom)

    if (isUpdated) {
      res.status(200).json({
        message: 'Le médecin a été mis à jour avec succès.',
      })
    } else {
      res.status(404).json({
        message: `Aucun médecin trouvé avec l'identifiant ${id}. La mise à jour n'a pas été effectuée.`,
      })
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du médecin :', error)
    res.status(500).json({
      message: "Une erreur s'est produite lors de la mise à jour du médecin.",
    })
  }
}

export async function GetMedecinById(req: any, res: any): Promise<void> {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({
        message: "L'identifiant du médecin n'est pas fourni.",
      })
    }

    const medecin = await getMedecinById(id)

    if (!medecin) {
      return res.status(404).json({
        message: `Aucun médecin trouvé avec l'identifiant ${id}.`,
      })
    }

    res.status(200).json(medecin)
  } catch (error) {
    console.error('Erreur lors de la récupération du médecin par ID :', error)
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la récupération du médecin par ID.",
    })
  }
}

export async function DeleteMedecinById(req: any, res: any): Promise<void> {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({
        message: "L'identifiant du médecin n'est pas fourni.",
      })
    }

    const isDeleted = await deleteMedecinById(id)

    if (!isDeleted) {
      return res.status(404).json({
        message: `Aucun médecin trouvé avec l'identifiant ${id}. La suppression n'a pas été effectuée.`,
      })
    }

    res.status(200).json({
      message: `Le médecin avec l'identifiant ${id} a été supprimé avec succès.`,
    })
  } catch (error) {
    console.error('Erreur lors de la suppression du médecin par ID :', error)
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la suppression du médecin par ID.",
    })
  }
}
