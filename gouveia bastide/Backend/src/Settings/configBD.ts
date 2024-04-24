const mysql = require('mysql2')

export const connection = mysql.createConnection({
  host: 'mysql-toga.alwaysdata.net',
  user: 'toga_medecin',
  password: 'g!Uwz4*sTil"L![}pfA5',
  database: 'toga_medecin_bd',
})

connection.connect((err: any) => {
  if (err) {
    console.error('Erreur de connexion à la base de données : ', err)
    return
  }
  console.log('Connexion à la base de données réussie !')
})
