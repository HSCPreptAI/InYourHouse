const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title h4')
const cover = document.querySelector('#cover')
const fileUrl = musicContainer.getAttribute('data-file-url');
const musicImgUrl = musicContainer.getAttribute('music-image-url');

//Song titles
const songs = ['rideaux', 'lastdance']

//keep track of songs
let songIndex = 1

//Initially load song info DOM

loadSong(songs[songIndex])


function loadSong(song){
    title.innerText = song
    audio.src = fileUrl
    cover.src = musicImgUrl
  const savedTime = localStorage.getItem('audioTime');
    if (savedTime) {
      audio.currentTime = parseFloat(savedTime);
      playSong(); 
    }
  
}

setInterval(function() {
  localStorage.setItem('audioTime', audio.currentTime);
}, 500);

function playSong(){
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    audio.muted = false;
    audio.play(); 

}

function pauseSong(){
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    audio.pause(); 
}


function prevSong() {
    songIndex--

    if(songIndex < 0){
        songIndex = songs.length - 1; 
    }

    loadSong(songs[songIndex])
    playSong()

}

function nextSong() {
    songIndex++

    if(songIndex > songs.length - 1){
        songIndex = 0
    }

    loadSong(songs[songIndex])
    playSong()

}


function updateProgress(e){

    audio.onloadedmetadata = function(){
    console.log(audio.duration)
    const currentTime = e.srcElement.currentTime
    const progressPercent = (currentTime / audio.duration) * 100
    progress.style.width = `${progressPercent}%` 
    }  

    audio.onloadedmetadata()
}


//Event Listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying) {
        pauseSong()
    }
    else{
        playSong()
    }

})

//Change Song Events
// prevBtn.addEventListener('click', prevSong)
// nextBtn.addEventListener('click', nextSong)
audio.addEventListener('timeupdate', updateProgress)
audio.addEventListener("loadedmetadata", function() {
    duration = audio.duration;
    durationLoaded = true;
   
  });

// let isNotClicked = true; 
// document.addEventListener('click', function() {
//   if(isNotClicked && !musicContainer.classList.contains('play')){
//     audio.muted = false;
//     playSong()
//     isNotClicked = false;
//   }
// });
