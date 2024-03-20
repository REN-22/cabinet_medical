import { connection } from '../../Settings/configBD'

export class Medecin {
  static async create(civilite: string, nom: string, prenom: string) {
    const [result] = await connection.query(
      'INSERT INTO medecin (civilite, nom, prenom) VALUES (?, ?, ?)',
      [civilite, nom, prenom],
    )
    return result.insertId
  }
}
