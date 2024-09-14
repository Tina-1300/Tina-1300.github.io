function playSound(){
    const audio = new Audio('../song/h4.mp3'); // h4.mp3 = MeandtheDevil
    audio.loop = true;
    
    document.addEventListener('click', function(){
        audio.play();
    });
}


playSound();