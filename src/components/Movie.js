import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";

const Movie = ({ item }) => {
  const [like, setLike] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [cond, setCon] = useState(false);

  const handleClick = async () => {
    setCon(true);
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(item?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
    console.log(trailerUrl);
  };
  const opts = {
    height: "300",
    width: "340",
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <div
      className={`group-relative inline-block m-1 transition-transform ${
        cond ? "scale-120" : "scale-100"
      }`}
      onClick={handleClick}
    >
      {!cond ? (
        <div className="w-[360px] sm:w-[260px] md:w-[240px] lg:w-[340px]  cursor-pointer relative p-2 m-1">
          <img
            className="w-full h-auto block"
            src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
            alt={item?.title}
          />
          <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
            <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
              {item?.title}
            </p>
            <p>
              {like ? (
                <FaHeart className="absolute top-4 left-4 text-gray-300" />
              ) : (
                <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
              )}
            </p>
          </div>
        </div>
      ) : (
        <div
          className="w-[360px] sm:w-[260px] md:w-[240px] lg:w-[340px]  cursor-pointer relative p-1 m-1 hidden group-hover:block"
          onMouseLeave={() => {
            setCon(false);
            setTrailerUrl("");
          }}
        >
          <YouTube videoId={trailerUrl} opts={opts} />
          <div>
            <div className="text-white">{item?.title}</div>
          </div>
        </div>
      )}  
    </div>
  );
};

export default Movie;
