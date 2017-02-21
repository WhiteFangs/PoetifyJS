<?php

include('dbinfo.php');

if (isset($_POST['word'])) {
    $word = $_POST['word'];
}else{
	exit;
}

try {
    $bdd = new PDO('mysql:host=' . $dbhost . ';dbname=' . $dbname, $dblogin, $dbpassword, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING));
    $bdd->exec("SET CHARACTER SET utf8");
} catch (PDOException $e) {
    echo 'Echec de la connexion : ' . $e->getMessage();
    exit;
}

$response = $bdd->query("SELECT * FROM words WHERE word = '".$word."' ORDER BY freq DESC");
$words = $response->fetchAll();
$response->closeCursor();

if(count($words) == 0){
	echo json_encode(array("rimes" => array()));
	exit;
}

$wordProp = $words[0];

function getWord($rime)
{
    return($rime['word']);
}

$lastChar = substr($word, -1);

$checkWordEnding = '';
$origines = explode(',', $wordProp['orig']);
$origineQuery = '';
foreach ($origines as $key => $origine) {
	$parts = explode('|', $origine);
	if($key != 0)
		$origineQuery .= ' OR ';
	$origineQuery .= "(orig LIKE BINARY '%". $parts[0] ."%')";
	if($parts[0] == "VER" || ($parts[0] == "NOM" && ($lastChar == "s" || $lastChar == "x")))
		$checkWordEnding = " AND (word_end = '" . $wordProp['word_end'] . "')";
}

// Uncomment end of query with RAND() and LIMIT to improve Panoryma example with more diverse rimes and better performance
$response = $bdd->query("SELECT * FROM words WHERE (phon_end = '" . $wordProp['phon_end'] . "') ". $checkWordEnding ." AND (".$origineQuery.") AND ((max_nsyl >= '" . $wordProp['min_nsyl'] . "') AND (min_nsyl <= '" . $wordProp['max_nsyl'] . "' OR (elidable AND min_nsyl - 1 <= '" . $wordProp['max_nsyl'] . "' AND '" . $wordProp['elidable'] . "'))) /*ORDER BY RAND() LIMIT 1000*/");
$result = $response->fetchAll();
$response->closeCursor();

$result = array_map("getWord", $result);

echo json_encode(array("rimes" => $result, "isFem" => $wordProp['feminine']));
?>
