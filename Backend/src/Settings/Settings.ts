const express = require('express')
const cors = require('cors')

export const app = express()

export async function SetUpPortAndCore(): Promise<void> {
  app.use(cors())
  app.use(express.json())
  app.listen(process.env.PORT /*5000*/, () => {
    console.log('Connexion au port ', process.env.PORT, ' réussie')
  })
  // app.get('/', (req: any, res: any) => {
  //   try {
  //     res.send('OUIIIIIII')
  //   } catch (error) {
  //     console.log('erreur lors du get a la racine --> ', error)
  //   }
  // })
}
