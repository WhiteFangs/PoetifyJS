<?php
include("helpers.php");
header('Content-Type: text/html; charset=utf-8');

$artistLink = urlencode($_POST["songArtist"]);
$artistWikiaLink = "http://lyrics.wikia.com/" . $artistLink;

// Get list of songs with lyrics from artist page
$artistPage = getCURLOutput($artistWikiaLink);
$artistXpath = getDOMXPath($artistPage);
$songsNodes = $artistXpath->query('//b/a[starts-with(@href, "/'.$artistLink.':") and not(contains(@href, "?action=edit"))]');

if($songsNodes->length > 0){
  // Create songs array to filter duplicate songs
  $songs = array();
  foreach($songsNodes as $node) {
    $songs[] = $node->getAttribute("title") . '/href=' . $node->getAttribute("href");
  }
  $songs = array_values(array_filter(array_unique($songs)));

  // Take a random song
  $idx = intval(rand(0, count($songs) - 1));
  $song = $songs[$idx];
  $songAttrTitle = substr($song, 0, strrpos($song, "/href="));
  $songAttrHref = substr($song, strrpos($song, "/href=") + strlen("/href="));
  $artistName = substr($songAttrTitle, 0 , strrpos($songAttrTitle, ":"));
  $songName = substr($songAttrTitle, strrpos($songAttrTitle, ":") + 1);
  $lyricsLink = "http://lyrics.wikia.com" . $songAttrHref;

  // Get the lyrics and credits
  $lyricsPage = getCURLOutput($lyricsLink);
  $lyricsPage = str_replace('<br />', '###', $lyricsPage);
  $lyricsXpath = getDOMXPath($lyricsPage);
  $lyricsQuery = $lyricsXpath->query('//div[@class="lyricbox"]');
  $creditsQuery = $lyricsXpath->query('//div[@class="song-credit-box"]/text()');
  $lyrics = $lyricsQuery->item($i)->nodeValue;
  $lyrics = delete_all_between("(", ")", $lyrics);

  if (isset($lyricsLink) && isset($songName) && isset($artistName) && isset($lyrics)) {
      $arr = array('url' => $lyricsLink, 'titre' => $songName, 'auteur' => $artistName, 'lyrics' => $lyrics);
      echo json_encode($arr);
  } else {
      echo "Erreur";
  }
}

 ?>
