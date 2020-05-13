const timeDisp = document.querySelector('.timer');
const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const resumeBtn = document.querySelector('.resume');
const timeInfo = document.querySelector('.timer-info');
const form = document.querySelector('.duration');
const reset = document.querySelector('.reset');
let duration;
let htmlBase = `<span class='text-warning display-1 timer'>`

// REGEX FOR INPUT
const pattern = /^([1-9]|[1-5][0-9]|60)$/;

form.addEventListener('submit', e => {
    e.preventDefault();
    let userInput = form.minutes.value;
    const valid = pattern.test(userInput); 
    
    if(valid && !timeDisp.classList.contains('live')) {
        duration = userInput * 60 * 1000;
        let minutesRemainder = Math.floor(duration / 1000 / 60 );
        let secondsRemainder;
        if(minutesRemainder) {
            secondsRemainder = (duration / 1000) % (minutesRemainder * 60); 
        } else {
            secondsRemainder = duration  / 1000;
        } 
            let timer = setInterval(()=>{
                let template = `${htmlBase}${minutesRemainder}:${secondsRemainder}</span>`;
                if (duration) {
                    duration -=1000;
                    if( secondsRemainder < 1) {
                        minutesRemainder--;
                        secondsRemainder = 59;
                    } else if (secondsRemainder) {
                        secondsRemainder--;
                    };
                    if( duration < 60000) {
                        timeInfo.textContent = 'Session almost over';
                    }
                    stopTimer(timer, duration);
                } else {
                    template = `${htmlBase}00:00</span>`;
                    clearInterval(timer);
                    timeDisp.classList.remove('live');
                    timeInfo.classList.add('d-none');
                }
                updateUI(minutesRemainder, secondsRemainder, timeDisp);
            }, 1000)
            timeDisp.classList.add('live');
            timeInfo.classList.remove('d-none');
    } else {
        form.reset();
    }
});

// const startTimer = (minutesRemainder, secondsRemainder, duration) => {
//         let template = `<span>${minutesRemainder}:${secondsRemainder}<span>`;
//         if (duration) {
//             duration -=1000;
//             console.log( duration, minutesRemainder, secondsRemainder);
//             if( secondsRemainder < 1) {
//                 minutesRemainder--;
//                 secondsRemainder = 59;
//             } else if (secondsRemainder) {
//                 secondsRemainder--;
//             }
//         } else {
//             template = `<span>00:00<span>`;
//             clearInterval(timer);
//             console.log('interval cleared');
//         }
//         updateUI(minutesRemainder, secondsRemainder, timeDisp);
// }


const stopTimer = (interval, time) => {
    reset.addEventListener('click', () => {
        clearInterval(interval);
        time = 0;
        timeDisp.classList.remove('live');
        timeDisp.innerHTML = `${htmlBase}00:00</span>`;
        timeInfo.classList.add('d-none');
    });
}

let updateUI = (minutesRemainder, secondsRemainder, element) => {

    if (duration === 0) {
        template = `${htmlBase}00:00</span>`;
    } 
    else if (minutesRemainder > 10 && secondsRemainder < 10) {
        template = `${htmlBase}${minutesRemainder}:0${secondsRemainder}</span>`;
    } 
    else if (minutesRemainder > 10 && secondsRemainder > 1 ) {
        template = `${htmlBase}${minutesRemainder}:${secondsRemainder}</span>`;
    } 
    else if(minutesRemainder > 10 && secondsRemainder < 1 ) {
        template = `${htmlBase}${minutesRemainder}:${secondsRemainder}0</span>`;
    } 
    else if(minutesRemainder < 10 && secondsRemainder < 10) {
        template = `${htmlBase}0${minutesRemainder}:0${secondsRemainder}</span>`;
    } 
    else if(minutesRemainder < 10 && secondsRemainder > 1 ) {
        template = `${htmlBase}0${minutesRemainder}:${secondsRemainder}</span>`;
    } 
    else if(minutesRemainder < 10 && secondsRemainder < 1) {
        template = `${htmlBase}0${minutesRemainder}:${secondsRemainder}0</span>`;
    } 
    else if(duration < 60000) {
        template = `${htmlBase}00:${secondsRemainder}</span>`;
    } 
    else if(minutesRemainder < 1 && secondsRemainder < 10) {
        template = `${htmlBase}00:0${secondsRemainder}</span>`;
    } 
    element.innerHTML = template;
}