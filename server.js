const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const memeArray = [
  {
    id: 1,
    url:
      "https://imgix.bustle.com/inverse/ab/05/7a/0b/f70d/4363/8aab/a33a70bf1ae8/the-best-rick-morty-memes-can-replace-all-your-conversationsjpg.jpeg",
  },
  {
    id: 2,
    url:
      "https://imgix.bustle.com/inverse/18/61/c2/d3/64ae/440e/887f/d9e15fd98e9a/wake-up-switch-your-mind-off-come-home-switch-it-back-ongp5325201jpg.jpeg",
  },
  {
    id: 3,
    url:
      "https://imgix.bustle.com/inverse/2c/1f/71/db/f121/4d65/86ef/a3d943304245/636028500253434555-1061764753its-near-kansas-photo-u3jpg.jpeg",
  },
];

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

/**
 * Route to get memes in JSON format
 */
app.get("/api/memes", (req, res) => {
  // Return an array of memes
  // In JSON format
  res.json(memeArray);
});

/**
 * Route to get a single meme in JSON format
 */
app.get("/api/memes/:id", (req, res) => {
  // Find meme by id
  // Return that meme object
  // In JSON format
  for (let i = 0; i < memeArray.length; i++) {
    if (parseInt(req.params.id) === memeArray[i].id) {
      return res.json(memeArray[i]);
    }
  }
  return res.json("No match found");
});

/**
 * Route to create a new meme
 */
app.post("/api/memes", (req, res) => {
  // Grab req.body
  const newMeme = req.body;
  // Add the new meme object to the array
  memeArray.push(newMeme);
  // res.json the updated array;
  res.json(memeArray);
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
