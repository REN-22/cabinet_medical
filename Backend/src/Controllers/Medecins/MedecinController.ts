const Medecin = require('../models/medecinModel')

export class MedecinController {
  static async createMedecin(req: any, res: any): Promise<void> {
    try {
      const { civilite, nom, prenom } = req.body

      if (!civilite || !nom || !prenom) {
        return res.status(400).json({
          message: 'Toutes les informations requises ne sont pas fournies.',
        })
      }

      const idMedecin = await Medecin.create(civilite, nom, prenom)

      res.status(201).json({ id: idMedecin, civilite, nom, prenom })
    } catch (error) {
      console.error('Erreur lors de la création du médecin :', error)
      res.status(500).json({
        message: "Une erreur s'est produite lors de la création du médecin.",
      })
    }
  }
}
