import React, { useState, useEffect } from "react";
import axios from "../axios";
import requests from "../requests";
import "../style/Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    //I have to use async & await bc i want to code to keep running while getting the data from API
    async function fetchData() {
      const request = await axios.get(requests.fetchTrending);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
    // I have to put this here bc every time something change in the data from api it load
  }, []);

  //i used this to to make less desrciption
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    //i used header insted of div bc it's the header of the page
    <header
      className="banner bg-center bg-cover object-contain text-white"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}
    >
      <div className="banner_cont ml-7 pt-64 h-48">
        <h1 className="text-5xl font-extrabold pb-1.5">
          {movie?.title || movie?.name || movie?.original_name}{" "}
        </h1>
        <div className="banner__btns">
          <button className="banner__btn">Play</button>
          <button className="banner__btn">My List</button>
        </div>
        <h1 className="banner__description text-sm pt-4 h-20">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="fade__bottom" />
    </header>
  );
}

export default Banner;
