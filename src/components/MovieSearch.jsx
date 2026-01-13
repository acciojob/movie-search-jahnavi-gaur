import React, { useState } from "react";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const API_KEY = "99eb9fd1";

 const searchMovies = () => {
  if (!query.trim()) {
    setError("Invalid movie name. Please try again.");
    setMovies([]);
    return;
  }

  fetch(`https://www.omdbapi.com/?s=${query}&apikey=99eb9fd1`)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "False") {
        setError("Invalid movie name. Please try again.");
        setMovies([]);
      } else {
        setMovies(data.Search);
        setError("");
      }
    })
    .catch(() => {
      setError("Something went wrong. Please try again.");
      setMovies([]);
    });
};


  return (
    <div className="container">
      <h1>🎬 Movie Search</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchMovies}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/200"
              }
              alt={movie.Title}
            />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
