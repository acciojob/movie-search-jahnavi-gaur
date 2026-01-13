import React, { useState } from "react";

const MovieSearch = () => {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!query.trim()) {
            setError("Invalid movie name. Please try again.");
            setMovies([]);
            return;
        }

        fetch(`https://www.omdbapi.com/?s=${query}&apikey=99eb9fd1`)
            .then((res) => res.json())
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
                setError("Invalid movie name. Please try again.");
                setMovies([]);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search movie..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {error && <p className="error">{error}</p>}

            <ul>
                {movies.map((movie, index) => (
                    <li key={`${movie.imdbID}-${index}`}>
                        <p>
                            {movie.Title} ({movie.Year})
                        </p>
                        <img
                            src={
                                movie.Poster !== "N/A"
                                    ? movie.Poster
                                    : "https://via.placeholder.com/150"
                            }
                            alt={movie.Title}
                        />
                        
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default MovieSearch;
