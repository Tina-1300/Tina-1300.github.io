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
        clearInterval(countdown);
        document.querySelector('.countdown').innerText = `Chargement De La Version 0.5 De la librairie Tina_TOOLS...
        disponible sur  https://tina-1300.github.io/TinaTOOLS/v0.5/index.html`;
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
    const audio = new Audio('song/h4.mp3'); // h4.mp3 = MeandtheDevil
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








