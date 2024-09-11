function playSound(){
    const audio = new Audio('./musique/background.mp3');
    audio.loop = true;
    
    document.addEventListener('click', function(){
        audio.play();
    });
}

playSound();