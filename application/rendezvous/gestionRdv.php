
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestionnaire de rendez-vous</title>
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
    <?php require("../components/configDB.php"); ?>

    <table class="table">
        <tr class="table-header">
            <th>Usager</th>
            <th>Médecin</th>
            <th>Date</th>
            <th>Heure</th>
            <th>Durée</th>
            <th>Modifier</th>
            <th>Supprimer</th>
        </tr>

        <?php

        $requete = 'SELECT u.nom, u.prenom, m.nom, m.prenom, r.date_RV, r.heure_RV, r.duree, r.id_usager, r.id_medecin, r.id_rdv
                    FROM rendez_vous r, usager u, medecin m
                    WHERE u.id_usager = r.id_usager
                    AND m.id_medecin = r.id_medecin
                    ORDER BY r.date_RV DESC';


        if (!$resquery = mysqli_query($link, $requete)) {
            die("Error:" . mysqli_errno($link) . ":" . mysqli_error($link));
        } else {
            ///Traitement de la requête
            while ($row = mysqli_fetch_row($resquery)) {

                echo

                "<tr>
        <td>" . $row[0] . " " . $row[1] . "</td>
        <td>" . $row[2] . " " . $row[3] . "</td>
        <td>" . date('d/m/Y', strtotime($row[4])) . "</td>
        <td>" . $row[5] . "</td>
        <td>" . $row[6] . "</td>
        <td>
            <a href='./modifierRdv.php?id_usager=" . $row[7] . "&id_medecin=" . $row[8] . "&date_RV=" . $row[4] . "&heure_RV=" . $row[5] . "&duree=" . $row[6] . "&id_rdv=" . $row[9] . "'>
                <img src='../public/edit-icon.png' alt='edit icon' width='15'/>
            </a>
        </td>
        <td>
            <a href='./supprimerRdv.php?id_usager=" . $row[7] . "&id_medecin=" . $row[8] . "&date_RV=" . $row[4] . "&heure_RV=" . $row[5] . "&duree=" . $row[6] . "&id_rdv=" . $row[9] . "'>
                <img src='../public/delete-icon.png' alt='edit icon' width='15'/>
            </a>
        </td>
      </tr>";
            }
        }
        ?>
    </table>

    <?php

    $getMedecin = 'SELECT * FROM medecin';

    $getClient = 'SELECT * FROM usager';



    ?>

    <div class="ajouter">
        <div class="ajouter-rdv">
            <h1 class="ajouter-titre">Ajouter une consultations</h1>
            <form class="ajouter-rdv-form" action="./ajoutRdv.php" method="post">
                <label>Client: </label>
                <select class="ajouter-input" name="client" class="ajouter-input">
                    <?php
                    if (!$resquery = mysqli_query($link, $getClient)) {
                        die("Error:" . mysqli_errno($link) . ":" . mysqli_error($link));
                    } else {
                        ///Traitement de la requête
                        while ($row = mysqli_fetch_row($resquery)) {
                            echo
                            "<option value='" . $row[0] . "' selected='selected'>" . $row[3] . " " . $row[4] . "</option>";
                        }
                    }
                    ?>
                </select><br>
                <label>Médecin: </label>
                <select class="ajouter-input" name="medecin" class="ajouter-input">
                    <?php
                    if (!$resquery = mysqli_query($link, $getMedecin)) {
                        die("Error:" . mysqli_errno($link) . ":" . mysqli_error($link));
                    } else {
                        ///Traitement de la requête
                        while ($row = mysqli_fetch_row($resquery)) {
                            echo
                            "<option value='" . $row[0] . "' selected='selected'>" . $row[2] . " " . $row[3] . "</option>";
                        }
                    }
                    ?>
                </select><br>
                <label>Date du rendez-vous: </label>
                <input class="ajouter-input" type="date" name="date-rdv"><br>
                <label>Heure du rendez-vous: </label>
                <input class="ajouter-input" type="time" name="heure-rdv"><br>
                <label>Durée du rendez-vous: </label>
                <select class="ajouter-input" name="heure">
                    <?php
                    for ($i = 0; $i < 25; $i++) {
                        echo '<option value="' . $i . '"> ' . $i . " heure" . '</option>';
                    }
                    ?>
                </select><br>
                <?php
                foreach (array("min", "sec") as $name) {
                    echo '<label></label><select class="ajouter-input" name="' . $name . '" />';
                    for ($i = 0; $i < 61; $i++) {
                        if ($i == 30 && $name == "min") {
                            echo '<option selected="selected" value="' . $i . '"> ' . $i . " " . $name . '</option>';
                        } else {
                            echo '<option value="' . $i . '"> ' . $i . " " . $name . '</option>';
                        }
                    }
                    echo '</select><br>';
                }
                ?>
                <div class="small-button-group">
                    <input class="small-button" type="submit" name="submit" value="Valider">
                    <input class="small-button" type="reset" name="reset" value="Reset">
                </div>
            </form>
        </div>
    </div>

</body>

</html>