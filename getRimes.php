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
    $bdd = new PDO('mysql:host='.$dbhost.';dbname='.$dbname, $dblogin, $dbpassword, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING));
} catch (PDOException $e) {
    echo 'Echec de la connexion : ' . $e->getMessage();
    exit;
}

/*
 * SELECT word, phon, freq, min_nsyl, max_nsyl, elidable, orig, feminine
     FROM words
     WHERE (phon_end = ? OR word_end = ?)
     AND ((? OR max_nsyl >= ?)
     AND (? OR min_nsyl <= ?
     OR (elidable AND min_nsyl - 1 <= ? AND ?)))
     ''';
     args = (phon_end, word_end,
     minsyll == None, minsyll, maxsyll == None, maxsyll, maxsyll, elide,);
 */

$properties = array();

$response = $bdd->query("SELECT * FROM words WHERE (phon_end = '".$phon_end."' OR word_end = '".$word_end."') AND ((max_nsyl >= '".$min_nsyl."') AND (min_nsyl <= '".$max_nsyl."' OR (elidable AND min_nsyl - 1 <= '".$max_nsyl."' AND '".$elidable."')))");

$result = $response->fetchAll();

$response->closeCursor();

echo json_encode(array("rimes" => $result));

?>