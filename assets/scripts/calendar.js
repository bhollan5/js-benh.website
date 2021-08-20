//  Shifting the calendar forward or backward.
var d = new Date();
var month_shift = 0;
var year_shift = 0;

function shift_calendar(direction) {
    d = new Date();
    month_shift += direction;
    if (d.getMonth() + month_shift >= 12) {
        month_shift = 0 - d.getMonth();
        year_shift++;
    } else if (d.getMonth() + month_shift < 0) {
        month_shift = 11 - d.getMonth();
        year_shift--;
    }
    populate_calendar();
}

//  Drawing the calendar
function populate_calendar() {

    d = new Date();
    var month_num = d.getMonth() + month_shift;
    var year = d.getFullYear() + year_shift;
    d.setMonth(month_num);
    d.setFullYear(year);

    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var month_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var month = months[month_num];
    document.getElementById('month').innerHTML = month;

    document.getElementById('year').innerHTML = year;

    //  Drawing days
    document.getElementById('days').innerHTML = "";
    var current_day = d.getDate();
    if (month_shift != 0 || year_shift != 0) {
        current_day = -1;
    }
    d.setDate(1);
    var starting_weekday = d.getDay();
    //  Padding the beginning of the month
    for (var i = 0; i < starting_weekday; i++) {
        document.getElementById('days').innerHTML += "<li></li>";
    }
    //  Drawing the month's days.
    var month_day_amt = month_days[month_num];
    for (var i = 1; i <= month_day_amt; i++) {
        if (i == current_day) {
            document.getElementById('days').innerHTML += `<li id="current-day">${i}</li>`;
        } else {
            document.getElementById('days').innerHTML += `<li>${i}</li>`;
        }
    }
    //  Padding the end of the month
    d.setDate(month_day_amt);
    var last_weekday = d.getDay();
    for (var i = last_weekday; i < 8; i++) {
        document.getElementById('days').innerHTML += "<li></li>";
    }
}
window.addEventListener('load', function () {
    populate_calendar();
    display_entries();
});