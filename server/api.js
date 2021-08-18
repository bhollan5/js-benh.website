

//  SQL connection set up
var mysql = require('mysql');
var fs = require('fs');
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


//  
module.exports = function api_routes(route_name, request, response) {

    var api_route = route_name.split("/")[2];
    var api_param = route_name.split("/")[3];

    console.log(`Calling an API route: /api/${api_route}/${api_param}`);

    if (api_route == "get-wiki-pages") {
        con.query("SELECT * from wiki_pages;", function (err, result) {
            if (err) throw err;
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(JSON.stringify(result), 'utf-8');
        });
    }

    else if (api_route == "get-wiki-page") {
        var page_slug = request;
        con.query(`SELECT * FROM wiki_pages WHERE slug_name=${page_slug};`, function (err, result) {
            if (err) throw err;
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(JSON.stringify(result), 'utf-8');
        });
    }

    else if (api_route == "update-wiki-page") {
        console.log("Update wiki page called");
        var body = "";
        //  Getting POST data from HTTP call. 
        request.on("data", function (chunk) {
            body += chunk;
        });
        request.on("end", function (chunk) {
            console.log(body);
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end('dope', 'utf-8');
        });
        
        return;
        con.query(`INSERT INTO wiki_pages (page_title, page_content) 
                    VALUES (.title, .content) ;`, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(JSON.stringify(result), 'utf-8');
        });
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end('dope', 'utf-8');
    }
}

//  Adding a page 
function add_wiki_page(page_config) {
    var sql = "INSERT INTO wiki_pages (page_title, page_content) ";
    sql += "VALUES ('" + page_config.title + "', '" + page_config.content + "')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
}

function update_wiki_page(page_config) {

}

function get_wiki_page(page_id) {

}

function delete_wiki_page(page_id) {

}