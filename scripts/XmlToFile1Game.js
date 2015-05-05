var http = require('http');
var fs = require('fs');

var id = 0;
var getsPorCiclo = 25;
var tiempoEntreCiclos = 1000;
var idLimite = 1000;
var total = 0;
var file = 'gamesxml.txt';
var xml = '<Data><baseImgUrl>http://thegamesdb.net/banners/</baseImgUrl><Game><id>25</id><GameTitle>God Hand</GameTitle><PlatformId>11</PlatformId><Platform>Sony Playstation 2</Platform><ReleaseDate>10/10/2006</ReleaseDate><Overview>God Hand puts players in the role of Gene, a martial artist who is bestowed with one of the legendary "God Hands", a pair of divine arms that were once used to save the world from a demon called Angra. Gene and his companion Olivia are eventually caught up in an attempt by a group of demons known as the Four Devas to resurrect Angra for purposes of world domination. The game mixes western and Japanese-themed comedy, containing over-the-top characters and storyline events. The gameplay combines traditional elements of the beat \'em up genre with new features. These include being able to map and string together a large repertoire of fighting techniques to the gamepad\'s face buttons in order to create unique combo attacks.</Overview><ESRB>M - Mature</ESRB><Genres><genre>Action</genre><genre>Fighting</genre></Genres><Players>1</Players><Co-op>No</Co-op><Publisher>Capcom</Publisher><Developer>Clover Studio</Developer><Rating>7.4</Rating><Images><fanart><original width="1920" height="1080">fanart/original/25-1.jpg</original><thumb>fanart/thumb/25-1.jpg</thumb></fanart><fanart><original width="1920" height="1080">fanart/original/25-2.jpg</original><thumb>fanart/thumb/25-2.jpg</thumb></fanart><boxart side="back" width="1508" height="2117" thumb="boxart/thumb/original/back/25-1.jpg">boxart/original/back/25-1.jpg</boxart><boxart side="front" width="1525" height="2117" thumb="boxart/thumb/original/front/25-1.jpg">boxart/original/front/25-1.jpg</boxart><banner width="760" height="140">graphical/25-g.jpg</banner><clearlogo width="400" height="283">clearlogo/25.png</clearlogo></Images></Game></Data>';
xml += '\n\r';
fs.appendFileSync(file, xml);