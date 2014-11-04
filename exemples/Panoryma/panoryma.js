
// Comptage et découpage d'un mot en syllabes avec les possibilités de diérèses gérées par la variable max
function syllabify(s) {
    if (s.toLowerCase() == "pays") { // Exception pour ce mot ingérable autrement
        return ({syllabes: ["pa", "ys"], nb: 2, max: 2});
    }
    if (!s.trim().match(/[a-zA-Z]/g)) {
        return {syllabes: [], nb: 0, max: 0};
    }
    var consonnes = ['b', 'B', 'c', 'C', 'ç', 'Ç', 'd', 'D', 'f', 'F', 'g', 'G', 'h', 'H', 'j', 'J', 'k', 'K', 'l', 'L', 'm', 'M', 'n', 'N', 'ñ', 'Ñ', 'p', 'P', 'q', 'Q', 'r', 'R', 's', 'S', 't', 'T', 'v', 'V', 'w', 'W', 'x', 'X', 'y', 'Y', 'z', 'Z', '-'];
    var voyellesFortes = ['a', 'A', 'á', 'Á', 'à', 'À', 'â', 'Â', 'e', 'E', 'é', 'É', 'è', 'È', 'ê', 'Ê', 'í', 'Í', 'o', 'ó', 'O', 'Ó', 'ô', 'Ô', 'ú', 'Ú'];
    var voyellesFaibles = ['i', 'I', 'u', 'U', 'ü', 'Ü', 'ï', 'Ï', 'î', 'Î', 'û', 'Û'];
    var voyelles = voyellesFortes.concat(voyellesFaibles, ['y', 'Y']);
    var nb, coupure;
    var j = 0, max = 0;
    var n = s.length - 1;
    var i = 0;
    var syllabes = [];
    while (i <= n) {
        coupure = 0; // Ne coupe pas
        if (consonnes.indexOf(s.charAt(i)) > -1) {
            if (voyelles.indexOf(s.charAt(i + 1)) > -1) {
                if (s.toLowerCase().charAt(i) == 'y') { // diérèse possible du y utilisé comme consonne
                    max++;
                }
                if (voyelles.indexOf(s.charAt(i - 1)) > -1) {
                    coupure = 1;
                }
            } else if ((['s', 'S'].indexOf(s.charAt(i)) > -1) && (['n', 'N'].indexOf(s.charAt(i - 1)) > -1) && (consonnes.indexOf(s.charAt(i + 1)) > -1)) {
                coupure = 2;
            } else if ((consonnes.indexOf(s.charAt(i + 1)) > -1) && (voyelles.indexOf(s.charAt(i - 1)) > -1)) {
                if (['r', 'R'].indexOf(s.charAt(i + 1)) > -1) {
                    if (['b', 'B', 'c', 'C', 'd', 'D', 'f', 'F', 'g', 'G', 'k', 'K', 'p', 'P', 'r', 'R', 't', 'T', 'v', 'V'].indexOf(s.charAt(i)) > -1) {
                        coupure = 1;
                    } else {
                        coupure = 2;
                    }
                } else if (['l', 'L'].indexOf(s.charAt(i + 1)) > -1) {
                    if (['b', 'B', 'c', 'C', 'd', 'D', 'f', 'F', 'g', 'G', 'k', 'K', 'l', 'L', 'p', 'P', 't', 'T', 'v', 'V'].indexOf(s.charAt(i)) > -1) {
                        coupure = 1;
                    } else {
                        coupure = 2;
                    }
                } else if (['h', 'H'].indexOf(s.charAt(i + 1)) > -1) {
                    if (['c', 'C', 's', 'S', 'p', 'P'].indexOf(s.charAt(i)) > -1) {
                        coupure = 1;
                    } else {
                        coupure = 2;
                    }
                } else if ((['t', 'T', 'p', 'P'].indexOf(s.charAt(i + 1)) > -1) && (['s', 'S'].indexOf(s.charAt(i + 2)) > -1)) { // pour des mots comme "verts" ou "corps"
                    coupure = 0;
                } else {
                    coupure = 2;
                }
            }
        } else if (voyellesFortes.indexOf(s.charAt(i)) > -1) {
            if ((voyellesFortes.indexOf(s.charAt(i - 1)) > -1) &&
                    (s.substring(i - 2, i).toLowerCase() != 'ge') &&
                    (s.substring(i - 1, i + 2).toLowerCase() != 'eau') &&
                    (s.substring(i - 1, i + 1).toLowerCase() != 'oe') &&
                    ((s.substring(i - 1, i + 2).toLowerCase() != 'ée') && (s.substring(i + 1, i + 2).toLowerCase() != 'ées') && (s.substring(i + 1, i + 4).toLowerCase() != 'éent'))) {
                coupure = 1;
            }
        } else if (voyellesFaibles.indexOf(s.charAt(i)) > -1 && (s.substring(i - 1, i + 1).toLowerCase() != 'qu') && (s.substring(i - 1, i + 1).toLowerCase() != 'gu')) { // Gestion de la diérèse éventuelle, sauf pour les cas avec "qu" / "gu"
            if ((voyelles.indexOf(s.charAt(i + 1)) > -1) &&
                    (consonnes.indexOf(s.charAt(i - 1)) > -1) &&
                    (consonnes.indexOf(s.charAt(i - 2)) > -1) &&
                    (s.substring(i, i + 2).toLowerCase() != 'ui')) { // diérèse obligatoire si deux consonnes avant
                if (s.toLowerCase().charAt(i + 1) == 'y') { // diérèse possible du y pour des mots comme "ennuyer" ou "essuyer"
                    max++;
                }
                coupure = 2;
            } else if ((voyelles.indexOf(s.charAt(i + 1)) > -1)) {
                if (((s.substring(i + 1, i + 4).toLowerCase() != 'ent') && (s.substring(i + 1, i + 4).toLowerCase() != 'es')) || // Si terminaisons en "-aient" et en "-aie(s)" : pas de diérèse possible
                        (s.substring(i, i + 2).toLowerCase() != 'ui')) { // Si mot comme "fruit", "bruit", "impuissant", diérèse très rare mais tolérable
                    max++;
                }
            }
        }
        if (coupure == 1) {  // Couper ici
            var voy = s.substring(j, i);
            syllabes.push(voy);
            j = i;
        } else if (coupure == 2) { // Couper au caractère suivant
            i++;
            var voy = s.substring(j, i);
            syllabes.push(voy);
            j = i;
        }
        i++;
    }
    nb = syllabes.length;
    if ((j == n) && (nb > 0) && (consonnes.indexOf(s.charAt(n)) > -1)) { //Dernière lettre
        syllabes[nb - 1] = syllabes[nb - 1] + s.charAt(n);
    } else {
        var voy = s.substring(j, n + 1);
        syllabes.push(voy); // Dernière syllabe
        nb++;
    }
    return {syllabes: syllabes, nb: nb, max: nb + max};
}

// Prend un tableau de mots en entrée. Pour chaque mot dans le tableau (vers), applique syllabify avec les règles d'élision du e
function elisioner(mots) {
    var voyelles = ['a', 'A', 'á', 'Á', 'à', 'À', 'â', 'Â', 'e', 'E', 'é', 'É', 'è', 'È', 'ê', 'Ê', 'í', 'Í', 'o', 'ó', 'O', 'Ó', 'ô', 'Ô', 'ú', 'Ú', 'i', 'I', 'u', 'U', 'ü', 'Ü', 'û', 'Û', 'ï', 'Ï', 'î', 'Î'];
    var elision = voyelles.concat(['h', 'H']);
    var syllabes, nb = 0, max = 0;

    function sansAccents(s) {
        var r = s.toLowerCase();
        r = r.replace(/[àáâãäå]/g, "a");
        r = r.replace(/[èéêë]/g, "e");
        r = r.replace(/[ìíîï]/g, "i");
        r = r.replace(/[òóôõö]/g, "o");
        r = r.replace(/[ùúûü]/g, "u");
        r = r.replace(/[ýÿ]/g, "y");
        return r;
    }

    for (var i = 0; i < mots.length; i++) {
        syllabes = syllabify(mots[i]);
        nb += syllabes.nb;
        max += syllabes.max;
        if ((i > 0) &&
                (mots[i - 1].toLowerCase().slice(-1) == 'e') &&
                (elision.indexOf(mots[i].charAt(0)) > -1) &&
                (sansAccents(mots[i - 1].toLowerCase().slice(-2, -1)) != sansAccents(mots[i].charAt(0)))) { // élision du e de fin dans le mot précédent si liaison (MAIS élision interdite si même son, ex: "Thésée excusable")
            nb--;
            if (!(['h', 'H'].indexOf(mots[i].charAt(0)) > -1)) {
                max--;
            }
        }
        if ((i == mots.length - 1) &&
                (mots[i].toLowerCase().slice(-1) == 'e' || mots[i].toLowerCase().slice(-2) == 'es' || mots[i].toLowerCase().slice(-3) == 'ent')) { // élision du e en fin de vers
            nb--;
            if (!((voyelles.indexOf(mots[i].toLowerCase().slice(-2, -1)) > -1) && (mots[i].toLowerCase().slice(-1) == 'e')) && // Si finit par une voyelle + "e" : l'élision peut-être évitée en appuyant le e (ex: "patrie")
                    !((voyelles.indexOf(mots[i].toLowerCase().slice(-3, -2)) > -1) && (mots[i].toLowerCase().slice(-2) == 'es')) &&
                    !((voyelles.indexOf(mots[i].toLowerCase().slice(-4, -3)) > -1) && (mots[i].toLowerCase().slice(-3) == 'ent')) &&
                    !(mots[i].toLowerCase().slice(-4) == 'ment')) { // Si c'est un adverbe, la syllabe finale est obligatoire donc on ne diminue pas max pour prévenir ces cas
                max--;
            }
        }
    }
    return {nb: nb, max: max};
}

// Compte le nombre de syllabes des vers d'un poème en suivant les règles classiques d'élision
function metrify(s) {
    s = s.replace(/[\.,…\/#!$%\^&\*;\?:{}=\_`~()]/g, "");
    s = s.replace(/[0-9]/g, '');
    s = s.replace(/\s{2,}/g, " ");
    s = s.replace(/œ/g, "oe");
    s = s.replace(/æ/g, "ae");
    s = s.replace(/\r\n|\r|\n/g, "<br>");
    var vers = s.split("<br>");
    vers = vers.filter(function(v) {
        return v !== ''
    });
    var mots = [];
    var nbsyllabes = [];

    for (var i = 0; i < vers.length; i++) {
        var lesmots = vers[i].split(" ");
        lesmots = lesmots.filter(function(v) {
            return v !== ''
        });
        mots[i] = lesmots; // range les mots dans un tableau différent pour chaque vers
    }

    // Appliquer elisioner au tableau de mots de chaque vers
    for (var k = 0; k < mots.length; k++) {
        nbsyllabes[k] = elisioner(mots[k]);
    }

    return {vers: vers, mots: mots, nbsyllabes: nbsyllabes};
}

// Récupère les rimes d'un mot ayant le même nombre de syllabes et la même nature (Verbe, nom, adjectif...)
function rimify(s, gender, traitement) {
    var syllabes = syllabify(s), request;

    // Parse la nature de la rime et compare à celle du mot
    function natureEquals(natureRime, nature) {
        for (var i = 0; i < natureRime.length; i++) {
            if (nature.indexOf(natureRime[i]) > -1) {
                return true;
            }
        }
        return false;
    }

    // Callback de la requête
    var callback = function(rhymes) {
        var rimesArray = [];
        var rime, syllabesRime;
        if (rhymes != null) {
            for (var k = 0; k < rhymes.length; k++) {
                rime = rhymes[k].word;
                syllabesRime = syllabify(rime);
                if (syllabesRime.nb == syllabes.nb && syllabesRime.max == syllabes.max && natureEquals(rhymes[k].orig, rhymes.keys.orig)) {
                    rimesArray.push(rime);
                }
            }
        }
        if (rimesArray.length != 0) {
            if (rhymes[0].feminine == 1) {
                return traitement({rimes: rimesArray, isFem: true});
            }
            return traitement({rimes: rimesArray, isFem: false});
        } else {
            document.body.style.cursor = "default";
            window.motsArray = window.motsArray.concat({rime: s, rimes: [s], index: 0, isFem: false});
            return false;
        }
    };

    getWordQuery(s, function(wordProp) {
        getRimesQuery(wordProp, gender, function(rhymes) {
            callback(rhymes);
        })
    });
}

// Récupère les données d'un mot dans la base de données et exécute le callback avec les propriétés du mot si besoin
function getWordQuery(word, callback) {
    word = word.replace(/[\.,…\/#!$%\^&\*;\?:{}=\_`~()]/g, "").replace(/[0-9]/g, '').replace(/\s{1,}/g, "").replace(/œ/g, "oe").replace(/æ/g, "ae");
    word = word.toLowerCase();
    var request;
    request = new XMLHttpRequest;
    request.open('POST', '../../getWord.php', true);
    request.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status >= 200 && this.status < 400) {
                var data = this.responseText;
                data = JSON.parse(data);
                if(data.properties.length != 0){
                    this.callback = callback || function() {
                    };
                    this.callback(data.properties[0]);
                }else{
                    console.log("Word not found in the database")
                }
            }
        }
    }
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send("word=" + word);
    request = null;
}

// Récupère les rimes d'un mot à l'aide de ses propriétés et exécute le callback avec le tableau de rimes obtenu si besoin
function getRimesQuery(wordProp, gender, callback) {
    var word = wordProp.word, phon = wordProp.phon, feminine = wordProp.feminine;
    //Longest common suffix (phonetic and word)
    function lcs(word, rhyme) {
        var i = 0;
        while (word.substring(word.length, word.length - i) == rhyme.substring(rhyme.length, rhyme.length - i)) {
            i++;
            if (i > word.length || i > rhyme.length) {
                break;
            }
        }
        return (i - 1);
    }

     // Fonction pour classer les rimes en fonction de leur propriétés phon_rhyme, puis word_rhyme, puis freq
   function sortRhymes(rhymes, phl, wdl) {
        rhymes.sort(function(a,b){return a.key.phon_rhyme - b.key.phon_rhyme});
        var rhymesArr = [];
        for(var i = phl; i > -1; i--){
            var tempArr = rhymes.filter(function(e){return e.key.phon_rhyme == -i});
            tempArr.sort(function(a,b){return a.key.word_rhyme - b.key.word_rhyme});
            var sort2 = [];
            for(var j = wdl; j > -1; j--){
                var tempArr2 = tempArr.filter(function(e){return e.key.word_rhyme == -j});
                tempArr2.sort(function(a,b){return a.key.freq - b.key.freq});
                sort2 = sort2.concat(tempArr2);
            }
            rhymesArr = rhymesArr.concat(sort2);
        }
        return rhymesArr;
    }

    // Fonction pour parse l'origine des mots
    function parseOrig(wordProp) {
        var orig = wordProp.orig.split(","), result = [];
        for (var i = 0; i < orig.length; i++) {
            result[i] = orig[i].split("|")[0];
        }
        return result;
    }

    var request, json = {phon_end: wordProp.phon_end, word_end: wordProp.word_end, min_nsyl: wordProp.min_nsyl, max_nsyl: wordProp.max_nsyl, elidable: wordProp.elidable};
    request = new XMLHttpRequest;
    request.open('POST', '../../getRimes.php', true);
    request.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status >= 200 && this.status < 400) {
                var data = this.responseText;
                data = JSON.parse(data);
                var rhymes = data.rimes, k;
                for (k = 0; k < rhymes.length; k++) {
                    if((!gender || feminine == rhymes[k].feminine) && (word != rhymes[k].word)){
                        var word_rhyme = lcs(word, rhymes[k].word),
                                phon_rhyme = lcs(phon, rhymes[k].phon);
                        rhymes[k].key = {phon_rhyme: -phon_rhyme, word_rhyme: -word_rhyme, freq: -rhymes[k].freq, word: rhymes[k].word};
                        rhymes[k].orig = parseOrig(rhymes[k]);
                    }else{
                        rhymes.splice(k,1);
                        k--;
                    }
                }
                var orig = parseOrig(wordProp);
                rhymes = sortRhymes(rhymes, phon.length, word.length);
                rhymes.keys = {word: word, phon: phon, orig: orig};
                rhymes.push(wordProp);
                this.callback = callback || function() {
                };
                this.callback(rhymes);
            }
        }
    }
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send('phon_end=' + wordProp.phon_end + '&word_end=' + wordProp.word_end + '&min_nsyl=' + wordProp.min_nsyl + '&max_nsyl=' + wordProp.max_nsyl + '&elidable=' + wordProp.elidable);
    request = null;
}

// Get Poem from Wikisource
function getPoem(poemUrl) {
    var poemDIV = document.getElementById("poem"), request;
    if (poemUrl.indexOf("fr.wikisource.org/wiki/") < 0) {
        poemDIV.innerHTML = "<br>";
        document.getElementById("meta").innerHTML = "Veuillez entrer une adresse Wikisource valide.<br>";
    } else {
        request = new XMLHttpRequest;
        request.open('POST', '../../getPoem.php', true);
        document.body.style.cursor = "wait";
        request.onreadystatechange = function() {
            document.body.style.cursor = "default";
            if (this.readyState === 4) {
                if (this.status >= 200 && this.status < 400) {
                    var data = this.responseText;
                    data = data.replace(/Warning([^;]*){/, '{');
                    if (data == "Erreur") {
                        poemDIV.innerHTML = "<br>";
                        document.getElementById("meta").innerHTML = "Erreur lors de la récupération du poème. Réessayer.<br>";
                    } else {
                        data = JSON.parse(data);
                        data.poeme = data.poeme.replace(/###/g, '\n');
                        data.poeme = data.poeme.replace(/\[[^;]*]/g, "");
                        data.titre = data.titre.replace(/\//g, " - ");
                        parsePoemToHTML(data.poeme, poemDIV);
                        document.getElementById("meta").innerHTML = '<h1><a href="' + data.url + '">' + data.titre + '</a></h1><em> de ' + data.auteur + '</em><br>';
                        if (document.body.addEventListener) {
                            document.body.addEventListener('click', rimifyBinder, false);
                        }
                        else {
                            document.body.attachEvent('onclick', rimifyBinder); //pour IE
                        }
                    }
                } else {
                    poemDIV.innerHTML = "<br>";
                    document.getElementById("meta").innerHTML = "Erreur lors de la récupération du poème. Réessayer.<br>";
                }
            }
        }
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send("poemUrl=" + poemUrl);
        request = null;
    }
}

function getPoemText(poemText) {
    var poemDIV = document.getElementById("poem");
    document.getElementById("meta").innerHTML = '';
    parsePoemToHTML(poemText, poemDIV);
    if (document.body.addEventListener) {
        document.body.addEventListener('click', rimifyBinder, false);
    }
    else {
        document.body.attachEvent('onclick', rimifyBinder); //pour IE
    }
}

window.onload = function() {
    var poemsUrl = ['http://fr.wikisource.org/wiki/Les_Fleurs_du_mal/1861/L%E2%80%99Albatros',
     'http://fr.wikisource.org/wiki/El_Desdichado', 
     'http://fr.wikisource.org/wiki/Po%C3%A8mes_saturniens/Mon_r%C3%AAve_familier', 
     'http://fr.wikisource.org/wiki/Le_Pont_Mirabeau', 
     'http://fr.wikisource.org/wiki/Le_Dormeur_du_val', 
     'http://fr.wikisource.org/wiki/%C2%AB_Demain,_d%C3%A8s_l%E2%80%99aube,_%C3%A0_l%E2%80%99heure_o%C3%B9_blanchit_la_campagne_%C2%BB', 
     'http://fr.wikisource.org/wiki/%C2%AB_Mignonne,_allons_voir_si_la_rose_%C2%BB', 
     'http://fr.wikisource.org/wiki/Nuit_rh%C3%A9nane', 
     'http://fr.wikisource.org/wiki/Ballade_des_pendus', 
     'http://fr.wikisource.org/wiki/Le_Bateau_ivre/%C3%89dition_Vanier_1895', 
     'http://fr.wikisource.org/wiki/Vers_dor%C3%A9s_(Nerval)',
     'http://fr.wikisource.org/wiki/%C2%AB_Quand_vous_serez_bien_vieille,_au_soir,_%C3%A0_la_chandelle_%C2%BB'];
    var poemUrl = poemsUrl[Math.floor(Math.random() * poemsUrl.length)];
    getPoem(poemUrl);
};

// Variable globale des rimes chargées
window.motsArray = [];

// Parse les mots et vers, vérifie le chargement des rimes et appelle le traitement des rimes
function rimifyBinder(e)
{
    e = e || window.event;
    var target = e.target || e.srcElement;
    if (target.className == "mot1")
    {
        document.body.style.cursor = "progress";
        var mot = e.target.innerHTML.replace('<span class="mot1">', '').replace('</span>', '');
        var vers = e.target.parentNode.innerHTML;
        vers = unparsePoemFromHTML(vers);
        mot = mot.split(/[\.,…\/#!$%\^&\*;\?:{}=\_`~()]/g)[0];// Si il y a de la ponctuation on la coupe du mot
        var premot = undefined;
        if (mot.indexOf("’") > -1) {
            premot = mot.split("’")[0];
            mot = mot.split("’")[1];
        }
        mot = mot.toLowerCase();
        vers = vers.toLowerCase();
        var rimes, k = 0, isFem;
        for (var i = 0; i < window.motsArray.length; i++) { // Vérifier si les rimes du mot ne sont pas déjà chargées
            if (window.motsArray[i].rimes.indexOf(mot) > -1) {
                rimes = window.motsArray[i].rimes;
                k = window.motsArray[i].rimes.indexOf(mot);
                isFem = window.motsArray[i].isFem;
                k++;
                if (k == rimes.length) {
                    k = 0;
                }
                i = window.motsArray.length;
            }
        }
        if (rimes == null) { // Si les rimes n'ont pas été chargées, on les charge et on les traite
            rimify(mot, true, function(rimesObj) {
                traitementRimes(k, vers, mot, rimesObj.rimes, e.target, premot, rimesObj.isFem, true);
            });
        } else { // Sinon on les traite
            traitementRimes(k, vers, mot, rimes, e.target, premot, isFem, false);
        }
    }
}

// Pour le mot donné, cherche la première rime appropriée, puis remplace dans le poème et actualise le tableau des rimes chargées
function traitementRimes(k, vers, mot, rimes, node, premot, isFem, isNew) {
    var index = k, position;
    if (premot !== undefined) {
        position = vers.indexOf(premot);
    } else {
        position = vers.indexOf(mot);
    }
    var metrique = metrify(vers), metriqueRime, versRime, premotRime;
    do {
        if (premot !== undefined) {
            premotRime = genrifyPremot(premot, rimes[k % rimes.length], isFem);
            versRime = vers.replaceBetween(position, position + (premot + mot).length + 1, premotRime + rimes[k % rimes.length]);
        } else {
            versRime = vers.replaceBetween(position, position + mot.length, rimes[k % rimes.length]);
        }
        metriqueRime = metrify(versRime);
        if (metriqueRime.nbsyllabes[0].nb == metrique.nbsyllabes[0].nb && metriqueRime.nbsyllabes[0].max == metrique.nbsyllabes[0].max && mot != rimes[k % rimes.length]) {
            if (isNew) {
                if (rimes.indexOf(mot) < 0) {
                    rimes = rimes.concat(mot);
                }
                window.motsArray = window.motsArray.concat({rime: rimes[k % rimes.length], rimes: rimes, index: k % rimes.length, isFem: isFem});
            } else {
                for (var i = 0; i < window.motsArray.length; i++) {
                    if (window.motsArray[i].rimes.indexOf(mot) > -1) {
                        window.motsArray[i].rime = rimes[k % rimes.length];
                        window.motsArray[i].index = k % rimes.length;
                    }
                }
            }
            if (premot !== undefined) {
                if (vers.charAt(position - 2) == '.' || vers.charAt(position - 2) == '!' || vers.charAt(position - 2) == '?' || vers.charAt(position - 2) == '…') {
                    premot = premot.charAt(0).toUpperCase() + premot.slice(1);
                }
                node.innerHTML = node.innerHTML.toLowerCase().replace(premot + "'", premotRime);
                node.innerHTML = node.innerHTML.toLowerCase().replace(mot, rimes[k % rimes.length]);
            } else {
                var rime = rimes[k % rimes.length];
                if (vers.charAt(position - 2) == '.' || vers.charAt(position - 2) == '!' || vers.charAt(position - 2) == '?' || vers.charAt(position - 2) == '…') {
                    rime = rimes[k % rimes.length].charAt(0).toUpperCase() + rimes[k % rimes.length].slice(1);
                }
                node.innerHTML = node.innerHTML.toLowerCase().replace(mot, rime);
            }
            var poeme = node.parentNode.parentNode.innerHTML;
            poeme = unparsePoemFromHTML(poeme);
            parsePoemToHTML(poeme, node.parentNode.parentNode);
            k = index + rimes.length;
        } else {
            k++;
        }
    } while (k % rimes.length != index)
    document.body.style.cursor = "default";
    return window.motsArray;
}

// Adapte le premot au genre du nouveau mot qui le suit (la nouvelle rime)
function genrifyPremot(premot, rime, isFem) {
    var elision = ['a', 'A', 'á', 'Á', 'à', 'À', 'â', 'Â', 'e', 'E', 'é', 'É', 'è', 'È', 'ê', 'Ê', 'í', 'Í', 'o', 'ó', 'O', 'Ó', 'ô', 'Ô', 'ú', 'Ú', 'i', 'I', 'u', 'U', 'ü', 'Ü', 'û', 'Û', 'ï', 'Ï', 'î', 'Î', 'h', 'H'];
    if (elision.indexOf(rime.charAt(0)) > -1) {
        return premot + "'";
    }
    if (premot.toLowerCase() == "d") {
        if (isFem) {
            return premot + "e la ";
        } else {
            return premot + "u ";
        }
    }
    if (premot.toLowerCase() == "l") {
        if (isFem) {
            return premot + "a ";
        } else {
            return premot + "e ";
        }
    }
    if (premot.toLowerCase() == "j" || premot.toLowerCase() == "n" || premot.toLowerCase() == "m" || premot.toLowerCase() == "s") {
        return premot + "e ";
    }
    if (premot.toLowerCase() == "t") {
        return premot + "u ";
    }
    if (premot.toLowerCase() == "c") {
        return premot + "ela ";
    }
    return premot + "'";
}

function parsePoemToHTML(poeme, poemDIV) {
    var poem = '';
    poeme.split(/\r\n|\r|\n/g).forEach(function(vers) {
        vers = vers.charAt(0).toUpperCase() + vers.slice(1);
        poem += vers + '\n';
    });
    poem = poem.slice(0, -1);
    poem = poem.replace(/[^\S\n]/g, '</span> <span class="mot1">');
    poem = poem.replace(/\r\n|\r|\n/g, '</span></span><br><span class="vers"><span class="mot1">');
    poem = '<span class="vers"><span class="mot1">' + poem + '</span></span>';
    poemDIV.innerHTML = poem;
    poemDIV.innerHTML = poemDIV.innerHTML.replace(new RegExp(escapeRegExp('<span class="vers"><span class="mot1"></span></span>'), 'g'), "");
}

function unparsePoemFromHTML(poeme) {
    poeme = replaceAll('<span class="mot1">', '', poeme);
    poeme = replaceAll('</span>', '', poeme);
    poeme = replaceAll('<br>', '\n', poeme);
    poeme = replaceAll('<span class="vers">', '', poeme);
    return poeme;
}

// Parse correctement un string en RegExp
function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
// Replace toutes les occurrences dans un string
function replaceAll(find, replace, str) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

// Remplace une partie d'un string dont la position est définie par les indices
String.prototype.replaceBetween = function(start, end, replace) {
    return this.substring(0, start) + replace + this.substring(end);
};