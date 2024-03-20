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

$requeteDelUsager = 'DELETE FROM usager WHERE id_usager = "' . $_GET['id'] . '"';
$requeteDelRDV = 'DELETE FROM rendez_vous WHERE id_usager = "' . $_GET['id'] . '"';

if (!$resquery = mysqli_query($link, $requeteDelUsager)) {
    die("Error:" . mysqli_errno($link) . ":" . mysqli_error($link));
} else {
    if (!$resquery = mysqli_query($link, $requeteDelRDV)) {
        die("Error:" . mysqli_errno($link) . ":" . mysqli_error($link));
    } else {
        header("Location: ./gestionUsager.php");
        exit();
    }
}
?>


<input type="button" onclick="window.location.href = './gestionUsager.php'" value="Retour" />