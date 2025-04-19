// 1. 宣告 DOM 元素與變數
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const dateTimeInput = document.getElementById('datetime');

// 抓取 HTML 中的元素來控制它們（例如變更文字、更新時間）
// 使用這些變數記錄：
// 1. 開始時間
let countdownInterval = null;//countdownInterval：(定時器的控制代碼)
let targetTime = null;// targetTime：使用者輸入的目標時間（毫秒）
let remainingTime = 0;// remainingTime：剩餘的毫秒數（可以暫停時記住時間）

//2. 格式化時間用的函式
//(把剩餘時間的「毫秒」轉成「時:分:秒」，並補零保持兩位數（如 01:05:09）)
// 時間格式轉換
function formatTime(ms) {
    const totalSec = Math.floor(ms / 1000);
    const hr = String(Math.floor(totalSec / 3600)).padStart(2, '0');
    const min = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
    const sec = String(totalSec % 60).padStart(2, '0');
    return `${hr}:${min}:${sec}`;
}
//4. 開始倒數的函式
//每秒跑一次 setInterval()，更新顯示時間，直到時間到跳出提示並歸零
// 計時邏輯
function startCountdown() {
    const start = Date.now();// 現在時間
    const end = start + remainingTime;
    // 計算結束時間
    countdownInterval = setInterval(() => {
        const now = Date.now();
        remainingTime = end - now;
        // 更新顯示時間
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
//3. 點擊「開始 / 暫停 / 繼續」的邏輯
// 開始 / 暫停 / 繼續
//核心：按鈕會根據狀態切換「開始」→「暫停」→「繼續」再回來
startBtn.addEventListener('click', () => {
    if (startBtn.textContent === '開始') {
        // 驗證時間是否有填，是否為未來時間
        // 設定 targetTime 與 remainingTime
        // 開始倒數並把按鈕變「暫停」
        const inputValue = dateTimeInput.value;
        // 檢查輸入框是否有值
        if (!inputValue) {
            alert("請設定目標時間！");
            return;
        }
        // 檢查時間格式是否正確
        targetTime = new Date(inputValue).getTime();
        const now = Date.now();
        // 檢查時間是否在未來
        if (targetTime <= now) {
            alert("請設定未來時間！");
            return;
        }
        // 計算剩餘時間
        remainingTime = targetTime - now;
        startCountdown();
        startBtn.textContent = '暫停';
        // 更新顯示時間
    } else if (startBtn.textContent === '暫停') {
        // 停止倒數（保留剩餘時間），按鈕變「繼續」
        clearInterval(countdownInterval);
        startBtn.textContent = '繼續';
        // 更新顯示時間
    } else if (startBtn.textContent === '繼續') {
        // 重新開始倒數（從剩餘時間），按鈕變「暫停」
        startCountdown();
        startBtn.textContent = '暫停';
    }
});
//5. 點擊「重置」與回復初始狀態
// 重置功能
resetBtn.addEventListener('click', () => {
    clearInterval(countdownInterval);
    resetAll();
});
//按下重置後：停止計時器、清空時間欄位、畫面恢復初始狀態
// 還原初始狀態
function resetAll() {
    timerDisplay.textContent = "00:00:00";
    dateTimeInput.value = "";
    startBtn.textContent = "開始";
    remainingTime = 0;
}
