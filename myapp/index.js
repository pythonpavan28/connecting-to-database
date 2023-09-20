const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const dbpath = path.join(__dirname, "goodreads.db");
const app = express();
const initializeDBAndServer = async () => {
  try {
    let db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server running at localhost:3000");
    });
  } catch (e) {
    console.log(`Error Occured at ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get("/books/", async (request, response) => {
  const getBooksQuery = `SELECT * FROM book ORDER BY book_id`;
  const booksArray = await db.all(getBooksQuery);
  response.send(booksArray);
});
