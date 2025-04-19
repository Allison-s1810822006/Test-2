const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const dateTimeInput = document.getElementById('datetime');

let countdownInterval = null;
let targetTime = null;
let remainingTime = 0;

// 時間格式轉換
function formatTime(ms) {
    const totalSec = Math.floor(ms / 1000);
    const hr = String(Math.floor(totalSec / 3600)).padStart(2, '0');
    const min = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
    const sec = String(totalSec % 60).padStart(2, '0');
    return `${hr}:${min}:${sec}`;
}

// 計時邏輯
function startCountdown() {
    const start = Date.now();
    const end = start + remainingTime;

    countdownInterval = setInterval(() => {
        const now = Date.now();
        remainingTime = end - now;

        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            timerDisplay.textContent = "00:00:00";
            alert("時間到！");
            resetAll();
        } else {
            timerDisplay.textContent = formatTime(remainingTime);
        }
    }, 1000);
}

// 開始 / 暫停 / 繼續
startBtn.addEventListener('click', () => {
    if (startBtn.textContent === '開始') {
        const inputValue = dateTimeInput.value;
        if (!inputValue) {
            alert("請設定目標時間！");
            return;
        }

        targetTime = new Date(inputValue).getTime();
        const now = Date.now();

        if (targetTime <= now) {
            alert("請設定未來時間！");
            return;
        }

        remainingTime = targetTime - now;
        startCountdown();
        startBtn.textContent = '暫停';

    } else if (startBtn.textContent === '暫停') {
        clearInterval(countdownInterval);
        startBtn.textContent = '繼續';

    } else if (startBtn.textContent === '繼續') {
        startCountdown();
        startBtn.textContent = '暫停';
    }
});

// 重置功能
resetBtn.addEventListener('click', () => {
    clearInterval(countdownInterval);
    resetAll();
});

// 還原初始狀態
function resetAll() {
    timerDisplay.textContent = "00:00:00";
    dateTimeInput.value = "";
    startBtn.textContent = "開始";
    remainingTime = 0;
}
