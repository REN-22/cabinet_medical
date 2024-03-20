<?php
class Auth
{
    private $secretKey = "15 cm sIG 33 auf Fahrgestell Panzerkampfwagen II (Sf)";
    private $expirationTime = 86400; // 24 heures en secondes

    public function generateToken($login, $role)
    {
        $header = $this->base64UrlEncode(json_encode(['typ' => 'JWT', 'alg' => 'HS256']));
        $payload = $this->base64UrlEncode(json_encode([
            "login" => $login,
            "role" => $role,
            "exp" => time() + $this->expirationTime
        ]));

        $signature = hash_hmac('sha256', "$header.$payload", $this->secretKey, true);
        $encodedSignature = $this->base64UrlEncode($signature);

        return "$header.$payload.$encodedSignature";
    }

    public function validateToken($token)
    {
        echo $token;
        list($header, $payload, $signature) = explode('.', $token);

        $decodedSignature = $this->base64UrlDecode($signature);
        $expectedSignature = hash_hmac('sha256', "$header.$payload", $this->secretKey, true);

        if ($decodedSignature !== $expectedSignature) {
            return false; // Signature verification failed
        }

        $decodedPayload = json_decode($this->base64UrlDecode($payload));
        if ($decodedPayload->exp < time()) {
            return false; // Token has expired
        }

        return $decodedPayload;
    }

    private function base64UrlEncode($data)
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    private function base64UrlDecode($data)
    {
        return base64_decode(strtr($data, '-_', '+/'));
    }
}



// Exemple d'utilisation
$auth = new Auth();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérer les données JSON de la requête
    $jsonData = file_get_contents('php://input');
    $data = json_decode($jsonData);

    // Vérifier les données d'identification
    $username = $data->login ?? '';
    $password = $data->mdp ?? '';

    // Vérifier les données d'identification (à remplacer par votre logique d'authentification réelle)
    if ($username === 'secretaire1' && $password === 'password1234!') {
        // Si les identifiants sont valides, générer un token
        $token = $auth->generateToken($username, 'secretaire');
        // Retourner le token comme réponse JSON
        header('Content-Type: application/json');
        echo json_encode(['token' => $token]);
        exit;
    } else {
        // Si les identifiants sont invalides, retourner un message d'erreur
        header('HTTP/1.1 401 Unauthorized');
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Invalid credentials']);
        exit;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Vérifier le token dans l'en-tête de la requête
    $token = $_SERVER['HTTP_AUTHORIZATION'] ?? '';

    // Vérifier si le token est valide
    $decodedToken = $auth->validateToken($token);
    if ($decodedToken) {
        header('Content-Type: application/json');
        echo json_encode(['message' => 'Protected data', 'user' => $decodedToken->login, 'role' => $decodedToken->role]);
        exit;
    } else {
        // Token invalide ou expiré, retourner une réponse d'erreur
        header('HTTP/1.1 401 Unauthorized');
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Invalid token']);
        exit;
    }
}
?>