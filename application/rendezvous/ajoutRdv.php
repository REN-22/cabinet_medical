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

$client = $_POST['client'];
$medecin = $_POST['medecin'];
$date = $_POST['date-rdv'];
$heure = $_POST['heure-rdv'];

$duree_h = strlen($_POST['heure']) < 2 ? "0" . $_POST['heure'] : $_POST['heure'];
$duree_m = strlen($_POST['min']) < 2 ? "0" . $_POST['min'] : $_POST['min'];
$duree_s = strlen($_POST['sec']) < 2 ? "0" . $_POST['sec'] : $_POST['sec'];

$duree = $duree_h . $duree_m . $duree_s;

$requete = 'INSERT INTO rendez_vous (id_usager, id_medecin, date_RV, heure_RV, duree)
            VALUES ("' . $client . '",
                    "' . $medecin . '",
                    "' . $date . '",
                    "' . $heure . '",
                    "' . $duree . '" 
                );';

if (!$resquery = mysqli_query($link, $requete)) {
    die("Error:" . mysqli_errno($link) . ":" . mysqli_error($link));
} else {
    ///Traitement de la requête
    header("Location: ./gestionRdv.php");
    exit();
}
