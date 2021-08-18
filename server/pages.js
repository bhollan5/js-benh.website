var fs = require('fs');


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
    return render;
}

module.exports = function page_routes(route_name, request, response) {
    if (route_name == "/") { route_name = "/bio" }

    //  For pages like /wiki/:pageID
    if (route_name.split("/").length > 2) {
        route_name = "/" + route_name.split("/")[1];
    }
    route_name = './pages' + route_name + '.html';
    var content = get_page(route_name);
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(content, 'utf-8');
    return;
}