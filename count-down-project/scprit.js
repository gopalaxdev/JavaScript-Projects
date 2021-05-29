
const dayEle = document.getElementsByClassName("days")[0];
const hourEle = document.getElementsByClassName("hours")[0];
const minEle = document.getElementsByClassName("min")[0];
const secEle = document.getElementsByClassName("sec")[0];

const newYears = '1 Jan 2022';

function countdown() {
    // console.log("Inside the function");
    var newYearsDate = new Date(newYears);
    var currentDate = new Date();

    var totalSeconds = (newYearsDate - currentDate) / 1000;

    var days = Math.floor(totalSeconds / 3600 / 24);

    var hours = Math.floor(totalSeconds / 3600) % 24;

    var mins = Math.floor(totalSeconds / 60) % 60;

    var seconds = Math.floor(totalSeconds % 60);
    //console.log(days, hours, mins, seconds);
    // Updating the inner element
    //console.log(dayEle);
    // document.getElementByClassName("days").innerHTML = days;
    dayEle.innerHTML = days;
    hourEle.innerHTML = formateTime(hours);
    minEle.innerHTML = formateTime(mins);
    secEle.innerHTML = formateTime(seconds);

}

// Initial call
countdown();

// Set Interval to 
setInterval(countdown, 1000);

function formateTime(time) {
    // console.log('0' + time);

    return (time < 10) ? `0${time}` : time;
}