import React from 'react'

const MovieCard = ({movie}) => {
    const posterUrl = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;

    const truncateString = (str, num) => {
        if (str?.length > num) {
          return str.slice(0, num) + "...";
        } else {
          return str;
        }
      };
  return (
    <div className="bg-white rounded-xl shadow-md transition transform hover:scale-90">
      <img src={posterUrl} alt={movie.title} className="w-full h-auto" />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{movie.title}</h2>
        <p className="text-gray-600">{movie.release_date}</p>
        <p className="text-gray-700 mt-2">{truncateString(movie.overview, 150)}</p>
        <div className="flex justify-between mt-4">
          <p className="text-blue-500">{movie.vote_average} / 10</p>
          <p className="text-gray-500">{movie.vote_count} votes</p>
        </div>
      </div>
    </div>
  )
}

export default MovieCard