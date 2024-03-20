<?php
$server = "mysql-projphpcabinet.alwaysdata.net";
$login = "344099_root";
$mdp = "coutouriou31670";
$db = "projphpcabinet_cabinet";

$link = mysqli_connect($server, $login, $mdp, $db) or die("Error " . mysqli_error($link));

if ($link->connect_errno) {
    echo "Failed to connect to MySQL: " . $link->connect_error;
    exit();
}
?>
