const targetDate = new Date('September 13, 2024 00:00:00').getTime();

function countdown(){
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerHTML = `<span>${days}</span>jours`;
    document.getElementById('hours').innerHTML = `<span>${hours}</span>heures`;
    document.getElementById('minutes').innerHTML = `<span>${minutes}</span>minutes`;
    document.getElementById('seconds').innerHTML = `<span>${seconds}</span>secondes`;

    if (distance < 0){
        clearInterval(countdownFunction);
        document.querySelector('.countdown').innerText = `Chargement De La Version 0.3 De la librairie Tina_TOOLS...
        le site cera disponible a cette adresse : https://religious-electrode.000webhostapp.com/index.php`;
    }
}


setInterval(countdown, 1000);


document.addEventListener("DOMContentLoaded", function(){
    if (document.cookie.indexOf("popupShown=") === -1){
        var popup = document.getElementById('popup');
        var overlay = document.getElementById('popupOverlay');
        popup.style.display = 'block';
        overlay.style.display = 'block';

        document.getElementById('closePopup').addEventListener('click', function(){
            popup.style.display = 'none';
            overlay.style.display = 'none';
        });


    }
});


function playSound(){
    const audio = new Audio('va.mp3');
    audio.loop = true;
    
    document.addEventListener('click', function(){
        audio.play();
    });
}

playSound();



const canvas = document.getElementById('confettiCanvas');
        const ctx = canvas.getContext('2d');
        const confettiArray = [];
        const emojis = ['❤️', '🔥', '😍', '💜'];

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        class Confetti{
            constructor(){
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height - canvas.height;
                this.size = Math.random() * 30 + 20;
                this.emoji = emojis[Math.floor(Math.random() * emojis.length)];
                this.speed = Math.random() * 3 + 1;
                this.opacity = Math.random();
            }

            update(){
                this.y += this.speed;
                if (this.y > canvas.height){
                    this.y = 0 - this.size;
                    this.x = Math.random() * canvas.width;
                    this.opacity = Math.random();
                }
            }

            draw(){
                ctx.globalAlpha = this.opacity;
                ctx.font = `${this.size}px serif`;
                ctx.fillText(this.emoji, this.x, this.y);
                ctx.globalAlpha = 1;
            }
        }

        function addConfetti(){
            for (let i = 0; i < 30; i++){ 
                confettiArray.push(new Confetti());
            }
        }

        function animate(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            confettiArray.forEach(confetti =>{
                confetti.update();
                confetti.draw();
            });
            requestAnimationFrame(animate);
        }

        addConfetti();
        animate();



/*

Un site web qui meurt est comme une âme solitaire errant dans les méandres du cyberespace : 
autrefois nourri par l'amour passionné des développeurs, ses lignes de code étaient des promesses d'innovation et de connexion.
Mais maintenant, chaque erreur 404 est un cri silencieux, une mémoire perdue dans les recoins sombres de l'internet,
où même les esprits les plus dévoués ne peuvent plus la rejoindre. signer Tina




Un site web qui meurt est comme un jardin secret envahi par les ronces : 
ses développeurs étaient les jardiniers passionnés, cultivant chaque ligne de code avec amour et dévotion. 
Mais maintenant, chaque erreur 404 est une fleur flétrie, une feuille desséchée qui se détache de la vigne de leur création. 
Les serveurs sont devenus des terres arides, des parcelles stériles où les graines autrefois plantées ne peuvent plus fleurir. 
Les développeurs regardent leur jardin numérique, le cœur lourd de regrets et de souvenirs,
leurs mains encore imprégnées du sol numérique où leur amour pour le code a fleuri. signer Tina



Un site web qui meurt est comme un livre ouvert dévoré par les flammes : 
ses développeurs étaient les écrivains, tissant des histoires interactives avec chaque ligne de code comme des mots sur une page. 
Mais maintenant, chaque erreur 404 est une phrase brûlée, un chapitre perdu qui se consume dans l'incendie du cyberespace. 
Les serveurs sont devenus des cendres froides, des pages calcinées où leurs récits autrefois vivants sont réduits en poussière numérique.
Les développeurs contemplent leur œuvre consumée, le cœur brisé par la destruction de leurs créations, 
leurs doigts encore marqués par l'écriture numérique de leur passion. signer Tina



Un site web qui meurt est comme un enfant qui chute d'une balançoire : 
ses développeurs étaient les parents, nourrissant chaque ligne de code comme des soins affectueux pour leur progéniture numérique.
Mais maintenant, chaque erreur 404 est un cri douloureux, un écho du moment où l'enfant est tombé,
brisant l'équilibre de leur fierté et de leur ambition. Les serveurs sont devenus des aires de jeux désertées,
des balançoires qui grincent sous le poids du silence. Les développeurs regardent l'aire de jeu numérique,
le cœur lourd de regrets et de souvenirs, 
leurs mains encore marquées par les moments heureux de programmation qui ont forgé leur amour. signer Tina





Un site web qui meurt est comme une mère qui perd son enfant : 
ses développeurs étaient les parents, nourrissant chaque ligne de code avec amour et dévotion. 
Mais maintenant, chaque erreur 404 est un cri déchirant, un écho du moment où l'enfant est parti, 
brisant le cœur de leur fierté et de leur ambition. Les serveurs sont devenus des chambres vides, 
des berceaux où leurs rêves sont devenus des cauchemars. Les développeurs regardent le vide numérique, 
le cœur brisé par le vide de leur création, leurs mains encore marquées par les derniers codes qui ont scellé leur destin. - Tina



Sur cette page 404, c'est comme si une forêt avait été dévastée par un incendie : 
nos développeurs étaient les gardiens, préservant chaque ligne de code comme des arbres dans notre écosystème numérique. 
Mais maintenant, chaque erreur 404 est un arbre brûlé, un écho du moment où la vie s'est effacée, 
laissant seulement des cendres numériques. Les serveurs sont devenus des clairières désolées, 
des espaces où nos histoires ont été consumées. Contemplons le bois numérique, le cœur lourd de douleur, 
nos esprits encore imprégnés des sons qui ont autrefois enchanté notre réserve.





Un site web qui meurt est comme un enfant qui disparaît dans la foule : 
ses développeurs étaient les gardiens, guidant chaque ligne de code comme un pas attentif pour leur enfant numérique.
Mais maintenant, chaque erreur 404 est un cri perdu, un appel désespéré qui se perd parmi les masses numériques. 
Les serveurs sont devenus des rues désertes, des carrefours où leurs espoirs et leurs attentes se sont égarés. 
Les développeurs scrutent l'horizon numérique, le cœur brisé par l'absence de leur création,
leurs mains encore tendues dans l'espoir de retrouver ce qui a disparu. signer Tina



Un site web qui meurt est comme un enfant qui s'endort pour toujours : 
ses développeurs étaient les veilleurs, protégeant chaque ligne de code comme une berceuse pour leur enfant numérique.
Mais maintenant, chaque erreur 404 est un silence éternel, un murmure de la perte qui résonne dans l'obscurité du cyberespace.
Les serveurs sont devenus des chambres vides, des berceaux où leurs espoirs et leurs rêves se sont tus.
Les développeurs contemplent leur enfant numérique, le cœur brisé par le calme glacial de leur absence,
leurs esprits encore enveloppés de la douceur numérique de leur création disparue. signer Tina









Dans le réseau complexe de mon cœur, une erreur critique s'est produite. J'ai cherché ton amour avec l'intensité d'une requête GET, 
mais tout ce que j'ai reçu en réponse était un statut 404 : Not Found.
Chaque ligne de code que j'ai écrite pour toi était comme une fonction bien construite, 
mais quelque part dans le code de notre relation, une exception non capturée a provoqué la séparation. 
Mes sentiments se sont transformés en variables non initialisées, incapables de trouver leur valeur.
Imagine une base de données où chaque enregistrement est une mémoire partagée, 
chaque requête SQL est une tentative de comprendre nos différences. Mais malgré mes efforts pour déboguer notre connexion, 
les transactions ont échoué, laissant derrière elles des lignes de résultats vides.
Je suis là, un programmeur perdu dans une boucle infinie d'émotions, 
essayant de comprendre pourquoi notre histoire d'amour a généré une exception fatale. Malgré les patches et les correctifs, 
le sentiment persiste : mon cœur affiche toujours "Error 404 - Love not found" . signer Tina





Mon cœur est comme un programmeur introverti, naviguant à travers des lignes de code pour essayer de capturer ton affection. 
Mais, malheureusement, chaque tentative se termine par une erreur 404, comme si mon amour restait hors de portée.
Chaque variable que je déclare est une tentative de te comprendre, mais quelque part dans le script de notre histoire, 
une exception non prévue a provoqué une défaillance. Mes fonctions de bonheur restent inachevées, 
incapables de compiler une réponse de ton cœur.
Imagine un algorithme où chaque itération est une pensée de toi, chaque boucle est une tentative d'ouvrir ton cœur. 
Malgré mes efforts pour sécuriser notre connexion, chaque requête renvoie toujours une réponse vide.
Je suis ici, un hacker en herbe, essayant de pénétrer ton monde avec des lignes de code, 
espérant que tu puisses retourner un statut 200 - Amour trouvé. Mais jusqu'à présent, 
tout ce que j'ai reçu est un statut 404 - Amour non trouvé. signer Tina 










Mon cœur est comme un hacker en herbe, naviguant à travers des lignes de code pour tenter de percer le mystère de ton cœur. 
Mais à chaque injection de ma curiosité sous forme de SSTI, XSS, et SQL, je ne fais que rencontrer un mur d'erreur 404,
comme si ta sécurité restait impénétrable.
Chaque payload que j'envoie est une tentative de te découvrir, mais quelque part dans le pare-feu de notre relation,
une contre-mesure non anticipée m'a repoussé. Mes scripts d'affection restent non exécutés, 
incapables de déchiffrer une réponse de ton cœur.
Imagine une requête où chaque variable est une parcelle de mon amour, chaque fonction est un essai de comprendre ton cryptage émotionnel.
Malgré mes tentatives de contourner les règles de sécurité, chaque tentative retourne une réponse cryptée.
Je suis ici, un développeur timide, essayant de naviguer dans ton réseau avec des lignes de code, 
espérant que tu puisses retourner un statut 200 - Amour découvert. Mais jusqu'à présent, 
tout ce que j'ai reçu est un statut 404 - Amour sécurisé non trouvé. signer Tina



Titre : Buffer Overflow dans mon cœur

Mon cœur est comme une mémoire tampon, débordant de sentiments pour toi. 
Chaque ligne de code que je tape est une tentative de te définir, de comprendre tes fonctions internes. 
Mes essais d'injection de code comme SSTI, XSS, SQL sont des tentatives de te découvrir 
sans perturber ton système de sécurité émotionnelle.

Chaque instruction que j'exécute est une requête vers ton API affective,
mais je me heurte à des exceptions non gérées qui bloquent mes tentatives d'accès. Mes variables de bonheur restent non initialisées,
en attente d'une réponse qui ne semble pas arriver.

Imagine un script où chaque variable est un attribut de ton charme, chaque fonction est un module de ton âme. 
Malgré mes tentatives de contourner tes défenses avec des techniques de hacking, 
mes efforts semblent se perdre dans un réseau de routes redirigées.

Je suis ici, un hacker timide, essayant de pénétrer ton firewall émotionnel avec des lignes de code. 
Espérant que tu puisses un jour m'envoyer un statut 200 - Love Found, mais jusqu'à maintenant, 
tout ce que j'ai reçu est un statut 404 - Love Not Found. je te donne mon numéro ..... espérant recevoir
un 200 Love Found pour enfin pouvoir de dire que je t'aime en face a face 
mais si ses un 404 Love Note Found je n'esseyerais plus de faire des injection pour connaitre
ton réseaux, en échange pourrais tu effacer les log ou tout les tentatives de d'exploitation 
sont rester dans l'histoir, car je n'est pas envie qu'on sache qui je suis et rester anonyme.





*/








/*
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
const confettiArray = [];
const colors = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff'];


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Confetti{
  constructor(){
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height - canvas.height;
    this.size = Math.random() * 10 + 5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.speed = Math.random() * 3 + 1;
    this.opacity = Math.random();
  }

  update(){
    this.y += this.speed;
    if (this.y > canvas.height ){
      this.y = 0 - this.size;
      this.x = Math.random() * canvas.width;
      this.opacity = Math.random();
    }
  }

  draw(){
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.globalAlpha = 1;
  }
}

function addConfetti(){
  for (let i = 0; i < 100; i++) {
    confettiArray.push(new Confetti());
  }
}

function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiArray.forEach(confetti => {
    confetti.update();
    confetti.draw();
  });
  requestAnimationFrame(animate);
}

addConfetti();
animate();

*/






/*
vibration du navigateur 

if ('vibrate' in navigator){
    document.addEventListener('click', function() {
      // Faire vibrer l'appareil pendant 500 ms
      navigator.vibrate(500);
    });
  } else{
    alert('Désolé, votre appareil ne supporte pas la vibration.');
}*/





