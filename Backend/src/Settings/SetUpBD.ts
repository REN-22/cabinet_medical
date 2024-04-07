import * as fs from 'fs'
import { connection } from './configBD'

export async function SetUpBD(): Promise<void> {
  try {
    //const sqlScript = await fs.readFileSync('./cabinet.sql', 'utf8')
    //await connection.query(sqlScript)
    await createMedecin()
    await createRendezVous()
    await createUsager()
  } catch (error) {
    console.error(
      'Erreur lors de la création du script de génération SQL --> ',
      error,
    )
  }
}

async function createMedecin(): Promise<void> {
  connection.query(
    `CREATE TABLE IF NOT EXISTS medecin (
    id_medecin int(11) NOT NULL AUTO_INCREMENT,
    civilite varchar(50) COLLATE latin1_bin DEFAULT NULL,
    nom varchar(50) COLLATE latin1_bin DEFAULT NULL,
    prenom varchar(50) COLLATE latin1_bin DEFAULT NULL,
    PRIMARY KEY (id_medecin)
  ) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_bin`,
    async (err: any, result: any) => {
      if (err) {
        console.error('Erreur lors de la création de la table Medecin : ', err)
        return
      }
      console.log('Table Medecin vérifiée ou créée avec succès !')
    },
  )
}

async function createRendezVous(): Promise<void> {
  connection.query(
    `CREATE TABLE IF NOT EXISTS rendez_vous (
    id_usager int(11) DEFAULT NULL,
    id_medecin int(11) DEFAULT NULL,
    id_rdv int(11) NOT NULL AUTO_INCREMENT,
    date_RV date DEFAULT NULL,
    heure_RV time DEFAULT NULL,
    duree time DEFAULT NULL,
    PRIMARY KEY (id_rdv),
    KEY FKid_medecin (id_medecin)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`,
    async (err: any, result: any) => {
      if (err) {
        console.error(
          'Erreur lors de la création de la table RendezVous : ',
          err,
        )
        return
      }
      console.log('Table RendezVous vérifiée ou créée avec succès !')
    },
  )
}

async function createUsager(): Promise<void> {
  connection.query(
    `CREATE TABLE IF NOT EXISTS usager (
    id_usager int(11) NOT NULL AUTO_INCREMENT,
    num_secu varchar(16) COLLATE latin1_bin DEFAULT NULL,
    civilite varchar(50) COLLATE latin1_bin DEFAULT NULL,
    nom varchar(50) COLLATE latin1_bin DEFAULT NULL,
    prenom varchar(50) COLLATE latin1_bin DEFAULT NULL,
    sexe varchar(50) COLLATE latin1_bin DEFAULT NULL,
    adresse varchar(50) COLLATE latin1_bin DEFAULT NULL,
    code_postal varchar(50) COLLATE latin1_bin DEFAULT NULL,
    ville varchar(50) COLLATE latin1_bin DEFAULT NULL,
    date_naissance date DEFAULT NULL,
    lieu_naissance varchar(50) COLLATE latin1_bin DEFAULT NULL,
    id_medecin int(11) DEFAULT NULL,
    PRIMARY KEY (id_usager),
    UNIQUE KEY num_secu (num_secu),
    KEY FK_Usager_id_medecin (id_medecin)
  ) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;`,
    async (err: any, result: any) => {
      if (err) {
        console.error('Erreur lors de la création de la table Usager : ', err)
        return
      }
      console.log('Table Usager vérifiée ou créée avec succès !')
    },
  )
}
