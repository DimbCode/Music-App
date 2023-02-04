// Music-controller  Variables

const audio = document.querySelector(".music-controller__audio"),
    audioRange = document.querySelector(".music-controller__range"),
    audioCurrentText = document.querySelector(".music-controller__time--start"),
    audioDurationText = document.querySelector(".music-controller__time--end"),
    audioStopButton = document.querySelector(".control-panel__btn--stop"),
    audioMuteBtn = document.querySelector(".control-panel__btn--sound"),
    audioLoopBtn = document.querySelector(".control-panel__btn--cycle"),
    audioFavoritesBtn = document.querySelector(".control-panel__btn--favorites");
      
let audioInfo = {
    status: "pause",
    sound: true,
    loop: false,
    favorites: false,
}

let audioListener;

// Event Listeners

// Music-player Observer

audioListener = setInterval(() => {
    if ( !(audioInfo.status == "pause") ) {
        setAudioRange(audioRange, audio);
        setTime(audio, audioCurrentText, audioDurationText);
    }
}, 1);

// Input Event

audioRange.addEventListener("input", () => {
    setRangeAudio(audioRange, audio);
    setAudioRange(audioRange, audio);
    setTime(audio, audioCurrentText, audioDurationText);
    lastAudioTime = Math.floor(audio.currentTime) - 1;
});

// Pause button Event

audioStopButton.addEventListener("click", () => {
    if (audioInfo.status == "pause") {
        audioInfo.status = "play";
        audio.play();
        addClass(audioStopButton.lastElementChild, audioStopButton.children, "none");
    } else {
        audioInfo.status = "pause";
        audio.pause();
        addClass(audioStopButton.firstElementChild, audioStopButton.children, "none");
    }
});

// Mute Button Event

audioMuteBtn.addEventListener("click", () => {
    if (audioInfo.sound) {
        audio.muted = true;
        audioInfo.sound = false;
        addClass(audioMuteBtn.lastElementChild, audioMuteBtn.children, "none");
    } else {
        audio.muted = false;
        audioInfo.sound = true;
        addClass(audioMuteBtn.firstElementChild, audioMuteBtn.children, "none");
    }
});

// Loop Button Event

audioLoopBtn.addEventListener("click", () => {
    if (audioInfo.loop) {
        audio.loop = false;
        audioInfo.loop = false;
        audioLoopBtn.classList.remove("control-panel__btn-img--active");
    } else {
        audio.loop = "loop";
        audioInfo.loop = true;
        audioLoopBtn.classList.add("control-panel__btn-img--active");
    }
});

// Favorites Button Event

audioFavoritesBtn.addEventListener("click", () => {
    if (audioInfo.favorites) {
        audioInfo.favorites = false;
        audioFavoritesBtn.classList.remove("control-panel__btn-img--active");
    } else {
        audioInfo.favorites = true;
        audioFavoritesBtn.classList.add("control-panel__btn-img--active");
    }
});

// Functions

function setAudioRange(input, audio) {
    input.value = audio.currentTime;
}

function setRangeAudio(input, audio) {
    audio.currentTime = input.value;
}

function setTime(audio, current, duration) {
    let currentSeconds = Math.floor(audio.currentTime % 60) < 10 ?
                         `0${ Math.floor(audio.currentTime % 60) }` :
                         Math.floor(audio.currentTime % 60);
        
    current.textContent = `${ Math.floor(audio.currentTime / 60) }:${ currentSeconds }`;
    duration.textContent = `${ Math.floor(audio.duration / 60) }:${ Math.floor(audio.duration % 60) }`;
}

function addClass(element, elements, cl) {
    Array.from(elements).forEach( item => item.classList.add(cl) );
    element.classList.remove(cl);
}

function byField(field) {
    return function() {
        
    }
}