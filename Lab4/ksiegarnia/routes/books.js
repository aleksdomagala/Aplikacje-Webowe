const express = require("express");
const db = require("../models/db");
const router = express.Router();

router.get("/", (req, res) => {
  db.all("SELECT * FROM books", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM books WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ error: "Książka nie znaleziona" });
    } else {
      res.json(row);
    }
  });
});

router.post("/", (req, res) => {
  const { title, author, year } = req.body;
  db.run(
    "INSERT INTO books (title, author, year) VALUES (?, ?, ?)",
    [title, author, year],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ id: this.lastID });
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM books WHERE id = ?", [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: "Książka nie znaleziona" });
    } else {
      res.json({ message: "Książka została usunięta" });
    }
  });
});

module.exports = router;
