import { connection } from '../../Settings/configBD'

export async function createRendezVous(
    id_usager: number,
    id_medecin: number,
    date_RV: Date,
    heure_RV: string,
    dureeMinutes: number,
) {
    const dureeSecondes = dureeMinutes * 100;
    const [result] = await connection
        .promise()
        .query(
            'INSERT INTO rendez_vous (id_usager, id_medecin, date_RV, heure_RV, duree) VALUES (?, ?, ?, ?, ?)',
            [id_usager, id_medecin, date_RV, heure_RV, dureeSecondes],
        )
    return result.insertId
}

export async function getAllRendezVous() {
    const [rendezVous] = await connection.promise().query('SELECT * FROM rendez_vous')
    return rendezVous
}

export async function updateRendezVous(
    id_rdv: number,
    id_usager: number,
    id_medecin: number,
    date_RV: Date,
    heure_RV: string,
    duree: string,
) {
    let query = 'UPDATE rendez_vous SET '
    const params = []
    if (id_usager !== undefined) {
        query += 'id_usager = ?, '
        params.push(id_usager)
    }
    if (id_medecin !== undefined) {
        query += 'id_medecin = ?, '
        params.push(id_medecin)
    }
    if (date_RV !== undefined) {
        query += 'date_RV = ?, '
        params.push(date_RV)
    }
    if (heure_RV !== undefined) {
        query += 'heure_RV = ?, '
        params.push(heure_RV)
    }
    if (duree !== undefined) {
        query += 'duree = ?, '
        params.push(duree)
    }
    query = query.slice(0, -2) // Remove the last comma and space
    query += ' WHERE id_rdv = ?'
    params.push(id_rdv)

    const [result] = await connection
        .promise()
        .query(query, params)
    return result.affectedRows > 0
}

export async function getRendezVousById(id: number) {
    const [rendezVous] = await connection
        .promise()
        .query('SELECT * FROM rendez_vous WHERE id_rdv = ?', [id])
    return rendezVous[0]
}

export async function deleteRendezVous(id: number) {
    const [result] = await connection
        .promise()
        .query('DELETE FROM rendez_vous WHERE id_rdv = ?', [id])
    return result.affectedRows > 0
}
