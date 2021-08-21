# benh.website

Vanilla JS with a NodeJS server, baby.

Run with `node server/server.js`.

<br/><br/><br/><br/>

## The API

The server's API is simple to use.

Database API routes start with `/api/`.  Other routes will get a web page, or a webpage asset.

Here are the routes for "time entries", for the time tracker:

```
GET /time-entries        # Retrieve a list of all saved time entries.
POST /time-entries       # Creates a new time entry in the table. 
PUT /time-entries/12     # Replace time entry with id 12. 
PATCH /time-entries/12   # Update time entry with id 12.
DELETE /time-entries/12  # Delete time entry with id 12.
```

<br/><br/>

Here are the routes for the "wiki-pages", for the blog:


```
GET /wiki-pages        # Retrieve a list of all saved time entries.
POST /wiki-pages       # Creates a new time entry in the table. 
PUT /wiki-pages/12     # Replace time entry with id 12. 
PATCH /wiki-pages/12   # Update time entry with id 12.
DELETE /wiki-pages/12  # Delete time entry with id 12.
```



<br/><br/>
<br/><br/>





