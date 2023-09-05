# Netstat IP Checker

Ce projet est un script Node.js qui exécute la commande `netstat` pour récupérer les adresses IP actuellement connectées à votre machine. Ensuite, il utilise le service Scamalytics pour vérifier le score de fraude associé à chaque adresse IP.

## Objectif du Script

L'objectif principal de ce script est d'aider à détecter la présence éventuelle de backdoors sur votre ordinateur en identifiant les adresses IP étrangères connectées à votre machine. Le script utilise la commande `netstat` pour obtenir la liste des connexions actives et le service Scamalytics pour vérifier le score de fraude associé à chaque adresse IP.

## À partir de quel score s'inquiéter ?

Le score de fraude est fourni par Scamalytics et varie généralement de 0 à 100, 100 étant le score le plus élevé indiquant un risque élevé de fraude. Bien que Scamalytics ne fournisse pas de seuils spécifiques pour s'inquiéter, voici quelques lignes directrices :

- **0-20** : Risque faible. Aucune action spécifique requise.
- **21-50** : Risque modéré. Il peut être judicieux d'enquêter davantage.
- **51-75** : Risque élevé. Une investigation est fortement recommandée.
- **76-100**: Risque très élevé. Une action immédiate est nécessaire.

## Installation

Pour installer les dépendances nécessaires, exécutez :

```bash
npm install axios cheerio child_process
```

## Utilisation

Pour exécuter le script, assurez-vous que Node.js est installé sur votre machine, puis exécutez :

```bash
node script.js
```

## Fonctionnalités

- Exécute la commande `netstat -an` pour récupérer toutes les connexions actives.
- Extrait les adresses IP et les ports de la sortie.
- Supprime les adresses IP en double.
- Effectue une requête HTTP vers le service Scamalytics pour chaque adresse IP unique.
- Utilise Cheerio pour extraire le score de fraude à partir du HTML retourné par Scamalytics.

## Dépendances

- [axios](https://www.npmjs.com/package/axios) : Pour effectuer des requêtes HTTP.
- [cheerio](https://www.npmjs.com/package/cheerio) : Pour analyser et manipuler le HTML retourné par Scamalytics.
- [child_process](https://nodejs.org/api/child_process.html) : Pour exécuter des commandes système.

## Limitations

- Ce script ne fonctionne que sur des systèmes où la commande `netstat` est disponible.
- La fiabilité des scores de fraude dépend du service Scamalytics.

