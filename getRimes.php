<?php

include('dbinfo.php');

if (isset($_POST['phon_end']) && isset($_POST['word_end']) && isset($_POST['min_nsyl']) && isset($_POST['max_nsyl']) && isset($_POST['elidable'])) {
    $phon_end = $_POST['phon_end'];
    $word_end = $_POST['word_end'];
    $min_nsyl = $_POST['min_nsyl'];
    $max_nsyl = $_POST['max_nsyl'];
    $elidable = $_POST['elidable'];
}

try {
    $bdd = new PDO('mysql:host=' . $dbhost . ';dbname=' . $dbname, $dblogin, $dbpassword, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING));
    $bdd->exec("SET CHARACTER SET utf8");
} catch (PDOException $e) {
    echo 'Echec de la connexion : ' . $e->getMessage();
    exit;
}
// Uncomment end of query with RAND() and LIMIT to improve Panoryma example with more diverse rimes and better performance
$response = $bdd->query("SELECT * FROM words WHERE (phon_end = '" . $phon_end . "') AND ((max_nsyl >= '" . $min_nsyl . "') AND (min_nsyl <= '" . $max_nsyl . "' OR (elidable AND min_nsyl - 1 <= '" . $max_nsyl . "' AND '" . $elidable . "'))) /*ORDER BY RAND() LIMIT 1000*/");

$result = $response->fetchAll();

$response->closeCursor();

echo json_encode(array("rimes" => $result));
?>
