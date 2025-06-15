console.log("Let's write some JavaScript");

// Initialize the Variables
let currentSongIndex = 0;
const audioElement = document.getElementById("audio");
const myProgressBar = document.getElementById("myProgressBar");
const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("totalDuration");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const songTitle = document.getElementById("songTitle");
const playIcon = document.getElementById("playIcon");
const pauseIcon = document.getElementById("pauseIcon");
const volumeControl = document.getElementById("volumeControl");


let songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "Songs_2/1.mp3"},
    {songName: "Cielo - Huma-Huma", filePath: "Songs_2/2.mp3"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "Songs_2/3.mp3"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "Songs_2/4.mp3"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "Songs_2/5.mp3"},
    {songName: "When You're Alone - Dyalla", filePath: "songs/When You're Alone - Dyalla.mp3"},
    {songName: "Glitcher - Dyalla", filePath: "songs/Glitcher - Dyalla.mp3"},
    {songName: "Groove - Dyalla", filePath: "songs/Groove - Dyalla.mp3"},
    {songName: "GTA Type Beat - Dyalla", filePath: "songs/GTA Type Beat - Dyalla.mp3"},
    {songName: "For Granted - Dyalla", filePath: "songs/For Granted - Dyalla.mp3"},
    {songName: "Bhool Bhulaiyaa - Pitbull | Diljit Dosanjh", filePath: "Songs_2/11.mp3"},
    {songName: "100 Million - DIVINE | Karan Aujla", filePath: "Songs_2/12.mp3"},
]

//Left Side of the website

const addLib = document.getElementsByClassName("addLib");
const plus = document.getElementsByClassName("plus");
const minus = document.getElementsByClassName("minus");
const list = document.querySelector(".songList");

//to add the name of the songs in the library
for (let i = 0; i < addLib.length; i++) {
  addLib[i].addEventListener("click", () => {
    const plus = addLib[i].querySelector(".plus");
    const minus = addLib[i].querySelector(".minus");

    const song = songs[i]; // assumes index matches
    const existingLi = Array.from(list.children).find(
      (li) => li.textContent === song.songName
    );

    if (plus.style.display !== "none") {
      plus.style.display = "none";
      minus.style.display = "inline";

      // Only add if not already in the list
      if (!existingLi) {
        const li = document.createElement("li");
        li.innerText = song.songName;
        li.setAttribute("data-index", i); // ✅ Store the index for reference

        // ✅ Add event listener to play the song when clicked
        li.addEventListener("click", () => {
          currentSongIndex = parseInt(li.getAttribute("data-index"));
          loadSong(currentSongIndex);
          });

          list.appendChild(li);
      }
    } else {
      plus.style.display = "inline";
      minus.style.display = "none";

      // Remove the existing li that matches the song
      if (existingLi) {
        list.removeChild(existingLi);
      }
    }
  });
}





//Right Side of the website

// Update progress bar as audio plays
audioElement.addEventListener("timeupdate", () => {
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress || 0;
});

// Allow user to seek using the progress bar
myProgressBar.addEventListener("input", () => {
    const seekTime = (myProgressBar.value / 100) * audioElement.duration;
    audioElement.currentTime = seekTime;
});

//display current time and duration
function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

// When metadata loads, set max value of progress bar
audioElement.addEventListener("loadedmetadata", () => {
  myProgressBar.max = Math.floor(audioElement.duration);
  durationDisplay.textContent = formatTime(audioElement.duration);
});

// Update progress bar & current time while playing
audioElement.addEventListener("timeupdate", () => {
  myProgressBar.value = Math.floor(audioElement.currentTime);
  currentTimeDisplay.textContent = formatTime(audioElement.currentTime);
});

// click the play button 
document.getElementById("playButton").addEventListener("click", () => {
    if (audioElement.paused) {
    audioElement.play();
    playIcon.style.display = "none";
    pauseIcon.style.display = "inline";
  } else {
    audioElement.pause();
    playIcon.style.display = "inline";
    pauseIcon.style.display = "none";
  }
});

document.addEventListener("keydown", (event)=>{
    if(event.key == " "){ // " " is used show denote Spacebar
        if (audioElement.paused) {
        audioElement.play();
        playIcon.style.display = "none";
        pauseIcon.style.display = "inline";
        } else {
            audioElement.pause();
            playIcon.style.display = "inline";
            pauseIcon.style.display = "none";
        }
    }
});

// Load a song by index
function loadSong(index) {
  audioElement.src = songs[index].filePath;

//   Metadata includes:
// duration — total length of the media
// videoWidth, videoHeight (for video)
// readyState, seekable range
// Basically: non-content data about the media
  audioElement.addEventListener("loadedmetadata", () => {
    myProgressBar.max = Math.floor(audioElement.duration); //Math.floor rounds the number to the nearest lowest integer
    durationDisplay.textContent = formatTime(audioElement.duration);
  });

  songTitle.textContent = songs[index].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  playIcon.style.display = "none";
  pauseIcon.style.display = "inline";
}


// Next song
nextBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
});

//autoplay
audioElement.addEventListener("ended", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
});

// Previous song
prevBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
});

//press shift + ⬅️/➡️, for prev/next respectively
document.addEventListener("keydown", (event) => {
    if( event.shiftKey  && event.key === "ArrowDown"){
        event.preventDefault();
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
    }

    if( event.shiftKey  && event.key === "ArrowUp"){
        event.preventDefault();
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
    }
});

//press ⬆️/⬇️, for inc/dec 5s respectively 
document.addEventListener("keydown", (event)=>{
    if(event.key == "ArrowRight"){
        audioElement.currentTime += 5;
    }
    if(event.key == "ArrowLeft"){
        audioElement.currentTime -= 5;
    }
});

// Update audio volume when slider changes
volumeControl.addEventListener("input", ()=>{
    audioElement.volume = volumeControl.value;
});

// Update slider when audio volume changes
audioElement.addEventListener("volumechange", ()=>{
    volumeControl.value = audioElement.volume;
});


const volumeLi = document.getElementById("volIcon");

function updateVolumeMarker() {
  volumeLi.classList.remove("muted", "low", "high");

  if (audioElement.volume == 0 || audioElement.muted) {
    volumeLi.classList.add("muted");
  } else if (audioElement.volume < 0.5) {
    volumeLi.classList.add("low");
  } else {
    volumeLi.classList.add("high");
  }
}

// Attach to volume slider
volumeControl.addEventListener("input", () => {
  audioElement.volume = volumeControl.value;
  updateVolumeMarker();
});

// Attach to mute key handler
document.addEventListener("keydown", (event) => {
  if (event.key === "m") {
    if (audioElement.volume === 0 || audioElement.muted) {
      audioElement.muted = false;
      audioElement.volume = 1;
      volumeControl.value = 1;
    } else {
      audioElement.muted = true;
      audioElement.volume = 0;
      volumeControl.value = 0;
    }
    updateVolumeMarker();
  }
});

// volumeLi.addEventListener("click", () => {

//     if (audioElement.volume === 0 || audioElement.muted) {
//       audioElement.muted = false;
//       audioElement.volume = 1;
//       volumeControl.value = 1;
//     } else {
//       audioElement.muted = true;
//       audioElement.volume = 0;
//       volumeControl.value = 0;
//     }
//     updateVolumeMarker();

// });

// Sync icon if volume is changed in other ways
audioElement.addEventListener("volumechange", updateVolumeMarker);

//press +/-, for inc/dec 5% respectively; the volume ranges b/w 0.0 and 1.0
document.addEventListener("keydown", (event)=>{
    if(event.shiftKey && event.key == "+"){
        audioElement.volume += 0.05;
    }
    if(event.shiftKey && event.key == "-"){
        audioElement.volume -= 0.05;
    }
});

// Select all elements with class "play"
const playButtons = document.querySelectorAll(".cardContainer .play");

playButtons.forEach(playBtn => {
    playBtn.addEventListener("click", () =>{
        const newIndex = parseInt(playBtn.id); //converts the string in the id in each .play to an integer
        currentSongIndex = newIndex;
        loadSong(currentSongIndex);
    });
});



//Responsive

const hamburger = document.querySelector(".hamburger"); //If you only have one hamburger icon, use querySelector() instead
const cross = document.querySelector(".cross");
const left = document.querySelector(".left");
const mediaQuery = window.matchMedia("(max-width: 1440px)");

// Function to update hamburger visibility based on screen size
function handleScreenChange(e) {
  if (e.matches) {
    hamburger.style.display = "inline";
  } else {
    hamburger.style.display = "none";
    cross.style.display = "none";
    left.style.zIndex = "0";
  }
}

// Initial check
handleScreenChange(mediaQuery);

// Listen for future changes
mediaQuery.addEventListener("change", handleScreenChange);

// Hamburger click
hamburger.addEventListener("click", () => {
  hamburger.style.display = "none";
  cross.style.display = "inline";
  left.style.zIndex = "1";
});

// Close hamburger
document.addEventListener("click", (event) => {
  if (mediaQuery.matches) {
    if (
      (!left.contains(event.target) && event.target !== hamburger) || event.target === cross) {
      hamburger.style.display = "inline";
      cross.style.display = "none";
      left.style.zIndex = "0";
    }
  }
});
