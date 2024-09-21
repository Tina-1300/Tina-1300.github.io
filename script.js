
const targetDate = new Date('October 19, 2024 00:00:00').getTime();

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

    if (distance < 0) {
        clearInterval(interval);
        document.querySelector('.countdown').style.display = 'none';
        document.getElementById('messageFinal').style.display = 'block';
    }
}

const interval = setInterval(countdown, 1000);



function playSound(){
    const audio = new Audio('song/h4.mp3'); // h4.mp3 = MeandtheDevil
    audio.loop = true;
    
    document.addEventListener('click', function(){
        audio.play();
    });
}


playSound();
