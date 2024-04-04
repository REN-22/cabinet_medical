import {
createUsager,
deleteUsagerById,
getAllUsagers,
getUsagerById,
updateUsager,
} from '../../Models/Patients/PatienModel'

export async function CreateUsager(req: any, res: any): Promise<void> {
    try {
        const { civilite, nom, prenom, sexe, adresse, code_postal, ville, date_nais, lieu_nais, num_secu, id_medecin } = req.body

        if (!civilite || !nom || !prenom || !sexe || !adresse || !code_postal || !ville || !date_nais || !lieu_nais || !num_secu || !id_medecin) {
            return res.status(400).json({
                message: 'Toutes les informations requises ne sont pas fournies.',
                civilite,
                nom,
                prenom,
                sexe,
                adresse,
                code_postal,
                ville,
                date_nais,
                lieu_nais,
                num_secu,
                id_medecin,
            })
        }

        const [day, month, year] = date_nais.split('/')
        const formattedDate = new Date(`${year}-${month}-${day}`)

        const idUsager = await createUsager(num_secu, civilite, nom, prenom, sexe, adresse, code_postal, ville, formattedDate, lieu_nais, id_medecin)

        res.status(201).json({ message : 'Usager créé avec succès.', idUsager})
    } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                message: 'Un usager avec le même numéro de sécurité sociale existe déjà.',
            })
        }
        console.error('Erreur lors de la création de l\'usager :', error)
        res.status(500).json({
            message: "Une erreur s'est produite lors de la création de l'usager.",
        })
    }
}

export async function GetAllUsagers(req: any, res: any): Promise<void> {
try {
    const usagers = await getAllUsagers()

    res.status(200).json(usagers)
} catch (error) {
    console.error('Erreur lors de la récupération des usagers :', error)
    res.status(500).json({
        message: "Une erreur s'est produite lors de la récupération des usagers.",
    })
}
}

export async function UpdateUsager(req: any, res: any): Promise<void> {
try {
    const { id } = req.params
    const { numSecu, civilite, nom, prenom, adresse, date_naissance, lieu_naissance, id_medecin } = req.body

    if (!id) {
        return res.status(400).json({
            message: 'Toutes les informations requises ne sont pas fournies.',
        })
    }

    const isUpdated = await updateUsager(id, numSecu, civilite, nom, prenom, adresse, date_naissance, lieu_naissance, id_medecin)

    if (isUpdated) {
        res.status(200).json({
            message: 'L\'usager a été mis à jour avec succès.',
        })
    } else {
        res.status(404).json({
            message: `Aucun usager trouvé avec l'identifiant ${id}. La mise à jour n'a pas été effectuée.`,
        })
    }
} catch (error) {
    console.error('Erreur lors de la mise à jour de l\'usager :', error)
    res.status(500).json({
        message: "Une erreur s'est produite lors de la mise à jour de l'usager.",
    })
}
}

export async function GetUsagerById(req: any, res: any): Promise<void> {
try {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({
            message: "L'identifiant de l'usager n'est pas fourni.",
        })
    }

    const usager = await getUsagerById(id)

    if (!usager) {
        return res.status(404).json({
            message: `Aucun usager trouvé avec l'identifiant ${id}.`,
        })
    }

    res.status(200).json(usager)
} catch (error) {
    console.error('Erreur lors de la récupération de l\'usager par ID :', error)
    res.status(500).json({
        message: "Une erreur s'est produite lors de la récupération de l'usager par ID.",
    })
}
}

export async function DeleteUsagerById(req: any, res: any): Promise<void> {
try {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({
            message: "L'identifiant de l'usager n'est pas fourni.",
        })
    }

    const isDeleted = await deleteUsagerById(id)

    if (!isDeleted) {
        return res.status(404).json({
            message: `Aucun usager trouvé avec l'identifiant ${id}. La suppression n'a pas été effectuée.`,
        })
    }

    res.status(200).json({
        message: `L'usager avec l'identifiant ${id} a été supprimé avec succès.`,
    })
} catch (error) {
    console.error('Erreur lors de la suppression de l\'usager par ID :', error)
    res.status(500).json({
        message: "Une erreur s'est produite lors de la suppression de l'usager par ID.",
    })
}
}