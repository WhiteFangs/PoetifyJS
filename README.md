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

  - Gère l'élision en fin de vers (fin de tableau) 
  - Gère l'élision du 'h' // A revoir et à améliorer

### Metrify

**Fonction pour compter le nombre de syllabes des vers d'un poème**

  - Parse le poème pour son exploitation efficace
  - Décompose le poème en tableau de vers, puis les vers en tableau de mots
  - Utilise Elisioner pour les règles d'élision dans un vers

### Rimify

**Fonction pour récupérer les rimes possibles d'un mot donné avec diverses contraintes**

  - Les rimes ont le même nombre de syllabes que le mot donné
  - Les rimes ont la même nature que le mot donné
  - Peut filtrer les rimes selon le genre du mot donné

### GetWordQuery

**Fonction exécutant une requête vers la base de données pour un mot**

  - Peut exécuter un callback avec les propriétés du mot récupérées

### GetRimesQuery

**Fonction exécutant une requête vers la base de données pour les rimes d'un mot donné**

  - Peut exécuter un callback avec le tableau de rimes obtenu
  - Peut filtrer les rimes selon le genre du mot donné
  - Classe les rimes selon l'ordre suivant: similarité phonétique, similarité graphique, fréquence

### GetPoem

**Fonction pour, comme son nom l'indique, récupérer un poème sur [Wikisource]**

  - Récupère le texte du poème, le titre, l'auteur et l'URL
  - Utilise PHP et gère la majorité des formats de pages de poèmes

Utilisation
----

### Base de données

La base de données utilisée a été générée séparément à partir de l'application Drime ([drime.a3nm.net] basée sur [Lexique]).
**Le fichier drime.sql (~8 Mo) est fourni pour être importée directement.**
La base ne contient pas de noms propres, le résultat d'une requête GetWordQuery est donc nul pour celle-ci, à la différence de l'application Drime qui est capable de déterminer la prononciation de mots inconnus.
Cette fonctionnalité pourra éventuellement être implémentée ultérieurement.


PoetifyJS sera utilisé dans plusieurs applications à venir sur mon site [Louphole]

PoetifyJS est sous **licence MIT** (cf le fichier LICENCE)

N'hésitez pas à faire des remarques ou contribuer !

Exemples
-----

### Panoryma

**Panoryma est une application qui permet de modifier les mots d’un poème en les remplaçant par des paronymes, c’est-à-dire des mots à la sonorité proche, presque homonymes.**
En quelques clics, un poème peut donc radicalement changer de sens tout en restant étrangement familier.

  - Utilise toutes les fonctions de la boîte à outils PoetifyJS
  - L’algorithme recherche les rimes du mot choisi et conserve la métrique

**[Tester Panoryma]**

[Wikisource]:http://fr.wikisource.org/
[drime.a3nm.net]:http://drime.a3nm.net/
[Lexique]:http://www.lexique.org/
[Louphole]: http://www.louphole.com
[Tester Panoryma]: http://www.louphole.com/applications/panoryma    