import React, { useState } from 'react'
import axios from 'axios'
import MovieCard from './MovieCard'
const MovieSearch = () => {
  const [search,setSearch] = useState("")
  const [movies,setMovies] = useState([])

  const getAllMovies = (search) =>{
    const fetchURL = `https://api.themoviedb.org/3/search/movie?api_key=b1c12a786f1e0fdc808192ec33283661&language=en-US&query=${search}&page=1&include_adult=false`
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }

  return (
    <div className='m-4'>
    <div className="flex items-center justify-center bg-black">
      <div className="relative w-full max-w-md mx-4">
        <input value={search} type="text" placeholder="Search for movies, series, and more"
          className="w-full py-3 pl-10 text-white bg-transparent border-2 border-white rounded-full focus:outline-none focus:border-gray-500 text-base font-semibold"
         onChange={(e)=>{setSearch(e.target.value)}}/>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 absolute top-3 left-3 text-white opacity-50" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
<circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <button className="absolute top-3 right-3 text-white" onClick={getAllMovies(search)}>Search</button>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 m-3">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
    </div>
  )
}

export default MovieSearch