var poet = new poetify("../../");

window.onload = function() {
  var poemsUrl = ['http://fr.wikisource.org/wiki/Les_Fleurs_du_mal/1861/L%E2%80%99Albatros',
  'http://fr.wikisource.org/wiki/El_Desdichado',
  'http://fr.wikisource.org/wiki/Po%C3%A8mes_saturniens/Mon_r%C3%AAve_familier',
  'http://fr.wikisource.org/wiki/Le_Pont_Mirabeau',
  'https://fr.wikisource.org/wiki/Po%C3%A9sies_(Rimbaud)/%C3%A9d._Vanier,_1895/Le_Dormeur_du_val',
  'http://fr.wikisource.org/wiki/%C2%AB_Demain,_d%C3%A8s_l%E2%80%99aube,_%C3%A0_l%E2%80%99heure_o%C3%B9_blanchit_la_campagne_%C2%BB',
  'http://fr.wikisource.org/wiki/%C2%AB_Mignonne,_allons_voir_si_la_rose_%C2%BB',
  'http://fr.wikisource.org/wiki/Nuit_rh%C3%A9nane',
  'http://fr.wikisource.org/wiki/Le_Bateau_ivre/%C3%89dition_Vanier_1895',
  'http://fr.wikisource.org/wiki/Vers_dor%C3%A9s_(Nerval)',
  'http://fr.wikisource.org/wiki/%C2%AB_Quand_vous_serez_bien_vieille,_au_soir,_%C3%A0_la_chandelle_%C2%BB'];
  var poemUrl = poemsUrl[Math.floor(Math.random() * poemsUrl.length)];
  poet.motsArray = []; // Variable globale des rimes chargées
  getPanorymaPoem(poemUrl);
};

function autoRandomizer(counter){
  document.getElementById("autoRandomizer").value = "Transformation en cours...";
  document.getElementById("autoRandomizer").disabled = true;
  var mots = document.getElementsByClassName("mot1");
  mots = [].slice.call(mots);
  mots = mots.filter(function (a) {return a.innerText.length > 4;});
  if(counter < mots.length && counter < 80){
    mots[counter].click();
    var currentMotsArray = poet.motsArray;
    waiter(currentMotsArray, counter, 0);
  }else{
    document.getElementById("autoRandomizer").value = "Je suis paresseux, je préfère qu'un automate clique partout pour moi !";
    document.getElementById("autoRandomizer").disabled = false;
    poet.charged = true;
  }
}

function waiter(currentMotsArray, counter, looping){
  if(poet.charged !== true && poet.motsArray.equals(currentMotsArray) && looping < 10){
    setTimeout(function (){waiter(currentMotsArray, counter, ++looping);}, 50);
  }else{
    autoRandomizer(++counter);
  }
}

Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
};

function getPanorymaPoem(poemUrl){
  poet.getPoem(poemUrl);
  if (document.body.addEventListener) {
    document.body.addEventListener('click', rimifyBinder, false);
  }
  else {
    document.body.attachEvent('onclick', rimifyBinder); //pour IE
  }
}

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
    vers = poet.unparsePoemFromHTML(vers);
    mot = mot.split(/[\.,…\/#!$%\^&\*;\?:{}=\_`~()]/g)[0];// Si il y a de la ponctuation on la coupe du mot
    var premot;
    if (mot.indexOf("’") > -1) {
      premot = mot.split("’")[0];
      mot = mot.split("’")[1];
    }
    var capitalize = mot.charAt(0) === mot.charAt(0).toUpperCase();
    mot = mot.toLowerCase();
    vers = vers.toLowerCase();
    var rimes, k = 0, isFem;
    for (var i = 0; i < poet.motsArray.length; i++) { // Vérifier si les rimes du mot ne sont pas déjà chargées
      if (poet.motsArray[i].rimes.indexOf(mot) > -1) {
        rimes = poet.motsArray[i].rimes;
        k = poet.motsArray[i].rimes.indexOf(mot);
        isFem = poet.motsArray[i].isFem;
        k++;
        if (k == rimes.length) {
          k = 0;
        }
        i = poet.motsArray.length;
      }
    }
    if (rimes === undefined) { // Si les rimes n'ont pas été chargées, on les charge et on les traite
    poet.rimify(mot, true, function(rimesObj) {
      if (rimesObj.rimes.length !== 0) {
        traitementRimes(k, vers, mot, rimesObj.rimes, e.target, premot, rimesObj.isFem, true, capitalize);
      }else{
        document.body.style.cursor = "default";
        poet.motsArray = poet.motsArray.concat({rime: mot, rimes: [mot], index: 0, isFem: false});
        return false;
      }
    }, function(){
      document.body.style.cursor = "default";
    });
  } else { // Sinon on les traite
    traitementRimes(k, vers, mot, rimes, e.target, premot, isFem, false, capitalize);
  }
}
}

// Pour le mot donné, cherche la première rime appropriée, puis remplace dans le poème et actualise le tableau des rimes chargées
function traitementRimes(k, vers, mot, rimes, node, premot, isFem, isNew, isCapitalized) {
  var index = k, position;
  if (premot !== undefined) {
    position = vers.indexOf(premot + "’" + mot);
  } else {
    position = vers.indexOf(mot);
  }
  var metrique = poet.metrify(vers), metriqueRime, versRime, premotRime;
  do {
    if (premot !== undefined) {
      premotRime = genrifyPremot(premot, rimes[k % rimes.length], isFem);
      versRime = vers.replaceBetween(position, position + (premot + mot).length + 1, premotRime + rimes[k % rimes.length]);
    } else {
      versRime = vers.replaceBetween(position, position + mot.length, rimes[k % rimes.length]);
    }
    metriqueRime = poet.metrify(versRime);
    if (metriqueRime.nbsyllabes[0].nb == metrique.nbsyllabes[0].nb && metriqueRime.nbsyllabes[0].max == metrique.nbsyllabes[0].max && mot != rimes[k % rimes.length]) {
      if (isNew) {
        if (rimes.indexOf(mot) < 0) {
          rimes = rimes.concat(mot);
        }
        poet.motsArray = poet.motsArray.concat({rime: rimes[k % rimes.length], rimes: rimes, index: k % rimes.length, isFem: isFem});
      } else {
        for (var i = 0; i < poet.motsArray.length; i++) {
          if (poet.motsArray[i].rimes.indexOf(mot) > -1) {
            poet.motsArray[i].rime = rimes[k % rimes.length];
            poet.motsArray[i].index = k % rimes.length;
          }
        }
      }
      var rime = rimes[k % rimes.length];
      if (premot !== undefined) {
        if (vers.charAt(position - 2) == '.' || vers.charAt(position - 2) == '!' || vers.charAt(position - 2) == '?' || vers.charAt(position - 2) == '…') {
          premot = premot.charAt(0).toUpperCase() + premot.slice(1);
        }
        node.innerHTML = node.innerHTML.toLowerCase().replace(premot + "'", premotRime);
      } else if (vers.charAt(position - 2) == '.' || vers.charAt(position - 2) == '!' || vers.charAt(position - 2) == '?' || vers.charAt(position - 2) == '…') {
        rime = rimes[k % rimes.length].charAt(0).toUpperCase() + rimes[k % rimes.length].slice(1);
      }
      node.innerHTML = node.innerHTML.toLowerCase().replace(mot, isCapitalized ? rime.capitalizeFirstLetter() : rime);
      var poeme = node.parentNode.parentNode.innerHTML;
      poeme = poet.unparsePoemFromHTML(poeme);
      poet.parsePoemToHTML(poeme, node.parentNode.parentNode);
      k = index + rimes.length;
    } else {
      k++;
    }
  } while (k % rimes.length != index);
  document.body.style.cursor = "default";
  return poet.motsArray;
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

function getPoemText(poemText) {
  var poemDIV = document.getElementById("poem");
  document.getElementById("meta").innerHTML = '';
  poet.parsePoemToHTML(poemText, poemDIV);
  if (document.body.addEventListener) {
    document.body.addEventListener('click', rimifyBinder, false);
  }
  else {
    document.body.attachEvent('onclick', rimifyBinder); //pour IE
  }
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

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
