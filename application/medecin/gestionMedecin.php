

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestionnaire de médecin</title>
    <link href="../styles.css" rel="stylesheet">
</head>

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

<?php include("../components/header.php"); ?>

<body>
    <?php
    require("../components/configDB.php");

    if (isset($_POST["nom"]) && $_POST["nom"] != "") {
        $requete = 'SELECT * FROM medecin WHERE nom = "' . $_POST["nom"] . '"';
    } else {
        $requete = 'SELECT * FROM medecin';
    }


    ?>

    <form class="rechercher-large" action="./gestionUsager.php" method="post">
        <input class="rechercher-large-bar" type="text" name="nom" placeholder="Nom">
        <button class="search-large" type="submit">
            <img class="icon-large" src="../public/search-icon.png" />
        </button>
    </form>
    <table class="table">
        <tr class="table-header">
            <th>Civilité</th>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Modifier</th>
            <th>Supprimer</th>
        </tr>

        <?php

        if (!$resquery = mysqli_query($link, $requete)) {
            die("Error:" . mysqli_errno($link) . ":" . mysqli_error($link));
        } else {
            ///Traitement de la requête
            while ($row = mysqli_fetch_row($resquery)) {
                echo

                "<tr>
        <td>" . $row[1] . "</td>
        <td>" . $row[2] . "</td>
        <td>" . $row[3] . "</td>
        <td>
            <a href='./modifierMedecin.php?id=" . $row[0] . "'>
                <img src='../public/edit-icon.png' alt='edit icon' width='15'/>
            </a>
        </td>
        <td>
            <a href='./supprimerMedecin.php?id=" . $row[0] . "'>
                <img src='../public/delete-icon.png' alt='edit icon' width='15'/>
            </a>
        </td>
      </tr>";
            }
        }
        ?>
    </table>

    <div class="ajouter">
        <div class="ajouter-medecin">
            <h1 class="ajouter-titre">Ajouter un médecin</h1>
            <form class="ajouter-medecin-form" action="./ajoutMedecin.php" method="post">
                <div>
                    <label>Civilité: </label>
                    <select class="ajouter-input" name="civilite">
                        <option class="ajouter-input" value="Monsieur" selected="selected">Monsieur</option>
                        <option class="ajouter-input" value="Madame" selected="selected">Madame</option>
                    </select><br>
                    <label>Nom: </label>
                    <input class="ajouter-input" type="text" name="nom" placeholder="Dupont"><br>
                    <label>Prénom: </label>
                    <input class="ajouter-input" type="text" name="prenom" placeholder="Jean"><br>
                </div>
                <div class="small-button-group">
                    <input class="small-button" type="submit" name="submit" value="Valider">
                    <input class="small-button" type="reset" name="reset" value="Reset">
                </div>
            </form>
        </div>
    </div>

</body>

</html>