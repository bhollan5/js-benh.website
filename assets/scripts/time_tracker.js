////  Timer
var entries = [];
var timer_function = null;        //  Stores a function called with onInterval
var timer = new_timer();          //  Stores the current timer. 

//  Create a new timer object.
function new_timer() {
    return {
        date: new Date(),
        task: "",
        start_time: {
            s: 0,
            m: 0,
            h: 0,
        },
        duration: {
            s: 0,
            m: 0,
            h: 0,
        }
    }
}

//  Start a new timer.
function start_timer() {
    if (localStorage.getItem('loggedIn') != 'true') {
        return;
    }
    var d = new Date();
    timer.start_time.s = d.getSeconds();
    timer.start_time.m = d.getMinutes();
    timer.start_time.h = d.getHours();

    document.getElementById('play-button').classList.add('hidden');
    document.getElementById('pause-button').classList.remove('hidden');
    timer_function = setInterval(timer_tick, 1000);
}

//  Update the current timer duration. 
function timer_tick() {
    if (timer.duration.s < 60) {
        timer.duration.s++;
    } else if (timer.duration.m < 60) {
        timer.duration.s = 0;
        timer.duration.m++;
    } else {
        timer.duration.s = 0;
        timer.duration.m = 0;
        timer.duration.h++;
    }
    document.getElementById('current-timer-display').innerHTML = time_to_string(timer);
}

//  Returns a nicely displayed string, from a timer object.
function time_to_string(timer) {
    function two_place_num(num){
        if (num < 10) {
            return "0" + String(num);
        }
        return num;
    }
    return `${timer.duration.h}:${two_place_num(timer.duration.m)}:${two_place_num(timer.duration.s)}`;
}
 
//  Stop the timer from recording, add the current entry to the entry list. 
function stop_timer() {
    document.getElementById('play-button').classList.remove('hidden');
    document.getElementById('pause-button').classList.add('hidden');
    timer.description = document.getElementById('current-task').value;
    clearInterval(timer_function);
    entries.push(timer);
    
    display_entries();
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function(response){
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            console.log("Submitted timer entry!");
            console.log(`Status: ${httpRequest.status}`);
            console.log(`Response: ${httpRequest.responseText}`);
        }
    };
    httpRequest.open('POST', '/api/time-entries', true);
    httpRequest.send(JSON.stringify(timer));
    timer = new_timer();
}

//  Clear & redraw the entries from the work timer. 
function display_entries() {
    var entry_log = document.getElementById('entries');
    entry_log.innerHTML = "";
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var new_entry = '<div class="entry">';
        new_entry += `<span class="description">${entry.description}</span>`;
        new_entry += `<span class="time-area">${time_to_string(entry)}</span>`;
        new_entry += `<span class="button-area"></span></div>`;
        entry_log.innerHTML += new_entry;
    }
}

//  Convert "19:13:36" to { h: 19, m: 13, s: 36}
function time_string_to_obj(time_string) {
    var parts = time_string.split(':');
    var time_obj = {
        h: Number(parts[0]),
        m: Number(parts[1]),
        s: Number(parts[2])
    }
    return time_obj;
}

//  For a string  
function parse_entries(entries_string) {
    var entries_array = JSON.parse(entries_string);
    for (var i = 0; i < entries_array.length; i++) {
        var entry = entries_array[i];
        entry.start_time = time_string_to_obj(entry.start_time);
        entry.duration = time_string_to_obj(entry.duration);
    } 
    entries = entries_array;
    display_entries();
}

//  Load entries for today's date. 
function load_entries() {
    console.log("Calling load_entries()");
    var date = new Date();
    date = date.toISOString();
    date = date.split('T')[0]; // Format the date like: 2021-08-20
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function(response){
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            // console.log("Recieved entries!");
            // console.log(`Status: ${httpRequest.status}`);
            // console.log(`Response: ${httpRequest.responseText}`);
            parse_entries(httpRequest.responseText);
        }
    };
    httpRequest.open('GET', '/api/time-entries/' + date, true);
    httpRequest.send();
}


//  Display the correct date at the top of the log. 
function load_date_display() {
    d = new Date();
    var month_num = d.getMonth()
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById('today-date').innerHTML = `Today -- ${months[month_num]} ${d.getDate()}`;
}

window.addEventListener('load', function () {
    load_date_display();
    load_entries();
    add_play_button_listener();
})


//  Scripts to disable the play button unless the user is logged in. 
function add_play_button_listener() {
    document.getElementById('play-button').addEventListener('mouseover', () => {
        if (localStorage.getItem('loggedIn') != 'true') {
            document.getElementById('tooltip').style.display = "block";
            document.getElementById('tooltip').innerHTML = 'Must be logged in to use the timer!';
        }
    })
    document.getElementById('play-button').addEventListener('mouseout', () => {
        document.getElementById('tooltip').style.display = "none";
    })

    //  We'll also disable it, if we're logged out. 
    document.getElementById('play-button').classList.add('disabled');
}