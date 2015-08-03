<?php
include("helpers.php");
header('Content-Type: text/html; charset=utf-8');

$lyricsLink = $_POST["songUrl"];

// Get the lyrics and credits
$lyricsPage = getCURLOutput($lyricsLink);
$lyricsPage = str_replace('<br />', '###', $lyricsPage);
$lyricsXpath = getDOMXPath($lyricsPage);
$lyricsQuery = $lyricsXpath->query('//div[@class="lyricbox"]/text()');
$creditsQuery = $lyricsXpath->query('//div[@class="song-credit-box"]/text()');
$metaQuery = $lyricsXpath->query('//div[@class="header-column header-title"]/h1/text()');
$songAttrTitle = $metaQuery->item(0)->nodeValue;
$songAttrTitle = str_replace(" Lyrics", "", $songAttrTitle);
$artistName = substr($songAttrTitle, 0 , strrpos($songAttrTitle, ":"));
$songName = substr($songAttrTitle, strrpos($songAttrTitle, ":") + 1);
$lyrics = $lyricsQuery->item($i)->nodeValue;
$lyrics = delete_all_between("(", ")", $lyrics);

if (isset($lyricsLink) && isset($songName) && isset($artistName) && isset($lyrics)) {
    $arr = array('url' => $lyricsLink, 'titre' => $songName, 'auteur' => $artistName, 'lyrics' => $lyrics);
    echo json_encode($arr);
} else {
    echo "Erreur";
}

 ?>
