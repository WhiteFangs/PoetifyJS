<?php

function getRandomPoem() {
    // Take random article from Wikipedia in the Category : Poèmes
    $getRandom = 'http://toolserver.org/~erwin85/randomarticle.php?lang=fr&family=wikisource&categories=Poèmes&namespaces=0';
    // Take url from redirection
    $header = get_headers($getRandom);
    $poemUrl = str_replace("Location: ", 'http:', $header[5]);
    $poemUrl = str_replace("/index.php?title=:", "iki/", $poemUrl);
    // Take poem + title + author name from page
    $poemHTML = file_get_contents($poemUrl);
    $classPoem = 'poem';
    $classTitle = 'selflink';
    $classAuthor = 'headertemplate-author';
    $dom = new DOMDocument;
    $poemHTML = mb_convert_encoding($poemHTML, 'HTML-ENTITIES', "UTF-8");
    $dom->loadHTML($poemHTML);
    $xpath = new DOMXPath($dom);
    $poem = $xpath->query("//*[@class='" . $classPoem . "']");
    $title = $xpath->query("//*[@class='" . $classTitle . "']");
    $author = $xpath->query("//*[@class='" . $classAuthor . "']");
    // if everything is there, return the array of elements
    if ($poem->length > 0 && $title->length > 0 && $author->length > 0) {
        $arr = array('url' => $poemUrl, 'titre' => $title->item(0)->nodeValue, 'auteur' => $author->item(0)->nodeValue, 'poeme' => $poem->item(0)->nodeValue);
        return $arr;
    } else { // else search another poem
        return getPoem();
    }
}

$poem = getRandomPoem();
echo json_encode($poem);
?>