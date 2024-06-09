import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Movie {
  id: number;
  title: string;
}

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch('https://api.example.com/movies') // Thay thế URL bằng URL API thực tế
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Movie List</h1>
      <ul className="list-none p-0">
        {movies.map(movie => (
          <li key={movie.id} className="mb-2">
            <Link to={`/movie/${movie.id}`} className="text-blue-600 hover:underline">
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
