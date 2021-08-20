var http = require('http');
var fs = require('fs');
var path = require('path');

var page_routes  = require("./pages.js");
var asset_routes = require("./assets.js");
var api_routes   = require("./api.js");

var port = 8080;


//  Request response function
http.createServer(function (request, response) {
    console.log('New request: ', request.url);

    //  Formatting the request to a file path. 
    var route_name = request.url;
    var extname = String(path.extname(route_name)).toLowerCase();

    //  SQL database API...
    if (route_name.split("/")[1] == "api") {
        var route_path = route_name.split('/');
        route_path.shift(); route_path.shift();
        api_routes(route_path, request, response);
    }

    //  Getting pages.
    else if (extname.length == 0) {
        page_routes(route_name, request, response);
    } 
    
    //  Getting assets.
    else {
        asset_routes('./assets/' + route_name, request, response);
    }

}).listen(port);
console.log(`Server running at http://127.0.0.1:${port}/`);

