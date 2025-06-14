console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Anuvanuvu", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Tujhe Kitna", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Evare", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Tere Pyaar Mein", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Nenu Nuvantu", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Roba Roba", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Arare Arare", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Koola Kalle Ila", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Mila Mila", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Avnanava", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
];

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

audioElement.addEventListener('timeupdate', () => {
    const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    if (!isNaN(progress)) myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    if (!isNaN(audioElement.duration)) {
        audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
    }
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});
