
//  The wiki editor JS:
window.addEventListener('load', function () {

    //  Page data...
    var pathname = window.location.pathname;
    var page_data = {
        slug: pathname.split("/")[2],
        title: "",
        content: "",
    }
    page_buffer = {
        slug: pathname.split("/")[2],
        title: "",
        content: ""
    }
    var modified = false;
    
    

    //  Getting page data from the database. 
    if (page_data.slug != undefined) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                var pages = JSON.parse(xhttp.responseText);
            }
        };
        xhttp.open("GET", "/api/get-wiki-page/" + page_data.slug, true);
        xhttp.send();
    }

    //  Slug algorithm from https://stackoverflow.com/questions/1053902/how-to-convert-a-title-to-a-url-slug-in-jquery
    document.getElementById("page-title").addEventListener('input', (event) => {
        page_buffer.title = event.target.value;
        page_buffer.slug = event.target.value.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
        document.getElementById("page-slug").innerHTML = page_buffer.slug;
    });

    //  Getting the body content as well. 
    document.getElementById("page-content").addEventListener('input', (event) => {
        page_buffer.content = event.target.value;
    });

});

//  Publish those changes!
function publish() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            var pages = JSON.parse(xhttp.responseText);
        }
    };
    xhttp.open("POST", "/api/update-wiki-page/", true);
    xhttp.send(JSON.stringify(page_buffer));
}