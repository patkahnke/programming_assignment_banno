# YouTube VideoSearch

Features:
  YouTube Search:
    Search YouTube, by keyword
    Return up to 50 videos at a time
    Display videos ten at a time
    Displayed thumbnails convert to autoplay embedded videos on click
    Ability to "favorite" videos, which adds them to a database
    Once "favorited," assign database search words to each video

  Favorites Search:
    Search "Favorites" database for saved videos, by search words
    Display all requested videos, ten at a time
    Displayed thumbnails convert to autoplay embedded videos on click
    Assign database search words to each video
    Delete videos

  Edit Search Words:
    Add or delete search words for organizing the "Favorites" database
    All current search words appear in a dropdown list for database search

## Getting Started (local server)

Clone or download the repository from Github:
```
https://github.com/patkahnke/programming_assignment_banno.git

```

Request a YouTube Data API key if you don't have one:

```
https://developers.google.com/youtube/v3/getting-started
```

Set up a PostgreSQL database. Name it what you like. User and password are optional, but if you set them, you may have to work with the connection strings in the three database routes files to find the format that works for your database:

```
Download and install PostgreSQL: https://www.postgresql.org/download/
Download a PostgreSQL client interface (Postico works well for Macs): https://eggerapps.at/postico/
If you need to adjust the connection strings:
line 7 in:
server/routes/favorites.js
server/routes/favoritesSearchWords.js
server/routes/searchWords.js)
```

Open a database connection using your client interface, then set up three tables in the database: "favorites," "search_words," and "favorites_search_words". The following code can be pasted directly into Postico to create the tables. Adjust accordingly for other client interfaces:

```
CREATE TABLE "public"."favorites" (
    "favorite_id" serial,
    "title" varchar(120),
    "videoid" varchar(20),
    "thumbnail" varchar(100),
    "date_added" varchar(50),
    PRIMARY KEY ("favorite_id")
);

CREATE TABLE "public"."search_words" (
    "search_word_id" serial,
    "search_word" varchar(50),
    PRIMARY KEY ("search_word_id")
);

CREATE TABLE "public"."favorites_search_words" (
    "id" serial,
    "search_word_id" integer,
    "favorite_id" integer,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("search_word_id") REFERENCES "public"."search_words"("search_word_id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("favorite_id") REFERENCES "public"."favorites"("favorite_id") ON DELETE CASCADE ON UPDATE CASCADE
);
```

Set the "youTubeAPIKey" and "database" environment variables, as well as "user" and "password" variables for the database you created (if needed):

```
Locate the envExample.js file in the root folder of the project: programming_assignment_banno/envExample.js
Rename it to env.js
Change the 'YOUR_API_KEY' field to your actual YouTube Data API Key
Change the 'YOUR_DATABASE_NAME' field to your actual database name
Change the database user and password variables, if needed. If none are required, leave unchanged.
```

Install the app and all its dependencies using Node Package Manager: https://www.npmjs.com/

```
npm install
```

Start the app:

```
npm start
```

View the app in a web browser:

```
http://localhost:3000/#/
```

## Built With:
Node.js
Express.js
AngularJS
PostgreSQL

## Created By:
Pat Kahnke
patkahnke@gmail.com

## Created On:
December 1, 2016
