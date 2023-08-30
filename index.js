/* Création du WebSocket côté serveur avec le module websocket */
/* Source et installation NPM : https://github.com/theturtle32/WebSocket-Node */

/* Création du serveur web HTTP, nécessaire pour le socket */

const port=8080;
const hostname = "127.0.0.1";
const http = require("http");
const server = http.createServer(function(requete, result) {
  log(requete.method+ " " + requete.url, "cyan");
  /* Le serveur HTTP retourne toujours la même réponse */
  result.statusCode=200;
  result.setHeader("Content-Type", "text/html");
  result.end("Serveur WebSocket. Voir <a href=\"http://tjs.ovh/websocket\">tjs.ovh/websocket</a> !");
});
server.listen(port, hostname, function() {
  log("Serveur à l'écoute sur http://"+hostname+":"+port, "green");
});

/* Partie WebSocket qui s'appuie sur le serveur HTTP */
var WebSocketServer = require("websocket").server;
wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
});

/* Fonction de contrôle d'accès en fonction de l'origine */
function originIsAllowed(origin) {
  return true;  /* Toujours true en mode développement */
}

/* Définition du comportement du serveur WebSocket */
var connections=[]; /* Tableau de toutes les connexions actives */
wsServer.on("request", function(request) {
  if (!originIsAllowed(request.origin)) { 
    request.reject();
    log("Connexion depuis IP " + request.origin + " refusée", "red");
    return;
  }
  
  var connection = request.accept("echo-protocol", request.origin);
  connection.pseudo="";
  connections.push(connection); /* Ajout à la liste des connexions */
  log("Nouvelle connection #"+(connections.length)+ " depuis IP "+getIPV4(connection.remoteAddress), "green", "("+connections.length+" connexion(s) au total)", "cyan");
  
  connection.on("message", function(message) {
    if (message.type === "utf8") {
      var m=message.utf8Data;
      log("Message reçu :", "green", m, "black");
      try {
        var msg=JSON.parse(m);
        if (msg.message=="Hello Serveur") {
          connection.sendUTF(encodeMessage("", "Hello Client"));
        } else if (msg.message.substring(0, 7)=="PSEUDO=") {
	      /* Enregistrer le nouveau pseudo */  
          var pseudo=msg.message.substring(7);
          connection.sendUTF(encodeMessage("", "Votre pseudo est "+pseudo));
          connection.pseudo=pseudo;
          /* Envoyer à tous les autres la notification nouvelle connexion  */
          for (var i=0; i<connections.length; i++) {
            if (connections[i].pseudo!=connection.pseudo) {
              connections[i].sendUTF(encodeMessage("Serveur", pseudo+" vient de se connecter"));
            }
          }
        } else {
	      /* Message de conversation à faire suivre */
          connection.sendUTF(encodeMessage("", "Message reçu et transféré aux autres clients"));
          for (var i=0; i<connections.length; i++) {
            connections[i].sendUTF(encodeMessage(msg.auteur, msg.message));
          }
        }
      } catch (err) {
        log("Erreur de formatage dans message reçu", "red");
      }
    }
  });
  
  connection.on("close", function(reasonCode, description) {
    var indice=connections.indexOf(connection); /* Recherche de l'indice de la connexion */
    connections.splice(indice, 1);  /* Suppression de la liste des connexions */
    log("Fermeture connexion #"+(indice+1)+" depuis IP " + getIPV4(connection.remoteAddress), "red", "("+connections.length+" connexion(s) au total)", "cyan");
  });
});


/* Formatage d'un message avant envoi */
function encodeMessage(auteur, texte) {
  return JSON.stringify({auteur: auteur, message: texte});
}

/* Fonction qui retourne la date formatée pour l'affichage dans la log */
function now() {
  var dt=new Date();
  var intl=new Intl.DateTimeFormat("fr",  {hour12: false, hour: "2-digit", minute: "2-digit", second:"2-digit", day:"2-digit", month:"2-digit", year:"numeric"});
  return intl.format(dt);
}

/* Fonction de conversion IPV6 en IPV4 */
function getIPV4(ipv6) {
  return ipv6.replace("::ffff:","");
}

/* Fonction de log Node.js colorisée */
/* Affiche dans la console la date+heure suivi de txt en color et txt2 en color2 */
function log(txt, color="black", txt2="", color2="") {
  if (color=="red") {
    color="\x1b[31m";
  } else if (color=="green") {
    color="\x1b[32m";
  } else if (color=="cyan") {
    color="\x1b[36m";
  } else {
    color="\x1b[30m";
  }
  if (color2=="red") {
    color2="\x1b[31m";
  } else if (color=="green") {
    color2="\x1b[32m";
  } else if (color2=="cyan") {
    color2="\x1b[36m";
  } else {
    color2="\x1b[30m";
  }
  console.log("\x1b[36m%s \x1b[0m"+color+"%s\x1b[0m "+color2+"%s\x1b[0m", now(), txt, txt2);
}