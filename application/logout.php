<?php
session_start();
session_destroy(); // détruit toutes les données associées à la session courante
header('Location: index.php'); // redirige vers la page de connexion
exit;
?>