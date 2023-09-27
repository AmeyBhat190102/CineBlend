import axios from "axios";
import React, { useEffect, useState } from "react";
import requests from "../Requests";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import { AiFillCloseCircle } from "react-icons/ai";

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [cond, setCon] = useState(false);

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);
  const handleClick = async () => {
    setCon(!cond);
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(selectedMovie?.title || "")
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

  useEffect(() => {
    if (movies.length > 0) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      setSelectedMovie(movies[randomIndex]);
    }
  }, [movies]);
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };
  return (
    <div className="w-full h-screen text-white">
      {!cond ? (
        <div className="w-full h-full">
          <div className="absolute w-full h-full"></div>
          {selectedMovie && (
            <img
              className="w-full h-full object-cover"
              src={`https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`}
              alt={selectedMovie?.title}
            />
          )}
          <div className="absolute w-full top-[40%] p-4 md:p-8">
            <h1 className="text-3xl md:text-5xl font-bold">
              {selectedMovie?.title}
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
              Released: {selectedMovie?.release_date}
            </p>
            <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-white font-semibold">
              {truncateString(selectedMovie?.overview, 150)}
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
};

export default Main;
