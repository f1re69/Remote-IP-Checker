import { exec } from "child_process";
import axios from "axios";
import cheerio from "cheerio";

// Exécute la commande netstat et récupère les données
exec("netstat -an", (error, stdout, stderr) => {
  if (error) {
    console.error(`Erreur lors de l'exécution de la commande : ${error}`);
    return;
  }

  // Sépare les lignes de la sortie
  const lines = stdout.split("\n");

  // Extrait les adresses IP de la colonne "Adresse distante"
  const ips = lines
    .filter((line) => /\d+\.\d+\.\d+\.\d+:\d+/.test(line)) // Cherche les adresses IP et les ports
    .map((line) => {
      const parts = line.trim().split(/\s+/);
      const remoteAddress = parts[2]; // Selon l'exemple, l'indice de "Adresse distante" est 2
      return remoteAddress ? remoteAddress.split(":")[0] : null;
    })
    .filter(Boolean);

  // Supprime les doublons
  const uniqueIps = [...new Set(ips)];
  console.log("uniqueIps : ", uniqueIps);

  // Effectue une requête HTTP pour chaque adresse IP unique
  uniqueIps.forEach((ip) => {
    axios
      .get(`https://scamalytics.com/ip/${ip}`)
      .then((response) => {
        // Utilise Cheerio pour analyser le HTML
        const $ = cheerio.load(response.data);
        const fraudScore = $(".score").text().split(": ")[1];

        console.log(`Adresse IP: ${ip} | Fraude score: ${fraudScore}`);
      })
      .catch((error) => {
        console.log(
          `Erreur lors de la récupération des informations pour l'adresse IP ${ip} : ${error}`
        );
      });
  });
});
