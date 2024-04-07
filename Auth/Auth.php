<?php
require_once 'configDBAuth.php';
require_once 'JWT.php';

// Méthode GET pour vérifier l'authentification
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        // Récupérer le token depuis le header "Authorization"
        $token = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
        // Nettoyer le token pour obtenir seulement le jeton lui-même
        $token = str_replace('Bearer ', '', $token);

        // Valider le token
        $jwt = new JWT();
        $isValid = $jwt->validateToken($token);

        if ($isValid) {
            // L'utilisateur est authentifié
            deliver_response(200, 'Verification réussie, token valide', null);
        } else {
            // L'utilisateur n'est pas authentifié ou le token est invalide
            deliver_response(401, 'Erreur de vérification : token invalide ou expiré', null);
        }
    } catch (Exception $e) {
        // Erreur interne lors de la validation du token
        deliver_response(500, 'Erreur interne lors de la validation du token', null);
    }
}


// Méthode POST pour l'authentification
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérer les données d'authentification depuis la requête
    try {
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
            try {
                $jwt = new JWT();
                $token = $jwt->generateToken($user['login']);

                // Retourner le token en réponse
                deliver_response(201, 'Connexion réussie, token créé avec succès', $token);
            } catch(Exception $e) {
                deliver_response(500, 'Erreur lors de la création du token', null);
            }
        } else {
            // Les informations d'authentification sont invalides
            deliver_response(400, 'Informations d\'authentification invalides', null);
        }
    } catch(Exception $e) {
        deliver_response(500, 'Erreur interne lors de l\'authentification', null);
    }
}

function deliver_response($status_code, $status_message, $data = null)
{
    http_response_code($status_code);
    header("Content-Type:application/json; charset=utf-8");

    $status_phrases = [
        200 => 'OK',
        201 => 'Created',
        400 => 'Bad Request',
        401 => 'Unauthorized',
        404 => 'Not Found',
        500 => 'Internal Server Error',
    ];

    $response = [
        'status_message' => $status_message,
    ];
    
    if ($data !== null) {
        $response['data'] = $data;
    }
    

    $json_response = json_encode($response, JSON_UNESCAPED_UNICODE);
    if ($json_response === false) {
        die('Erreur d\'encodage JSON : ' . json_last_error_msg());
    }

    echo $json_response;
}
