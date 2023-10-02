import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import movieTrailer from 'movie-trailer'
import YouTube from "react-youtube";
import { AiFillCloseCircle } from "react-icons/ai";
import { useEffect } from 'react'
const MovieDetailsCard = () => {

    const {movieID} = useParams()
    
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [cond, setCon] = useState(false);

    const getAllMovies = async (movieID) => {
        console.log(movieID)
        const fetchURL = `https://api.themoviedb.org/3/movie/${movieID}?api_key=b1c12a786f1e0fdc808192ec33283661`;
      
        try {
          const response = await fetch(fetchURL);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          // Assuming `setMovies` is a state update function
          setMovies(data);
          console.log("movies is " ,movies)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

  useEffect(() => {
    getAllMovies(movieID)
  }, []);

  const handleClick = async () => {
    setCon(!cond);
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movies?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };
  const opts = {
    height: "530",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="w-full h-screen text-white">
      {!cond ? (
        <div className="w-full h-full">
          <div className="absolute w-full h-full"></div>
            <img
              className="w-full h-full object-cover"
              src={`https://image.tmdb.org/t/p/original/${movies.backdrop_path}`}
              alt={movies?.title}
            />
          <div className="absolute w-full top-[40%] p-4 md:p-8">
            <h1 className="text-3xl md:text-5xl font-bold">
              {movies?.title}
            </h1>
            <div className="my-4">
              <button
                className="border bg-gray-300 text-black border-gray-300 py-2 px-5 font-bold"
                onClick={handleClick}
              >
                Play
              </button>
              <button className="border text-white border-gray-300 py-2 px-5 ml-4 font-bold">
                Watch Later
              </button>
            </div>
            <p className="text-white text-sm font-semibold">
              Released: {movies?.release_date}
            </p>
            <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-white font-semibold">
              {movies?.overview}
            </p>
          </div>
        </div>
      ) : (
        <div className="pt-16">
          <div className="flex justify-end items-center">
            <div
              className="cursor-pointer p-2"
              onClick={() => {
                setCon(!cond);
              }}
            >
              <AiFillCloseCircle className="text-red-700 w-8 h-8" />
            </div>
          </div>
          <YouTube className="" videoId={trailerUrl} opts={opts} />
        </div>
      )}
    </div>
  );
}

export default MovieDetailsCard