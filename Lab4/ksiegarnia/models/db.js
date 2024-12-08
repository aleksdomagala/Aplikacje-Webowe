const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db/database.db", (err) => {
  if (err) {
    console.error("Błąd przy połączeniu z bazą danych:", err.message);
  } else {
    console.log("Połączono z bazą danych SQLite.");
  }
});

module.exports = db;
