<?php
session_start();

// Votre nom d'utilisateur et mot de passe
$username = 'admin';
$hashed_password = password_hash('admin', PASSWORD_DEFAULT);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if ($_POST['username'] == $username && password_verify($_POST['password'], $hashed_password)) {
        $_SESSION['loggedin'] = true;
        header('Location: acceuil.php'); // Redirige vers la page d'accueil
        exit;
    } else {
        $error = "Nom d'utilisateur ou mot de passe incorrect";
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Connexion</title>
    <link href="styles.css" rel="stylesheet">
</head>
<body>
<form method="post" action="./index.php">
    Nom d'utilisateur: <input type="text" name="username"><br>
    Mot de passe: <input type="password" name="password"><br>
    <input type="submit" value="Se connecter">
</form>
<?php if (isset($error)): ?>
<p style="color: red;"><?php echo $error; ?></p>
<?php endif; ?>
</body>
</html>