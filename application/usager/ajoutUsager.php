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

$requete = 'INSERT INTO usager (numero_securite_sociale, civilite, nom, prenom, adresse, date_naissance, lieu_naissance, ville, code_postal, id_medecin_traitant)
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