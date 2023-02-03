var launchDate = 'Mar 08, 2023';
function getTimeRemaining(endtime) {
  var t = endtime - new Date().getTime();
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

$(document).ready(function() {

    
    function initializeClock(id, endtime) {
    var daysSpan = document.getElementsByClassName('days')[0];
    var hoursSpan = document.getElementsByClassName('hours')[0];
    var minutesSpan = document.getElementsByClassName('minutes')[0];
    var secondsSpan = document.getElementsByClassName('seconds')[0];
      function updateClock() {
        var t = getTimeRemaining(endtime);
    
        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
    
        if (t.total <= 0) {
          clearInterval(timeinterval);
        }
      }
    
      updateClock();
      var timeinterval = setInterval(updateClock, 1000);
    }
    
    var deadline = Date.parse(launchDate);
    initializeClock('countdown', deadline);

    });