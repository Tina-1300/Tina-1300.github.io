const targetDate = new Date('May 31, 2025 00:00:00').getTime();

function countdown(){
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').querySelector('span').textContent = days;
    document.getElementById('hours').querySelector('span').textContent = hours;
    document.getElementById('minutes').querySelector('span').textContent = minutes;
    document.getElementById('seconds').querySelector('span').textContent = seconds;

    if (distance < 0){
        clearInterval(interval);
        document.querySelector('.countdown').style.display = 'none';
        document.getElementById('messageFinal').style.display = 'block';
    }
}

const interval = setInterval(countdown, 1000);

// let backgroundSound = null;

// const musicList = [
//     "AlecBenjaminLetMeDownSlowlyPiano.mp3", 
//     "IndochineNosCelebrations.mp3", 
//     "IndochineLeChantDesCygnes.mp3",
//     "RaspoutineXAnotherlove.mp3"
// ]; 

// function RunAudi(){

//     let newMusic = musicList[Math.floor(Math.random() * musicList.length)];

//     if (backgroundSound){
//         backgroundSound.pause();
//         backgroundSound.currentTime = 0;
//     }

//     backgroundSound = new Audio(newMusic);
//     backgroundSound.loop = true;
//     backgroundSound.play();
// }

// document.addEventListener('click', function(){
//     RunAudi();
// });