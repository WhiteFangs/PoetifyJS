PoetifyJS
=========

PoetifyJS est une boîte à outils Javascript pour la poésie.
-------

PoetifyJS comprend plusieurs fonctions utiles pour travailler sur des poèmes en français avec Javascript.

Fonctions
----

### Syllabify

**Fonction pour compter le nombre de syllabes d'un mot donné**

  - Renvoie également un tableau contenant les syllabes décomposées
  - Gère les diérèses grâce à une variable donnant un maximum de syllabes possibles

### Elisioner

**Fonction pour appliquer les règles d'élision à un tableau de mots**

  - Gère l'élision du 'h' et l'élision en fin de vers (fin de tableau)
  - Gère l'interdiction d'élision dans le cas de la répétition d'un même son *(ex: "Thésée excusable")*

### Metrify

**Fonction pour compter le nombre de syllabes des vers d'un poème**

  - Parse le poème pour son exploitation efficace
  - Décompose le poème en tableau de vers, puis les vers en tableau de mots
  - Utilise Elisioner pour les règles d'élision dans un vers

### Rimify

**Fonction pour récupérer les rimes possibles d'un mot donné avec diverses contraintes**

  - Les rimes ont le même nombre de syllabes que le mot donné
  - Les rimes ont la même nature que le mot donné
  - Utilise l'API de [drime.a3nm.net] (base de données [Lexique])

### GetRandomPoem

**Fonction pour, comme son nom l'indique, récupérer un poème au hasard sur [Wikisource]**

  - Récupère le texte du poème, le titre, l'auteur et l'URL
  - Utilise PHP et un Wikitool de redirection ["random article"] par [Erwin]

Utilisation
----

**L'ensemble des fonctions Metrify + Elisioner + Syllabify a notamment été testé et validé sur les alexandrins de l'acte I du Phèdre de Racine**
*(en omettant cependant les différences de règles sur les diérèses à l'époque, voir [cette page] pour plus de détails.)*

PoetifyJS sera utilisé dans plusieurs applications à venir sur mon site [Louphole]

PoetifyJS est sous **licence MIT** (cf le fichier LICENCE)

N'hésitez pas à faire des remarques ou contribuer !

[drime.a3nm.net]:http://drime.a3nm.net/
[Lexique]:http://www.lexique.org/
[Wikisource]:http://fr.wikisource.org/
["random article"]: http://toolserver.org/~erwin85/randomarticle.php
[Erwin]: http://meta.wikimedia.org/wiki/User:Erwin
[cette page]: http://fr.wikipedia.org/wiki/Di%C3%A9r%C3%A8se
[Louphole]: http://www.louphole.com
    