const ApiFetch = async (apiUrl) => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("network was not ok");
    console.log(response);
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// display movie card
const displayMovies = (movies) => {
  const movie_list = document.getElementById("movie_list");

  movies.map((item) => {
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
    movie_genres.textContent = `movie_genres: ${item.movie_genres}`;

    const date = document.createElement("p");
    date.className = "text-gray-200 mb-2";
    date.textContent = `Realease Date: ${item.release_date}`;

    const rating = document.createElement("p");
    rating.className = "text-gray-200";
    rating.textContent = `Rating: ${item.vote_average}`;

    card.appendChild(title);
    card.appendChild(image);
    card.appendChild(overview);
    card.appendChild(movie_genres);
    card.appendChild(date);
    card.appendChild(rating);

    movie_list.appendChild(card);
  });
};
const movies = async () => {
  const moviesData = [];
  const data = await ApiFetch(`/api/movie`);
  if (data) {
    console.log(data);
    moviesData.push(...data);
    displayMovies(moviesData);
  } else {
    alert("no results found !! truy again");
  }

  //search funtionality and Add event listener to the search button

  document.querySelector(".search_btn").addEventListener("click", (e) => {
    e.preventDefault();
    const inputvalue = document.getElementById("inputvalue");
    const text = inputvalue.value.trim().toLowerCase();
    const filteredData = moviesData.filter((movie) => {
      return (
        movie.title.toLowerCase().includes(text) ||
        movie.movie_genres.toLowerCase().includes(text) ||
        movie.release_date.includes(text)
      );
      console.log(filteredData);
    });
    displayMovies(filteredData);
  });
};
movies();

const jobs = async () => {
  // const data = await ApiFetch(`/api/jobs?title=${title}`);
  const data = await ApiFetch(`/api/jobs`);

  console.log("jobData", data);

  const body = document.querySelector(".body");
  data.map((employee) => {
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

    // Append cells to the row
    row.appendChild(emp_IdCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(emailCell);
    row.appendChild(genderCell);
    row.appendChild(jobTitleCell);

    // Append the row to the body
    body.appendChild(row);
  });
};

jobs();
