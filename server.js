const express = require("express");
const movieData = require("./data/movieData.json");
const jobs = require("./data/jobData.json");

const PORT = 2000;

const app = express();

app.use(express.static("public"));  

app.get("/api/movie", (req, res) => {
  const { genre } = req.query;

  let filteredMovies = movieData;
  if (genre) {
    filteredMovies = movieData.filter((movie) =>
      movie.movie_genres.toLowerCase().includes(genre.toLowerCase())
    );
  }

  res.json(filteredMovies);
});

app.get("/api/jobs", (req, res) => {
  const { title } = req.query;
  let filteredJobs = jobs;

  if (title) {
    filteredJobs = jobs.filter((job) =>
      job.job_title.toLowerCase().includes(title.toLowerCase())
    );
  }

  res.json(filteredJobs);
});

app.use((req, res) => {
  res.status(404).send("Not Found");
});

app.listen(PORT, () => {
  console.log(`Server runnning on http://localhost:${PORT}`);
});
