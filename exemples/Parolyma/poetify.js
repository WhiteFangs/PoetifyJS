var poetify = function (phpDirectory){

	var self = this;

	// Comptage et découpage d'un mot en syllabes avec les possibilités de diérèses gérées par la variable max
	self.syllabify = function (s) {
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
		var nb, coupure, voy;
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
	voy = s.substring(j, i);
	syllabes.push(voy);
	j = i;
} else if (coupure == 2) { // Couper au caractère suivant
	i++;
	voy = s.substring(j, i);
	syllabes.push(voy);
	j = i;
}
i++;
}
nb = syllabes.length;
if ((j == n) && (nb > 0) && (consonnes.indexOf(s.charAt(n)) > -1)) { //Dernière lettre
	syllabes[nb - 1] = syllabes[nb - 1] + s.charAt(n);
} else {
	voy = s.substring(j, n + 1);
	syllabes.push(voy); // Dernière syllabe
	nb++;
}
return {syllabes: syllabes, nb: nb, max: nb + max};
};

// Prend un tableau de mots en entrée. Pour chaque mot dans le tableau (vers), applique syllabify avec les règles d'élision du e
self.elisioner = function (mots) {
	var voyelles = ['a', 'A', 'á', 'Á', 'à', 'À', 'â', 'Â', 'e', 'E', 'é', 'É', 'è', 'È', 'ê', 'Ê', 'í', 'Í', 'o', 'ó', 'O', 'Ó', 'ô', 'Ô', 'ú', 'Ú', 'i', 'I', 'u', 'U', 'ü', 'Ü', 'û', 'Û', 'ï', 'Ï', 'î', 'Î'];
	var elision = voyelles.concat(['h', 'H']);
	var syllabes, nb = 0, max = 0;

	for (var i = 0; i < mots.length; i++) {
		syllabes = self.syllabify(mots[i]);
		nb += syllabes.nb;
		max += syllabes.max;
		if ((i > 0) &&
		(mots[i - 1].toLowerCase().slice(-1) == 'e') &&
		(elision.indexOf(mots[i].charAt(0)) > -1) &&
		(self.sansAccents(mots[i - 1].toLowerCase().slice(-2, -1)) != self.sansAccents(mots[i].charAt(0)))) { // élision du e de fin dans le mot précédent si liaison (MAIS élision interdite si même son, ex: "Thésée excusable")
		nb--;
		if (['h', 'H'].indexOf(mots[i].charAt(0)) < 0) {
			max--;
		}
	}
	if ((i == mots.length - 1) &&
	(mots[i].toLowerCase().slice(-1) == 'e' || mots[i].toLowerCase().slice(-2) == 'es' || mots[i].toLowerCase().slice(-3) == 'ent')) { // élision du e en fin de vers
		nb--;
		if (!((voyelles.indexOf(mots[i].toLowerCase().slice(-2, -1)) > -1) && (mots[i].toLowerCase().slice(-1) == 'e')) && // Si finit par une voyelle + "e" : l'élision peut-être évitée en appuyant le e (ex: "patrie")
		!((voyelles.indexOf(mots[i].toLowerCase().slice(-3, -2)) > -1) && (mots[i].toLowerCase().slice(-2) == 'es')) &&
		!((voyelles.indexOf(mots[i].toLowerCase().slice(-4, -3)) > -1) && (mots[i].toLowerCase().slice(-3) == 'ent')) &&
		(mots[i].toLowerCase().slice(-4) != 'ment')) { // Si c'est un adverbe, la syllabe finale est obligatoire donc on ne diminue pas max pour prévenir ces cas
		max--;
	}
}
}
return {nb: nb, max: max};
};

// Compte le nombre de syllabes des vers d'un poème en suivant les règles classiques d'élision
self.metrify = function (s) {
	s = s.replace(/[\.,…\/#!$%\^&\*;\?:{}=\_`~()]/g, "").replace(/[0-9]/g, '').replace(/\s{2,}/g, " ").replace(/œ/g, "oe").replace(/æ/g, "ae").replace(/\r\n|\r|\n/g, "<br>");
	var vers = s.split("<br>");
	vers = vers.filter(function(v) {
		return v !== '';
	});
	var mots = [];
	var nbsyllabes = [];

	for (var i = 0; i < vers.length; i++) {
		var lesmots = vers[i].split(" ");
		lesmots = lesmots.filter(function(v) {
			return v !== '';
		});
		mots[i] = lesmots; // range les mots dans un tableau différent pour chaque vers
	}

	// Appliquer elisioner au tableau de mots de chaque vers
	for (var k = 0; k < mots.length; k++) {
		nbsyllabes[k] = self.elisioner(mots[k]);
	}

	return {vers: vers, mots: mots, nbsyllabes: nbsyllabes};
};

// Récupère les rimes d'un mot ayant le même nombre de syllabes et la même nature (Verbe, nom, adjectif...)
self.rimify = function (s, addWord, success, error) {
	var syllabes = self.syllabify(s);
	self.getRimesQuery(s, function(data) {
		if(addWord)
			data.rimes.push(s);
		this.success = success || function(data) {
			console.log(data);
			return data;
		};
		this.success(data);
	}, error);
};

// Récupère les rimes d'un mot à l'aide de ses propriétés et exécute le callback avec le tableau de rimes obtenu si besoin
self.getRimesQuery = function (word, success, error) {
	self.ajaxRequest('POST', 'getRimes.php', 'word=' + word, function(data) {
		data = JSON.parse(data);
		data.isFem = data.isFem == "1";
		this.success = success || function(data) {
			console.log(data);
		};
		this.success(data);
	}, function () {
		this.error = error || function() {
			console.log("An error happened in getRimesQuery");
		};
		this.error();
	});
};


// Get Poem from Wikisource
self.getPoem = function (poemUrl) {
	var poemDIV = document.getElementById("poem"), request;
	if (poemUrl.indexOf("wikisource.org/wiki/") < 0) {
		poemDIV.innerHTML = "<br>";
		document.getElementById("meta").innerHTML = "Veuillez entrer une adresse Wikisource valide.<br>";
	} else {
		document.body.style.cursor = "wait";
		self.ajaxRequest('POST', 'getPoem.php', "poemUrl=" + poemUrl, function(data) {
			document.body.style.cursor = "default";
			data = data.replace(/Warning([^;]*){/, '{');
			if (data == "Erreur") {
				poemDIV.innerHTML = "<br>";
				document.getElementById("meta").innerHTML = "Erreur lors de la récupération du poème. Réessayer.<br>";
			} else {
				data = JSON.parse(data);
				data.poeme = data.poeme.replace(/###/g, '\n');
				data.poeme = data.poeme.replace(/\[[^;]*]/g, "");
				data.poeme = data.poeme.replace("'", "’");
				data.titre = data.titre.replace(/\//g, " - ");
				self.parsePoemToHTML(data.poeme, poemDIV);
				document.getElementById("meta").innerHTML = '<h2><a href="' + data.url + '">' + data.titre + '</a></h2><em> de ' + data.auteur + '</em>';
			}
		}, function () {
			poemDIV.innerHTML = "<br>";
			document.getElementById("meta").innerHTML = "Erreur lors de la récupération du poème. Réessayer.<br>";
		});
	}
};

// Parse la nature de la rime et compare à celle du mot
self.natureEquals = function (natureRime, nature) {
	for (var i = 0; i < natureRime.length; i++) {
		if (nature.indexOf(natureRime[i]) > -1) {
			return true;
		}
	}
	return false;
};

self.sansAccents = function (s) {
	var r = s.toLowerCase();
	r = r.replace(/[àáâãäå]/g, "a");
	r = r.replace(/[èéêë]/g, "e");
	r = r.replace(/[ìíîï]/g, "i");
	r = r.replace(/[òóôõö]/g, "o");
	r = r.replace(/[ùúûü]/g, "u");
	r = r.replace(/[ýÿ]/g, "y");
	return r;
};

self.ajaxRequest = function (method, file, sendContent, success, error){
	var	request = new XMLHttpRequest();
	request.open(method, phpDirectory + file, true);
	request.onreadystatechange = function() {
		if (this.readyState === 4) {
			if (this.status >= 200 && this.status < 400) {
				try{
					var data = this.responseText;
					if(data.length !== 0){
						this.success = success || function(data) {
							console.log(data);
						};
						this.success(data);
					}else{
						console.log("No data returned");
					}
				}catch(e){
					console.log(e);
					console.log("Error in returned data handling");
				}
			}else{
				this.error = error || function() {
					console.log(this);
				};
				this.error(this);
			}
		}
	};
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	request.send(sendContent);
	request = null;
};

self.parsePoemToHTML = function (poeme, poemDIV) {
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
};

self.unparsePoemFromHTML = function(poeme) {
	poeme = replaceAll('<span class="mot1">', '', poeme);
	poeme = replaceAll('</span>', '', poeme);
	poeme = replaceAll('<br>', '\n', poeme);
	poeme = replaceAll('<span class="vers">', '', poeme);
	return poeme;
};

return self;
};
