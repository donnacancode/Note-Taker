const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = 3001;
const notesFilePath = path.join(__dirname, "notes.json");

app.use(express.json());

// Function to read notes from the JSON file
const readNotes = () => {
  try {
    if (!fs.existsSync(notesFilePath)) {
      return [];
    }
    const data = fs.readFileSync(notesFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading notes:", error);
    return [];
  }
};

// Function to write notes to the JSON file
const writeNotes = (notes) => {
  try {
    fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing notes:", error);
  }
};

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));

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
  const notes = readNotes();
  res.json(notes);
});

// API endpoint to save a note
app.post("/api/notes", (req, res) => {
  const notes = readNotes();
  const newNote = {
    id: Date.now(),
    title: req.body.title,
    text: req.body.text,
  };
  notes.push(newNote);
  writeNotes(notes);
  res.json(newNote);
});

// API endpoint to delete a note
app.delete("/api/notes/:id", (req, res) => {
  let notes = readNotes();
  const noteId = parseInt(req.params.id, 10);
  notes = notes.filter((note) => note.id !== noteId);
  writeNotes(notes);
  res.json({ message: "Note deleted successfully" });
});

// Start the server
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
