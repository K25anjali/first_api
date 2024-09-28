const ApiFetch = async (apiUrl) => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Network response was not ok");
    console.log(response);
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// display movie card
const displayMovies = (movies) => {
  const movie_list = document.getElementById("movie_list");
  movie_list.innerHTML = '';

  const fragment = document.createDocumentFragment();

  movies.forEach((item) => {
    const card = document.createElement("div");
    card.className = "bg-zinc-700 text-white p-4 rounded shadow";

    const title = document.createElement("h3");
    title.className = "text-xl font-semibold text-gray-100 mb-4";
    title.textContent = `Title: ${item.title}`;

    const image = document.createElement("img");
    image.className = "mb-4 rounded";
    image.src = `${item.image_url}`;

    const overview = document.createElement("p");
    overview.className = "text-gray-200 mb-2";
    overview.textContent = `Overview: ${item.overview}`;

    const movie_genres = document.createElement("p");
    movie_genres.className = "text-gray-200 mb-2";
    movie_genres.textContent = `Genres: ${item.movie_genres}`;

    const date = document.createElement("p");
    date.className = "text-gray-200 mb-2";
    date.textContent = `Release Date: ${item.release_date}`;

    const rating = document.createElement("p");
    rating.className = "text-gray-200";
    rating.textContent = `Rating: ${item.vote_average}`;

    card.append(title, image, overview, movie_genres, date, rating);
    fragment.appendChild(card);
  });

  movie_list.appendChild(fragment);
};

const movies = async () => {
  const moviesData = await ApiFetch(`/api/movie`);
  if (moviesData) {
    console.log(data);
    displayMovies(moviesData);
  }

  // search functionality
  document.querySelector(".search_btn").addEventListener("click", (e) => {
    e.preventDefault();
    const inputvalue = document.getElementById("inputvalue")
    const searchQuery = inputvalue.value.trim().toLowerCase();

    const filteredMovies = moviesData.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery) ||
      movie.movie_genres.toLowerCase().includes(searchQuery) ||
      movie.release_date.includes(searchQuery)
    );
    console.log(filteredMovies);
    displayMovies(filteredMovies);
  });
};

// display job data
const displayJobs = (jobs) => {
  const body = document.querySelector(".body");
  body.innerHTML = '';

  const fragment = document.createDocumentFragment();

  jobs.forEach((employee) => {
    const row = document.createElement("tr");

    const emp_IdCell = document.createElement("td");
    emp_IdCell.className = "border border-gray-300 p-2";
    emp_IdCell.textContent = employee.id;

    const firstNameCell = document.createElement("td");
    firstNameCell.className = "border border-gray-300 p-2";
    firstNameCell.textContent = employee.first_name;

    const lastNameCell = document.createElement("td");
    lastNameCell.className = "border border-gray-300 p-2";
    lastNameCell.textContent = employee.last_name;

    const emailCell = document.createElement("td");
    emailCell.className = "border border-gray-300 p-2";
    emailCell.textContent = employee.email;

    const genderCell = document.createElement("td");
    genderCell.className = "border border-gray-300 p-2";
    genderCell.textContent = employee.gender;

    const jobTitleCell = document.createElement("td");
    jobTitleCell.className = "border border-gray-300 p-2";
    jobTitleCell.textContent = employee.job_title;

    row.append(emp_IdCell, firstNameCell, lastNameCell, emailCell, genderCell, jobTitleCell);
    fragment.appendChild(row);
  });

  body.appendChild(fragment);
};

const jobs = async () => {
  const jobsData = await ApiFetch(`/api/jobs`);
  if (jobsData) {
    console.log("jobData", jobsData);
    displayJobs(jobsData);
  }

  // filter
  document.getElementById("selectJobTitle").addEventListener("change", async (e) => {
    const jobTitle = e.target.value.toLowerCase();
    const filteredJobs = jobsData.filter((job) =>
      job.job_title.toLowerCase().includes(jobTitle)
    );
    displayJobs(filteredJobs);
  });
};

movies();
jobs();
