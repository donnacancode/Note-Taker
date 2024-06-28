const express = require("express");
const path = require("path");
const app = express();
const PORT = 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));

// In-memory storage for notes
let notes = [];

// Route to serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Route to serve notes.html
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// API endpoint to get all notes
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// API endpoint to save a note
app.post("/api/notes", (req, res) => {
  const newNote = {
    id: Date.now(),
    title: req.body.title,
    text: req.body.text,
  };
  notes.push(newNote);
  res.json(newNote);
});

// API endpoint to delete a note
app.delete("/api/notes/:id", (req, res) => {
  const noteId = parseInt(req.params.id, 10);
  notes = notes.filter((note) => note.id !== noteId);
  res.json({ message: "Note deleted successfully" });
});

// Start the server
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
