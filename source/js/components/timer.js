function StartTimer() {
    let hours = null;

    if (document.querySelector('.timer-hours')) {
        hours = document.querySelectorAll('.timer-hours');
    }

    let minutes = document.querySelectorAll('.timer-minutes');
    let seconds = document.querySelectorAll('.timer-seconds');

    if (minutes.length == 0 || seconds.length == 0) {
        throw new Error("Нужно установить минуты и секунды")
    }

    var hour = hours ? parseInt(hours[0].textContent) : 0;
    var minute = parseInt(minutes[0].textContent) || 25;
    var second = parseInt(seconds[0].textContent) || 0;

    // если время закончилось, прервать цикл
    if (second === 0) {
        if (minute === 0) {
            if (hour === 0) {
                return;
            }
        }
    }

    if (second === 0) {
        if (minute === 0) {
            hour--;
            minute = 60;
        }

        minute--;
        second = 59;
    }
    else
        second--;

    if (hours !== null) {
        insertTime(hours, hour);
    }

    insertTime(minutes, minute);
    insertTime(seconds, second);

    function insertTime(selector, time) {
        for (let i = 0; i < selector.length; i++) {
            selector[i].innerHTML = ("0" + time).slice(-2);
        }
    }

    setTimeout(StartTimer, 1000);
}

export default StartTimer;
