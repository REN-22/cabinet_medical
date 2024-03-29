﻿<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
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

$id = $_GET['id'];

$requete = 'SELECT * FROM usager 
            WHERE id_usager = ' . $id . '';

if (!$resquery = mysqli_query($link, $requete)) {
    die("Error:" . mysqli_errno($link) . ":" . mysqli_error($link));
} else {
    //Traitement de la requete
    $row = mysqli_fetch_row($resquery);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $num_secu = isset($_POST['num-secu']) ? $_POST['num-secu'] : $row[1];
    $civilite = isset($_POST['civilite']) ? $_POST['civilite'] : $row[2];
    $nom = isset($_POST['nom']) ? $_POST['nom'] : $row[3];
    $prenom = isset($_POST['prenom']) ? $_POST['prenom'] : $row[4];
    $adresse = isset($_POST['adresse']) ? $_POST['adresse'] : $row[5];
    $ville = isset($_POST['ville']) ? $_POST['ville'] : $row[9];
    $code_postal = isset($_POST['code_postal']) ? $_POST['code_postal'] : $row[10];
    $date_naissance = isset($_POST['date-naissance']) ? $_POST['date-naissance'] : $row[6];
    $lieu_naissance = isset($_POST['lieu-naissance']) ? $_POST['lieu-naissance'] : $row[7];

    $requete_modif = 'UPDATE usager 
    SET numero_securite_sociale = "' . $num_secu . '",
        civilite = "' . $civilite . '",
        nom = "' . $nom . '", 
        prenom="' . $prenom . '", 
        adresse="' . $adresse . '", 
        date_naissance = "' . $date_naissance . '",
        lieu_naissance = "' . $lieu_naissance . '",
        ville = "' . $ville . '",
        code_postal = "' . $code_postal . '"
        WHERE id_usager = ' . $id . '';


    if (!$resquery = mysqli_query($link, $requete_modif)) {
        die("Error:" . mysqli_errno($link) . ":" . mysqli_error($link));
    } else {
        header('Location: ./gestionUsager.php');
        exit();
    }
}
?>

<!DOCTYPE HTML>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modifier Usager</title>
    <link href="../styles.css" rel="stylesheet">
</head>

<?php include("../components/header.php"); ?>

<body>
    <div class="ajouter">
        <div class="ajouter-usager">
            <h1 class="ajouter-titre">Modifier un usager</h1>
            <form class="ajouter-usager-form" method="post" attritbute="post" action="modifierUsager.php?id='<?php echo $row[0]; ?>'">
                <label>Numero de sécurité: </label>
                <input class="ajouter-input" type="number" name="num-secu" value="<?php echo $row[1]; ?>"><br>
                <label>Civilité: </label>
                <select class="ajouter-input" name="civilite">
                    <option class="ajouter-input" value="Monsieur" <?php if($row[2] == "Monsieur") echo "selected"; ?>>Monsieur</option>
                    <option class="ajouter-input" value="Madame" <?php if($row[2] == "Madame") echo "selected"; ?>>Madame</option>
                </select><br>
                <label>Nom: </label>
                <input class="ajouter-input" type="text" name="nom" value="<?php echo $row[3]; ?>"><br>
                <label>Prénom: </label>
                <input class="ajouter-input" type="text" name="prenom" value="<?php echo $row[4]; ?>"><br>
                <label>Adresse: </label>
                <input class="ajouter-input" type="text" name="adresse" value="<?php echo $row[5]; ?>"><br>
                <label>Ville: </label>
                <input class="ajouter-input" type="text" name="ville" value="<?php echo $row[9]; ?>"><br>
                <label>Code postal: </label>
                <input class="ajouter-input" type="text" name="code_postal" value="<?php echo $row[10]; ?>"><br>
                <label>Date de naissance: </label>
                <input class="ajouter-input" type="date" name="date-naissance" value="<?php echo $row[6]; ?>"><br>
                <label>Lieu de naissance: </label>
                <input class="ajouter-input" type="text" name="lieu-naissance" value="<?php echo $row[7]; ?>"><br>
                <label>Médecin: </label>
                <select class="ajouter-input" name="medecin-traitant" class="ajouter-input">
                    <?php
                    $requete_medecin = "SELECT * FROM medecin";
                    if (!$resquery_medecin = mysqli_query($link, $requete_medecin)) {
                        die("Error:" . mysqli_errno($link) . ":" . mysqli_error($link));
                    } else {
                        ///Traitement de la requête
                        while ($row_medecin = mysqli_fetch_row($resquery_medecin)) {
                            $selected = ($row_medecin[0] == $row[11]) ? "selected" : "";
                            echo "<option class='ajouter-input' value='" . $row_medecin[0] . "' " . $selected . ">" . $row_medecin[2] . " " . $row_medecin[3] . "</option>";
                        }
                    }
                    ?>
                </select>
                <div class="small-button-group">
                    <input class="small-button" type='submit' name='submit' value='Modifier' />
                    <input class="small-button" type='reset' name='reset' value='Reset' />
                    <input class="small-button" type="button" onclick="window.location.href = './gestionUsager.php'" value="Retour" />
                </div>
            </form>
        </div>
    </div>
</body>

</html>