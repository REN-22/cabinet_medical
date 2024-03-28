import { connection } from '../../Settings/configBD'

export async function createMedecin(
  civilite: string,
  nom: string,
  prenom: string,
) {
  const [result] = await connection
    .promise()
    .query('INSERT INTO medecin (civilite, nom, prenom) VALUES (?, ?, ?)', [
      civilite,
      nom,
      prenom,
    ])
  return result.insertId
}

export async function getAllMedecins() {
  const [medecins] = await connection.promise().query('SELECT * FROM medecin')
  return medecins
}

export async function updateMedecin(
  id: number,
  civilite: string,
  nom: string,
  prenom: string,
) {
  const [result] = await connection
    .promise()
    .query(
      'UPDATE medecin SET civilite = ?, nom = ?, prenom = ? WHERE id_medecin = ?',
      [civilite, nom, prenom, id],
    )
  return result.affectedRows > 0 // Retourne true si au moins une ligne a été modifiée, sinon false
}

export async function getMedecinById(id: number) {
  const [medecins] = await connection
    .promise()
    .query('SELECT * FROM medecin WHERE id_medecin = ?', [id])
  return medecins[0] // Retourne le premier médecin trouvé, ou undefined si aucun médecin n'est trouvé
}

export async function deleteMedecinById(id: number) {
  const [result] = await connection
    .promise()
    .query('DELETE FROM medecin WHERE id_medecin = ?', [id])
  return result.affectedRows > 0 // Retourne true si au moins une ligne a été supprimée, sinon false
}
