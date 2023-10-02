import React from "react";
import { Link } from "react-router-dom";
const Movie = ({ item }) => {

  return (
    <Link to={`/home/movieDetails/${item.id}`}>
      <div className= "group-relative inline-block m-1 transition-transform">
          <div className="w-[48-px] sm:w-[320px] md:w-[360px] lg:w-[480px]  cursor-pointer relative p-2 m-1">
            <img className="w-full h-auto block" src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} alt={item?.title}/>
          </div>
      </div>
    </Link>
  );
};

export default Movie;