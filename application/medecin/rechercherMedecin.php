<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>
async function verifyToken(token) {
    try {
        const response = await axios.get('http://localhost/cabinet_medical-main/Auth/Auth.php', {
            params: {
                token: token
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la vérification du token:', error);
        throw error;
    }
}

// Récupérez le token depuis localStorage ou sessionStorage
const token = localStorage.getItem('token') || sessionStorage.getItem('token');

// Vérifiez la validité du token
if (token) {
    verifyToken(token)
        .then(result => {
            console.log(result);
            // Le token est valide, vous pouvez autoriser l'accès à la page protégée
        })
        .catch(error => {
            console.error(error);
            // Le token est invalide ou l'authentification a échoué, redirigez l'utilisateur vers la page de connexion
            window.location.href = 'index.php';
        });
} else {
    // Si aucun token n'est trouvé, redirigez l'utilisateur vers la page de connexion
    window.location.href = 'index.php';
}
</script>
<?php
require("../components/configDB.php");

$nom = $_POST['nom'];

$requete = 'SELECT * FROM medecin WHERE nom = "' . $nom . '"';

?>

<table>
  <tr>
    <th>Civilité</th>
    <th>Nom</th>
    <th>Prenom</th>
    <th>Modifier</th>
    <th>Supprimer</th>
  </tr>
</table>

<?php

if (!$resquery = mysqli_query($link, $requete)) {
  die("Error:" . mysqli_errno($link) . ":" . mysqli_error($link));
} else {
  ///Traitement de la requête
  while ($row = mysqli_fetch_row($resquery)) {
    echo
    "<table>
      <tr>
        <td>" . $row[1] . "</td>
        <td>" . $row[2] . "</td>
        <td>" . $row[3] . "</td>
        <td><a href='./modifierMedecin.php?id=" . $row[0] . "'>Modifier </a>
        <td><a href='./supprimerMedecin.php?id=" . $row[0] . "'>Suprimer </a>
      </tr>
    </table>";
  }
}
