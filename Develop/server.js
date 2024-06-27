const express = require("express");
const path = require("path");
const app = express();
const PORT = 3001;

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

// Start the server
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
