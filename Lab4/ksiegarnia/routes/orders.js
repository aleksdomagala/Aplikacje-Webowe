const express = require("express");
const db = require("../models/db");
const authenticateToken = require("../middleware/authenticateToken");
const router = express.Router();

router.get("/:user_id", (req, res) => {
  const { user_id } = req.params;
  db.all("SELECT * FROM orders WHERE user_id = ?", [user_id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

router.post("/", authenticateToken, (req, res) => {
  const { book_id, quantity } = req.body;
  const user_id = req.user.id;

  db.get("SELECT * FROM books WHERE id = ?", [book_id], (err, book) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Błąd serwera podczas sprawdzania książki" });
    }
    if (!book) {
      return res
        .status(404)
        .json({ error: "Książka o podanym ID nie istnieje" });
    }

    db.run(
      "INSERT INTO orders (book_id, user_id, quantity) VALUES (?, ?, ?)",
      [book_id, user_id, quantity],
      function (err) {
        if (err) {
          res
            .status(500)
            .json({ error: "Błąd serwera podczas dodawania zamówienia" });
        } else {
          res
            .status(201)
            .json({ id: this.lastID, message: "Zamówienie zostało dodane" });
        }
      }
    );
  });
});

router.patch("/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const { book_id, quantity } = req.body;

  db.run(
    "UPDATE orders SET book_id = COALESCE(?, book_id), quantity = COALESCE(?, quantity) WHERE id = ?",
    [book_id, quantity, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (this.changes === 0) {
        res.status(404).json({ error: "Zamówienie nie znalezione" });
      } else {
        res.json({ message: "Zamówienie zostało zaktualizowane" });
      }
    }
  );
});

router.delete("/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM orders WHERE id = ?", [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: "Zamówienie nie znalezione" });
    } else {
      res.json({ message: "Zamówienie zostało usunięte" });
    }
  });
});

module.exports = router;
