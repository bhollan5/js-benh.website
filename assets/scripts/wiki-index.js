//  This script runs as soon as this page loads, loading in the wiki page data. 

var xhttp = new XMLHttpRequest();

var table_header = `<tr>
<th>page_id</th>
<th>page_slug</th>
<th>page_title</th>
<th>page_content</th>
<th>created_on</th>
<th>last_edited</th>
</tr>`;

// Response to 
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

        var blog_index_table = document.getElementById('blog-index');
        blog_index_table.innerHTML = table_header;
        // Typical action to be performed when the document is ready:
        var pages = JSON.parse(xhttp.responseText);
        for (var i = 0; i < pages.length; i++) {
            var page = pages[i];
            console.log(`Loading page:`);
            console.log(page);
            var blog_row = '<tr>';
            blog_row += `<td>${page.page_id}</td>`;
            blog_row += `<td>${page.page_slug}</td>`;
            blog_row += `<td><a href="/wiki/${page.page_slug}">${page.page_title}</a></td>`;
            blog_row += `<td>${page.page_content}</td>`;
            blog_row += `<td>${page.created_on}</td>`;
            blog_row += `<td>${page.last_edited}</td>`;
            blog_row += '</tr>';
            blog_index_table.innerHTML += blog_row;
        }
        
    }
};
xhttp.open("GET", "/api/wiki-pages", true);
xhttp.send();