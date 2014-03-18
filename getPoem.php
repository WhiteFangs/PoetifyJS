<?php

$poemUrl = $_POST["poemUrl"];
if (isset($poemUrl)) {
    $poemHTML = file_get_contents($poemUrl);
    $poemHTML = str_replace('<br />
<br />', '###', $poemHTML);
    $classPoem = 'poem';
    $classPoemVerse = 'poem verse';
    $idTitle = 'firstHeading';
    $idAuthor = 'ws-author';
    $classAuthor = 'headertemplate-author';
    $dom = new DOMDocument;
    $poemHTML = mb_convert_encoding($poemHTML, 'HTML-ENTITIES', "UTF-8");
    @$dom->loadHTML($poemHTML);
    $xpath = new DOMXPath($dom);
    $poemdivs = $xpath->query("//*[@class='" . $classPoem . "']");
    $poemversedivs = $xpath->query("//*[@class='" . $classPoemVerse . "']");
    $title = $xpath->query("//*[@id='" . $idTitle . "']");
    $authorWS = $xpath->query("//*[@id='" . $idAuthor . "']");
    $author = $xpath->query("//*[@class='" . $classAuthor . "']");
    if ($authorWS->length > 0) {
        $author = $authorWS->item(0)->nodeValue;
    } else if ($author->length > 0) {
        $author = $author->item(0)->nodeValue;
    } else {
        $author = "Auteur non récupéré";
    }
    if ($poemdivs->length > 0) {
        for ($i = 0; $i < $poemdivs->length; $i++) {
            $poem = $poem . $poemdivs->item($i)->nodeValue;
        }
    } else if ($poemversedivs->length > 0) {
        for ($i = 0; $i < $poemversedivs->length; $i++) {
            $poem = $poem . $poemversedivs->item($i)->nodeValue;
        }
    }
    if (isset($poem) && $title->length > 0 && isset($author)) {
        $arr = array('url' => $poemUrl, 'titre' => $title->item(0)->nodeValue, 'auteur' => $author, 'poeme' => $poem);
        echo json_encode($arr);
    } else {
        echo "Erreur";
    }
}
?>