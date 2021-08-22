
//  Submit the login
function submit_login() {
    var credentials = {
        username: document.getElementById('username-field').value,
        password: document.getElementById('password-field').value
    }

    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function(response){
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            console.log("Pinged /api/login! ");
            console.log(`Status: ${httpRequest.status}`);
            console.log(`Response: ${httpRequest.responseText}`);
            if (httpRequest.responseText == "Login successful!") {
                localStorage.setItem('loggedIn', "true");
                document.getElementById('log-out').style.display = 'block';
            }
        }
    };
    httpRequest.open('POST', '/api/login', true);
    httpRequest.send(JSON.stringify(credentials));
}