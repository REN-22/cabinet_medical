

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accueil</title>
    <link href="styles.css" rel="stylesheet">
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

<header>
    <div class="logo">
        <a class="logo-link" href="./acceuil.php">
            <img src="./public/logo.png" />
        </a>
    </div>
    <div class="nav-menu">
        <a class="nav-link" href="./stats/stats.php">
            <h2>Stats</h2>
        </a>
        <a class="nav-link" href="./rendezvous/gestionRdv.php">
            <h2>consultations</h2>
        </a>
        <a class="nav-link" href="./usager/gestionUsager.php">
            <h2>usagers</h2>
        </a>
        <a class="nav-link" href="./medecin/gestionMedecin.php">
            <h2>médecins</h2>
        </a>
        <a class="nav-link red-button" href="../logout.php">
            <h2>Déconnexion</h2>
        </a>
    </div>
</header>

<body>
    <h1 class="titre">Bienvenue sur votre gestionnaire de cabinet !</h1>
    <div class="button-menu-group">
        <a class="button-menu-group-link" href="./usager/gestionUsager.php">
            <img class="button-menu-group-image" src="./public/usager-icon.png" alt="icon usager" />
            Usagers
        </a>
        <a class="button-menu-group-link" href="./medecin/gestionMedecin.php">
            <img class="button-menu-group-image" src="./public/medecin-icon.png" alt="icon medecin" />
            Médecins
        </a>
        <a class="button-menu-group-link" href="./rendezvous/gestionRdv.php">
            <img class="button-menu-group-image" src="./public/calendar-icon.png" alt="icon calendrier">
            Consultations
        </a>
        <a class="button-menu-group-link" href="./stats/stats.php">
            <img class="button-menu-group-image" src="./public/stats-icon.png" alt="icon statistiques" />
            Statistiques
        </a>
    </div>
</body>

</html>