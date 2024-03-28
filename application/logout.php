<?php
echo '<script>';
echo 'localStorage.removeItem("token");'; // supprime le token stocké localement
echo 'window.location.href = "index.php";'; // redirige vers la page de connexion
echo '</script>';
exit;
?>