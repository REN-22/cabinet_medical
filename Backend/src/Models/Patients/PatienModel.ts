import { connection } from '../../Settings/configBD'

export async function createUsager(
    num_secu: string,
    civilite: string,
    nom: string,
    prenom: string,
    sexe: string,
    adresse: string,
    code_postal: string,
    ville: string,
    date_naissance: Date,
    lieu_naissance: string,
    id_medecin: number,
) {
    const [result] = await connection
        .promise()
        .query(
            'INSERT INTO usager (num_secu, civilite, nom, prenom, sexe, adresse, code_postal, ville, date_naissance, lieu_naissance, id_medecin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [num_secu, civilite, nom, prenom, sexe, adresse, code_postal, ville, date_naissance, lieu_naissance, id_medecin],
        )
    return result.insertId
}

export async function getAllUsagers() {
    const [usagers] = await connection.promise().query('SELECT * FROM usager')
    return usagers
}

export async function updateUsager(
    id: number,
    numSecu: string ,
    civilite: string ,
    nom: string ,
    prenom: string ,
    adresse: string ,
    date_naissance: Date ,
    lieu_naissance: string ,
    id_medecin: number,
) {
    console.log("id", id, "numSecu", numSecu, "civilite", civilite, "nom", nom, "prenom", prenom, "adresse", adresse, "date_naissance", date_naissance, "lieu_naissance", lieu_naissance, "id_medecin", id_medecin)
    let query = 'UPDATE usager SET '
    const params = []
    if (numSecu !== undefined) {
        query += 'num_secu = ?, '
        params.push(numSecu)
    }
    if (civilite !== undefined) {
        query += 'civilite = ?, '
        params.push(civilite)
    }
    if (nom !== undefined) {
        query += 'nom = ?, '
        params.push(nom)
    }
    if (prenom !== undefined) {
        query += 'prenom = ?, '
        params.push(prenom)
    }
    if (adresse !== undefined) {
        query += 'adresse = ?, '
        params.push(adresse)
    }
    if (date_naissance !== undefined) {
        query += 'date_naissance = ?, '
        params.push(date_naissance)
    }
    if (lieu_naissance !== undefined) {
        query += 'lieu_naissance = ?, '
        params.push(lieu_naissance)
    }
    if (id_medecin !== undefined) {
        query += 'id_medecin = ?, '
        params.push(id_medecin)
    }
    query = query.slice(0, -2) // Remove the last comma and space
    query += ' WHERE id_usager = ?'
    params.push(id)

    console.log(query)
    const [result] = await connection
        .promise()
        .query(query, params)
    return result.affectedRows > 0
}

export async function getUsagerById(id: number) {
    const [usagers] = await connection
        .promise()
        .query('SELECT * FROM usager WHERE id_usager = ?', [id])
    return usagers[0]
}

export async function deleteUsagerById(id: number) {
    const [result] = await connection
        .promise()
        .query('DELETE FROM usager WHERE id_usager = ?', [id])
    return result.affectedRows > 0
}