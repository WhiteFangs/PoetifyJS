
// Comptage et découpage d'un mot en syllabes avec les possibilités de diérèses gérées par la variable max
function syllabify(s) {
    if (s.toLowerCase() == "pays") { // Exception pour ce mot ingérable autrement
        return ({syllabes: ["pa", "ys"], nb: 2, max: 2});
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
                } else if ((['t', 'T', 'p', 'P', 'd', 'D'].indexOf(s.charAt(i + 1)) > -1) && (['s', 'S'].indexOf(s.charAt(i + 2)) > -1)) { // pour des mots comme "verts" ou "corps"
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
    s = s.replace(/[\.,\/#!$%\^&\*;\?:{}=\_`~()]/g, ""); // retire la ponctuation
    s = s.replace(/[0-9]/g, ''); // retire les nombres
    s = s.replace(/\s{2,}/g, " "); // retire les doubles espaces
    s = s.replace(/œ/g, "oe");
    s = s.replace(/æ/g, "ae");
    s = s.replace(/\r\n|\r|\n/g, "<br>");
    var vers = s.split("<br>"); // range chaque vers dans un tableau
    vers = vers.filter(function(v) { // retire les strings vides
        return v !== ''
    });
    var mots = [];
    var nbsyllabes = [];

    for (var i = 0; i < vers.length; i++) {
        var lesmots = vers[i].split(" "); // Sépare les mots de chaque vers
        lesmots = lesmots.filter(function(v) { // retire les strings vides
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
function rimify(s) {
    var syllabes = syllabify(s), request;

    // Parse la nature de la rime et compare à celle du mot
    function natureEquals(rime, nature) {
        var natureRime = rime.orig.replace(/ *\([^)]*\) */g, "").split(", ");
        nature = nature.replace(/ *\([^)]*\) */g, "").split(", ");
        for (var i = 0; i < natureRime.length; i++) {
            if (nature.indexOf(natureRime[i]) > -1) {
                return true;
            }
        }
        return false;
    }

    // Callback de la requête JSONP
    var callback = function(response) {
        var data = response.query.results.json;
        var rimesArray = [];
        var rime, syllabesRime;
        if (data.result != null) {
            for (var k = 0; k < data.result.length; k++) {
                rime = data.result[k].word;
                syllabesRime = syllabify(rime); // Compte le nombre de syllabes de la rime trouvée
                if (syllabesRime.nb == syllabes.nb && syllabesRime.max == syllabes.max && natureEquals(data.result[k], data.keys.json[2])) { // Teste nbsyllabes, nbmax et la nature
                    rimesArray.push(rime);
                }
            }
        }
        console.log(rimesArray);
        return rimesArray;
    };

    // Instantiation de la requête JSONP
    var query = "select * from json where url =\"http://drime.a3nm.net/query?query=" + s + "&nsyl=&json=on\" ";
    var getRimes = new YQLQuery(query, callback);
    getRimes.fetch();
}

// Get Random Poem from Wikisource
function getRandomPoem() {
    var poemDIV = document.getElementById("poem"), request;
    poemDIV.innerHTML = '<img src="./loader.gif" alt="Loading" />';
    request = new XMLHttpRequest;
    request.open('GET', './getRandomPoem.php', true);
    request.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status >= 200 && this.status < 400) {
                var data = this.responseText;
                data = JSON.parse(data);
                console.log(data); // Json du poeme avec : poeme, auteur, titre et url
                var poeme = data.poeme.replace(/[^\S\n]/g, '</span> <span class="mot1">');
                poeme = poeme.replace(/\r\n|\r|\n/g, '</span></span><br><span class="vers"><span class="mot1">'); // replace les sauts de ligne
                poeme = '<span class="vers"><span class="mot1">' + poeme + '</span></span>';
                document.getElementById("meta").innerHTML = '<h1><a href="' + data.url + '">' + data.titre + '</a></h1><br> de ' + data.auteur + '<br><br>';
                poemDIV.innerHTML = poeme;
                poemDIV.innerHTML = poemDIV.innerHTML.replace(new RegExp(escapeRegExp('<span class="vers"><span class="mot1"></span></span>'), 'g'), "");
                if (document.body.addEventListener)
                {
                    document.body.addEventListener('click', rimifyBinder, false);
                }
                else
                {
                    document.body.attachEvent('onclick', rimifyBinder); //pour IE
                }
            } else {
                document.getElementById("meta").innerHTML = "Erreur lors de la récupération du poème. Réessayer.<br>";
                poemDIV.innerHTML = '<div id="poem"><button id="getRandomPoem" onclick="getRandomPoem();">Poème au hasard</button></div>';
            }
        }
    }
    request.send();
    request = null;
}

window.motsArray = [];

function rimifyBinder(e)
{
    e = e || window.event;
    var target = e.target || e.srcElement;
    if (target.className == "mot")
    {
        var mot = e.target.innerHTML.replace('<span class="mot1">', '').replace('</span>', '');
        var vers = e.target.parentNode.innerHTML;
        vers = replaceAll('<span class="mot1">', '', vers);
        vers = replaceAll('</span>', '', vers);
        vers = replaceAll('<span class="vers">', '', vers);
        var position = vers.indexOf(mot); // Besoin de l'index du début du mot cliqué dans le cas de répétitions dans un même vers
        mot = mot.split(/[\.,\/#!$%\^&\*;\?:{}=\_`~()]/g)[0];// Si il y a de la ponctuation on la coupe du mot
        var rimes, k = 0;
        for (var i = 0; i < window.motsArray.length; i++) { // Vérifier si les rimes du mot ne sont pas déjà chargées
            if (window.motsArray[i].mot == mot) { // Si le mot est chargé mais pas rimé
                rimes = window.motsArray[i].rimes; // On charge les rimes
                k = 0; // On part de la première pour vérifier la métrique
                i = window.motsArray.length; // On sort de la boucle for et on passe à la suite
            } else if (window.motsArray[i].rimes.indexOf(mot) > -1) { // Si le mot correspond à une rime déjà chargée
                rimes = window.motsArray[i].rimes; // On charge les rimes
                k = window.motsArray[i].index;
                k++; // On part de la rime suivante
                if (k = rimes.length) { // Si c'était la dernière rime
                    if (mot != null) { // Si c'est la première fois qu'on atteint la fin des rimes du mot initial
                        window.motsArray[i].rimes = window.motsArray[i].rimes.unshift(mot); // On ajoute le mot initial aux rimes
                        window.motsArray[i].mot = null; // On indique que le mot initial est dans le tableau de rimes
                    }
                    k = 0; // On revient à la première
                }
                i = window.motsArray.length; // On sort de la boucle for et on passe à la suite
            }
        }
        if (rimes == null) { // Si les rimes n'ont pas été chargées, on les charge
            rimes = rimify(mot);
        }
        var index = k;
        var metrique = metrify(vers), metriqueRime, versRime;
        do {
            versRime = vers.replaceBetween(position, position + mot.length, rimes[k % rimes.length]);
            metriqueRime = metrify(versRime);
            if (metriqueRime.nbsyllabes[0] == metrique.nbsyllabes[0]) { // Stricte égalité, pas de prise en compte des autres cas possibles par sûreté
                e.target.innerHTML.replace(mot, rimes[k % rimes.length]);
                window.motsArray = window.motsArray.concat({mot: mot, rime: rimes[k], rimes: rimes, index: k % rimes.length});
                k = index + rimes.length;
            }
            k++;
        }
        while (k % rimes.length != index) // Tant qu'on revient pas sur la rime initiale du tableau, on continue à le parcourir
    }
}

// Requête JSONP via l'API Yahoo
function YQLQuery(query, callback) {
    this.query = query;
    this.callback = callback || function() {
    };
    this.fetch = function() {

        var scriptEl = document.createElement('script'),
                uid = 'yql' + +new Date(),
                encodedQuery = encodeURIComponent(this.query.toLowerCase()),
                instance = this;

        YQLQuery[uid] = function(json) {
            instance.callback(json);
            delete YQLQuery[uid];
            document.body.removeChild(scriptEl);
        };

        scriptEl.src = 'http://query.yahooapis.com/v1/public/yql?q='
                + encodedQuery + '&format=json&callback=YQLQuery.' + uid;
        document.body.appendChild(scriptEl);
    };
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