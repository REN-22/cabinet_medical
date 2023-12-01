<?php
require("../components/configDB.php");

$requete = 'DELETE FROM rendez_vous WHERE id_rdv = ' . $_GET['id_rdv'];

if (!$resquery = mysqli_query($link, $requete)) {
    die("Error:" . mysqli_errno($link) . ":" . mysqli_error($link));
} else {
    trigger_error("Consultation supprimé", E_USER_NOTICE);
    header("Location: ./gestionRdv.php");
    exit();
}
