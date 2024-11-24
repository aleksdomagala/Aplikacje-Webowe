const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const gameOverScreen = document.getElementById('game-over');
const finalScore = document.getElementById('final-score');
const restartButton = document.getElementById('restart');
const sadMusic = document.getElementById('sad-music');

const hearts = [
    document.getElementById('heart1'),
    document.getElementById('heart2'),
    document.getElementById('heart3'),
];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const aimImg = new Image();
aimImg.src = 'images/aim.png';

const zombieImg = new Image();
zombieImg.src = 'images/walkingdead.png';

const zombieSpriteWidth = 200;
const zombieSpriteHeight = 308;
const zombieFrames = 10;
let zombieFrameIndex = 0;

let score = 0;
let lives = 3;
let zombies = [];
let isGameOver = false;

let lastFrameTime = 0;
const frameDuration = 100;
const maxSpeed = 1000;

function spawnZombie() {
    const x = canvas.width;
    const y = Math.random() * (canvas.height - zombieSpriteHeight);
    const speed = Math.random() * (maxSpeed - 150) + 150 ;
    const scale = Math.random() * (1.25 - 0.3) + 0.3;


    const speedPerFrame = speed / 100;

    zombies.push({
        x,
        y,
        speedPerFrame,
        scale,
        frame: 0,
        lastFrameTime: 0,
    });
}



function drawZombie(zombie) {
    const frameX = zombie.frame * zombieSpriteWidth;

    ctx.drawImage(
        zombieImg,
        frameX,
        0,
        zombieSpriteWidth,
        zombieSpriteHeight,
        zombie.x,
        zombie.y,
        zombieSpriteWidth * zombie.scale,
        zombieSpriteHeight * zombie.scale
    );
}

function updateZombies(timestamp) {
    zombies.forEach((zombie, index) => {
        zombie.x -= zombie.speedPerFrame;

        if (timestamp - zombie.lastFrameTime > frameDuration) {
            zombie.frame = (zombie.frame + 1) % zombieFrames;
            zombie.lastFrameTime = timestamp;
        }

        if (zombie.x + zombieSpriteWidth * zombie.scale < 0) {
            zombies.splice(index, 1);
            loseLife();
        }
    });
}

let aimX = 0;
let aimY = 0;

canvas.addEventListener('mousemove', (event) => {
    aimX = event.clientX;
    aimY = event.clientY;
});

canvas.addEventListener('click', (event) => {
    const clickX = event.clientX;
    const clickY = event.clientY;

    let hit = false;
    zombies.forEach((zombie, index) => {
        const zombieWidth = zombieSpriteWidth * zombie.scale;
        const zombieHeight = zombieSpriteHeight * zombie.scale;

        if (
            clickX > zombie.x &&
            clickX < zombie.x + zombieWidth &&
            clickY > zombie.y &&
            clickY < zombie.y + zombieHeight
        ) {
            zombies.splice(index, 1);
            score += 20;
            scoreElement.textContent = `Wynik: ${score}`;
            hit = true;
        }
    });

    if (!hit) {
        score -= 5;
        scoreElement.textContent = `Wynik: ${score}`;
    }
});

function loseLife() {
    lives--;
    if (lives >= 0) {
        hearts[lives].src = 'images/empty_heart.png';
    }
    if (lives <= 0) {
        endGame();
    }
}

function endGame() {
    isGameOver = true;
    gameOverScreen.classList.remove('hidden');
    finalScore.textContent = score;
    sadMusic.play();
}

restartButton.addEventListener('click', () => {
    location.reload();
});

function gameLoop(timestamp) {
    if (isGameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const crosshairSize = 150;
    ctx.drawImage(aimImg, aimX - crosshairSize / 2, aimY - crosshairSize / 2, crosshairSize, crosshairSize);
    zombies.forEach(drawZombie);

    updateZombies(timestamp);

    requestAnimationFrame(gameLoop);
}

setInterval(spawnZombie, 1000);

gameLoop();
