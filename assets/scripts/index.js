////  DARK MODE / LIGHT MODE
var dark_mode = localStorage.getItem('darkMode');
if (dark_mode == 'false') {
    dark_mode = false;
} else {
    dark_mode = true;
}

//  Toggle dark mode.
function toggle_dark_mode() {
    dark_mode = !dark_mode;
    console.log(`Setting darkMode to: ${dark_mode}`);
    localStorage.setItem('darkMode', String(dark_mode));
    console.log(localStorage.getItem('darkMode'));
    set_dark_mode();
}
//  Switch the page to dark mode, or back to light mode.
function set_dark_mode() {
    var body = document.getElementsByTagName("BODY")[0];
    if (dark_mode == true) {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
}   

////  LOGGED IN?
var loggedIn = localStorage.getItem('loggedIn');
console.log(`Logged in: ${loggedIn}`);

window.addEventListener('load', function () {
    if (loggedIn == 'true') {
        document.getElementById('log-out').style.display = 'block';
    }
});
function logout() {
    localStorage.setItem('loggedIn', 'false');
    document.getElementById('log-out').style.display = 'none';
}


////  ACTIVE LINK HIGHLIGHTS
function highlight_nav() {
    var pathname = window.location.pathname;
    console.log(pathname);
    var nav_links = document.getElementById("nav-links").children;
    for (var i = 0; i < nav_links.length; i++) {
        if (nav_links[i].getAttribute("href") == pathname) {
            nav_links[i].classList.add("selected");
        } else {
            nav_links[i].classList.add("gray");
        }
    }
    set_dark_mode();
}



////  TOOLTIP
window.addEventListener('mousemove', e => {
    var tooltip = document.getElementById('tooltip');
    tooltip.style.top = (e.clientY - 60) + "px";
    tooltip.style.left = (e.clientX - 60) + "px";
});

