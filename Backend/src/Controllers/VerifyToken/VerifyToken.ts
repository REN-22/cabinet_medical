import axios from 'axios'

// Fonction pour vérifier le token
export async function verifyToken(token: string): Promise<boolean> {
  try {
    const response = await axios.get(
      'https://projphpcabinet.alwaysdata.net/auth/Auth.php',
      {
        headers: {
          Authorization: token,
        },
      },
    )
    if (response.status === 200) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error('Erreur lors de la vérification du token :', error)
    return false
  }
}
