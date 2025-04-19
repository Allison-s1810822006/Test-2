src="team021.js">
// 時間格式轉換函式：毫秒 → hh:mm:ss
function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    let minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    let seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

// 開始按鈕事件
startBtn.addEventListener('click', () => {
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

    // 開始倒數
    clearInterval(countdownInterval); // 清掉先前的倒數（如果有）
    countdownInterval = setInterval(() => {
        const now = Date.now();
        const diff = targetTime - now;

        if (diff <= 0) {
            clearInterval(countdownInterval);
            timerDisplay.textContent = "00:00:00";
            alert("時間到！");
        } else {
            timerDisplay.textContent = formatTime(diff);
        }
    }, 1000);
});

// 重置按鈕事件
resetBtn.addEventListener('click', () => {
    clearInterval(countdownInterval);
    timerDisplay.textContent = "00:00:00";
    dateTimeInput.value = "";
});

