<?php
require_once 'configDBAuth.php';
require_once 'JWT.php';

// Méthode GET pour vérifier l'authentification
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Récupérer le token depuis les paramètres de l'URL
    $token = $_GET['token'] ?? '';

    // Valider le token
    $jwt = new JWT();
    $isValid = $jwt->validateToken($token);

    if ($isValid) {
        // L'utilisateur est authentifié
        echo 'Utilisateur authentifié';
    } else {
        // L'utilisateur n'est pas authentifié
        echo 'Utilisateur non authentifié';
    }
}

// Méthode POST pour l'authentification
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérer les données d'authentification depuis la requête
    $requestData = json_decode(file_get_contents('php://input'), true);
    $login = $requestData['login'] ?? '';
    $password = $requestData['mdp'] ?? '';

    $stmt = $link->prepare('SELECT * FROM compte WHERE login = ? AND mdp = ?');
    $stmt->bind_param('ss', $login, $password);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user) {
        // Générer un token JWT
        $jwt = new JWT();
        $token = $jwt->generateToken($user['login']);

        // Retourner le token en réponse
        echo $token;
    } else {
        // Les informations d'authentification sont invalides
        echo 'Informations d\'authentification invalides';
    }
}
?>
