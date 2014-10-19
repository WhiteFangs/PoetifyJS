<?php

include('dbinfo.php');

if (isset($_POST['word'])) {
    $word = $_POST['word'];
}

try {
    $bdd = new PDO('mysql:host='.$dbhost.';dbname='.$dbname, $dblogin, $dbpassword, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING));
} catch (PDOException $e) {
    echo 'Echec de la connexion : ' . $e->getMessage();
    exit;
}

$response = $bdd->query("SELECT * FROM words WHERE word = '".$word."' ORDER BY freq DESC");
$result = $response->fetchAll();

$response->closeCursor();

echo json_encode(array("properties" => $result));

?>