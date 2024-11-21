let timerInterval;
let elapsedSeconds = 0;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) {
        return `${minutes}min ${remainingSeconds}s`;
    } else {
        return `${remainingSeconds}s`;
    }
}

function updateDisplay() {
    const display = document.getElementById('display');
    display.textContent = formatTime(elapsedSeconds);
}


function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            elapsedSeconds++;
            updateDisplay();
        }, 1000);
    }
}


function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}


function resetTimer() {
    stopTimer();
    elapsedSeconds = 0;
    updateDisplay();
}


document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('stop').addEventListener('click', stopTimer);
document.getElementById('reset').addEventListener('click', resetTimer);

updateDisplay();
