const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/1.mp3',
        displayName: 'Os bichos da fazenda',
        cover: 'assets/1.jpg',
        artist: 'Quim Barreiros',
    },
    {
        path: 'assets/2.mp3',
        displayName: 'Juice WRLD & XXX Tentacion Chamber of Reflection',
        cover: 'assets/2.jpg',
        artist: 'Juice WRLD & XXX Tentacion',
    },
    {
        path: 'assets/3.mp3',
        displayName: 'Playboi Carti - bando',
        cover: 'assets/3.jpg',
        artist: 'Playboi Carti',
    },
    {
        path: 'assets/4.mp3',
        displayName: 'Imaginary Places ',
        cover: 'assets/4.jpg',
        artist: 'BusDriver',
    },
    {
        path: 'assets/5.mp3',
        displayName: 'Telephones - Slowed + Reverb',
        cover: 'assets/5.jpg',
        artist: 'Vacations',
    },
    {
        path: 'assets/6.mp3',
        displayName: 'WOW',
        cover: 'assets/6.jpg',
        artist: 'Zara Larsson',
    },
    {
        path: 'assets/7.mp3',
        displayName: 'Impend -Bloom',
        cover: 'assets/7.jpg',
        artist: 'Bread',
    },
    {
        path: 'assets/8.mp3',
        displayName: 'Me Libera',
        cover: 'assets/8.jpg',
        artist: 'Banda Djavú',
    }
  
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Alterar o ícone do botão de reprodução
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Definir título de foco do botão
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Ícone do botão Alterar pausa
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Definir título de foco do botão
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);