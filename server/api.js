

//  SQL connection set up
var mysql = require('mysql');
var fs = require('fs');
const crypto = require('crypto');
var con; //  This will store our connection object.

function connect_to_db() {

    var mysql_pass = fs.readFileSync("./mysql_pass.txt");

    con = mysql.createConnection({
        host: "localhost",
        user: "ben",
        password: mysql_pass,
        database: "wikidb"
    });
      
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        // add_wiki_page({
        //     title: 'My Page',
        //     content: 'This is page content!'
        // })
    });
    
}
connect_to_db();


//  Returns a nicely displayed string, from a timer object.
function time_to_string(time_obj) {
    console.log("Converting this into a string:");
    console.log(time_obj);
    function two_place_num(num){
        if (num < 10) {
            return "0" + String(num);
        }
        return num;
    }
    return `${time_obj.h}:${two_place_num(time_obj.m)}:${two_place_num(time_obj.s)}`;
}


//  
module.exports = function api_routes(route_path, request, response) {

    var api_route = route_path[0];
    var api_param = route_path[1];
    var api_call_string = `/api/${api_route}`;
    if (api_param != undefined) {
        api_call_string += "/" + api_param;
    }
    console.log(`Calling an API route: ${api_call_string}`);
    

    if (api_route == "wiki-pages") {
        
        if (request.method == 'GET' && api_param == undefined) {
            con.query("SELECT * from wiki_pages;", function (err, result) {
                if (err) throw err;
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(JSON.stringify(result), 'utf-8');
            });

        } else if (request.method == 'GET') {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(`Called GET /wiki-pages/${api_param}`, 'utf-8');
            // var page_slug = request;
            // con.query(`SELECT * FROM wiki_pages WHERE slug_name=${page_slug};`, function (err, result) {
            //     if (err) throw err;
            //     response.writeHead(200, { 'Content-Type': 'text/html' });
            //     response.end(JSON.stringify(result), 'utf-8');
            // });
        } else if (request.method == 'POST') {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(`Called POST /wiki-pages`, 'utf-8');
            // var body = "";
            // //  Getting POST data from HTTP call. 
            // request.on("data", function (chunk) {
            //     body += chunk;
            // });
            // request.on("end", function (chunk) {
            //     console.log(body);
            //     response.writeHead(200, { 'Content-Type': 'text/html' });
            //     response.end('dope', 'utf-8');
            // });
            // con.query(`INSERT INTO wiki_pages (page_title, page_content) 
            //             VALUES (.title, .content) ;`, function (err, result) {
            //     if (err) throw err;
            //     console.log("1 record inserted");
            //     response.writeHead(200, { 'Content-Type': 'text/html' });
            //     response.end(JSON.stringify(result), 'utf-8');
            // });
        } else if (request.method == 'PUT') {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(`Called PUT /wiki-pages/:id`, 'utf-8');
            // var sql = "INSERT INTO wiki_pages (page_title, page_content) ";
            // sql += "VALUES ('" + page_config.title + "', '" + page_config.content + "')";
            // con.query(sql, function (err, result) {
            //     if (err) throw err;
            //     console.log("1 record inserted");
            // });
        }


    } else if (api_route == "time-entries") {

        if (request.method == 'GET' && api_param == undefined) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(`Called GET /time-entries`, 'utf-8');

        } else if (request.method == 'GET') {
            con.query(`SELECT * FROM time_entries WHERE date="${api_param}" ;`, function (err, result) {
                if (err) throw err;
                console.log("Fetched time entries.");
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(JSON.stringify(result), 'utf-8');
            });

        } else if (request.method == 'POST') {
            var entry = "";
            request.on('data', chunk => {
                entry += chunk;
            })
            request.on('end', () => {
                console.log(JSON.parse(entry)); 
                entry = JSON.parse(entry);
                con.query(`INSERT INTO time_entries (date, description, start_time, duration) 
                            VALUES ("${entry.date.split('T')[0]}", "${entry.description}", 
                                "${time_to_string(entry.start_time)}", "${time_to_string(entry.duration)}") ;`, function (err, result) {
                    if (err) throw err;
                    console.log("1 record inserted");
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(JSON.stringify(result), 'utf-8');
                });
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(`Called POST /time-entries`, 'utf-8');
            })
        }

    } else if (api_route == "login" && request.method == 'POST') {
        var credentials = "";
        request.on('data', chunk => {
            credentials += chunk;
        })
        request.on('end', () => {
            var credentials_obj = JSON.parse(credentials);
            var key = crypto.createHash("sha256").update(credentials_obj.password).digest();
            
            if (key.toString('hex') === "19a7c6ff85e7d1a7ad605ad7ab62f5e6b55aa5cf670e4b96fca399c2dbb6a2ab") {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(`Login successful!`, 'utf-8');
            } else {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(`Incorrect pass!`, 'utf-8');
            }
            
        })
        // console.log("Got here");
        // const key = crypto
        // .createHash("sha256")
        // .update(argv.key)
        // .digest(),
        
    }

} //  End of exported function api_routes(route_path, request, response)
