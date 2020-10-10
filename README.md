# wikiAPI

An API developed with ExpressJS, NodeJs, and Mongoose, for a MongoDB article database.

## Features

Can perform CRUD operations on two endpoints: `/articles` and `/articles/:title`.

### Endpoint: `/articles`

Here you can perform the following operations:

- GET: gets all the available articles from the db.
- POST: submits an article to article db.
- DELETE: deletes all articles from article db.

### Endpoint: `/articles/:title`

Here you can perform the following operations:

- GET: gets an **specific** article from the db.
- PUT: overrides an existing article from the article db.
- PATCH: updates a specific attribute of an article in the db
- DELETE: deletes the specific article from the article db.
