<?php
class JWT
{
    private $secretKey = "15 cm sIG 33 auf Fahrgestell Panzerkampfwagen II (Sf)";
    private $expirationTime = 86400; // 24 heures en secondes

    public function generateToken($login)
    {
        $header = $this->base64UrlEncode(json_encode(['typ' => 'JWT', 'alg' => 'HS256']));
        $payload = $this->base64UrlEncode(json_encode([
            "login" => $login,
            "exp" => time() + $this->expirationTime
        ]));

        $signature = hash_hmac('sha256', "$header.$payload", $this->secretKey, true);
        $encodedSignature = $this->base64UrlEncode($signature);

        return "$header.$payload.$encodedSignature";
    }

    public function validateToken($token)
    {
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
?>