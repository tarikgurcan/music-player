const music = document.querySelector("audio")
const progressContainer=document.querySelector("#progress-container")
const progress=document.querySelector("#progress")
const currentTimeEl=document.querySelector("#current-time")
const durationEl=document.querySelector("#duration")
const playBtn = document.querySelector("#play")
const prevBtn = document.querySelector("#prev")
const nextBtn = document.querySelector("#next")
const image=document.querySelector("img")
const title=document.querySelector("#title")
const artist=document.querySelector("#artist")


//Check music is playing or not
let isPlay = false;

// Play
function playSong(){
    isPlay=true;
    playBtn.classList.replace("fa-play","fa-pause")
    playBtn.setAttribute("title","Pause")
    music.play();
}
//Pause
function pauseSong(){
    isPlay=false;
    playBtn.classList.replace("fa-pause","fa-play")
    playBtn.setAttribute("title","Play")
    music.pause();
}

//Play or Pause Event Listener
playBtn.addEventListener("click",()=>isPlay?pauseSong():playSong())

//update Dom
function loadSong(song){
    artist.textContent=song.artist;
    title.textContent=song.displayName;
    music.src=`/music/${song.name}.mp3`;
    image.src=`/img/${song.name}.jpg`;
}

let songIndex=0;    

loadSong(songs[songIndex]);

//prev or next Event Listener

function updateProgressBar(e){
    if(isPlay){
        const {duration, currentTime} = e.srcElement;
        const progressBarWitdh = (currentTime/duration)*100;
        progress.style.width=`${progressBarWitdh}%`
        //Calculate phase
        const durationMin=Math.floor(duration/60);
        let durationSec=Math.floor(duration%60);
        if(durationSec<10){
            durationSec=`0${durationSec}`
        }
        //Delay NaN in Duration
        if(durationSec){
        durationEl.textContent=`${durationMin}:${durationSec}`
        }
        const currentTimeMin=Math.floor(currentTime/60);
        let currentTimeSec=Math.floor(currentTime%60);
        if(currentTimeSec<10){
            currentTimeSec=`0${currentTimeSec}`
        }
        currentTimeEl.textContent=`${currentTimeMin}:${currentTimeSec}`

    }
}

function setProgressBar(e){
    const width=this.clientWidth;
    const clickX=e.offsetX;
    const {duration}=music;
    music.currentTime=(clickX/width)*duration;
}

//Event Listeners
prevBtn.addEventListener("click",prevSong);
nextBtn.addEventListener("click",nextSong);
music.addEventListener("timeupdate",updateProgressBar)
progressContainer.addEventListener("click",setProgressBar)
music.addEventListener("ended",nextSong)

function prevSong(){
    if(songIndex>0){
        songIndex=songIndex-1;
        loadSong(songs[songIndex])
        playSong();
    }
    else{
        loadSong(songs[0]);
        playSong();
    }
}

function nextSong(){
    songIndex=songIndex+1;
    if(songIndex>songs.length-1){
        songIndex=0;
    }
    loadSong(songs[songIndex])
    playSong();
}