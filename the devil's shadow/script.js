// JavaScript can be used for additional animations or effects if needed
window.onload = function() {
    const body = document.querySelector('body');
    body.style.opacity = '1';
};

let backgroundSound = null;

function RunAudi(){
    if (!backgroundSound){
        backgroundSound = new Audio("The Cranberries - Zombie (Alt. Version).mp3");
        backgroundSound.loop = true;
        backgroundSound.play();
    }
};

document.addEventListener('click', function(){
    RunAudi();
});