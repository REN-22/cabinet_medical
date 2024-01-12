<?php
session_start();

if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header('Location: ../index.php'); // Redirige vers la page de connexion
    exit;
}
?>
<?php
require("../components/configDB.php");

$num_secu = $_POST['num-secu'];
$civilite = $_POST['civilite'];
$nom = $_POST['nom'];
$prenom = $_POST['prenom'];
$adresse = $_POST['adresse'];
$ville = $_POST['ville'];
$code_postal = $_POST['code_postal'];
$date_naissance = $_POST['date-naissance'];
$lieu_naissance = $_POST['lieu-naissance'];
$medecin = $_POST['medecin-traitant'];

$requete = 'INSERT INTO Usager (numero_securite_sociale, civilite, nom, prenom, adresse, date_naissance, lieu_naissance, ville, code_postal, id_medecin_traitant)
            VALUES ("' . $num_secu . '",
                    "' . $civilite . '",
                    "' . $nom . '",
                    "' . $prenom . '",
                    "' . $adresse . '", 
                    "' . $date_naissance . '",
                    "' . $lieu_naissance . '",
                    "' . $ville . '",
                    "' . $code_postal . '",
                    "' . $medecin . '"  
                );';

if (!$resquery = mysqli_query($link, $requete)) {
    die("Error:" . mysqli_errno($link) . ":" . mysqli_error($link));
} else {
    ///Traitement de la requête
    header("Location: ./gestionUsager.php");
    exit();
}
?>

<input type="button" onclick="window.location.href = './gestionUsager.php'" value="Retour" />