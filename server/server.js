var http = require('http');
var fs = require('fs');
var path = require('path');

//  Extension types mapped to their MIME type (Multipurpose Internet Mail Extension)
var mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};

//  Request response function
http.createServer(function (request, response) {
    console.log('New request: ', request.url);

    //  Formatting the request to a file path. 
    var filePath = request.url;
    var extname = String(path.extname(filePath)).toLowerCase();

    //  Getting pages.
    if (extname.length == 0) {
        if (filePath == "/") { filePath = "/bio" }
        filePath = './pages' + filePath + '.html';
        var content = get_page(filePath);
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(content, 'utf-8');
        return;
    } 
    
    //  Getting assets.
    else {
        filePath = './assets/' + filePath;
    }

    var contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT') {
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(8080);
console.log('Server running at http://127.0.0.1:8080/');



//  Rendering web pages inside of index.html
function get_page(page_name) {  // page_name options: "/bio", "/plans", "/portfolio", "/wiki"
    var outer_content = fs.readFileSync('./index.html', 'utf-8');
    var page_content = "";
    try {
        page_content = fs.readFileSync(page_name, 'utf-8');
    } catch(err) {
        page_content = fs.readFileSync("./pages/404.html");
    }

    var page_parts = outer_content.split("<!-- INSERT CONTENT HERE -->");

    var render = page_parts[0] + page_content + page_parts[1];
    console.log(render);
    return render;
}


//  SQL-related 
var mysql = require('mysql');
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
        add_page_to_db({
            title: 'My Page',
            content: 'This is page content!'
        })
    });
    
}
connect_to_db();

//  Adding a page 
function add_page_to_db(page_config) {
    var sql = "INSERT INTO wiki_pages (page_title, page_content) ";
    sql += "VALUES ('" + page_config.title + "', '" + page_config.content + "')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
}
