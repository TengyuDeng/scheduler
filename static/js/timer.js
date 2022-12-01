// To save interval id
let nIntervId;

function startTimer() {
    // To start the timer
    // Make the timer field appear
    document.getElementById("timer").hidden = false;
    // Make the send buttons hidden
    document.getElementById("sendActions").hidden = true;
    nIntervId = setInterval(timer, 1000);
}

function timer () {
    // Update current time with one second
    let time = document.getElementById("curTime").innerHTML;
    let arr = time.split(":");
    // + 1 second
    let h = Number(arr[0])
    let m = Number(arr[1]);
    let s = Number(arr[2]) + 1;
    // If second is 60, add 1 minute and set second to 0
    if(s == 60){
        m = m + 1;
        s = 0;
    }
    // If minute is 60, add 1 hour and set minute to 0
    if(m == 60){
        h = h + 1;
        m = 0;
    }
    // To display time in h:mm:ss format
    document.getElementById("curTime").innerHTML =
    String(h) + ":" + String(m).padStart(2, '0') + ":" + String(s).padStart(2, '0');
}

function stopTimer() {
    // To stop the timer
    if (nIntervId) {
        clearInterval(nIntervId);
        nIntervId = null;
    }
    // Make the send buttons appear
    document.getElementById("sendActions").hidden = false;
}

function clearTimer() {
    // Reset current time to 0:00:00
    stopTimer();
    document.getElementById("curTime").innerHTML = "0:00:00";
    // Make the send buttons hidden
    document.getElementById("sendActions").hidden = true;
}

function sendData() {
    // Send current time to server
    let task_select = document.getElementById("task_select");
    let task = task_select.options[task_select.selectedIndex].value;
    let time = document.getElementById("curTime").innerHTML;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/send", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({task: task, time: time}));
    xhr.onload = function() {
        if (xhr.response == "OK") {
            // If success, redirect to result page
            window.location.href = "/result";
        }
    }
    xhr.onerror = function() {
        alert("Error");
    }
}

let startButton = document.getElementById("start");
let stopButton = document.getElementById("stop");
let clearButton = document.getElementById("clear");
let sendButton = document.getElementById("send");

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
clearButton.addEventListener("click", clearTimer);
sendButton.addEventListener("click", sendData);