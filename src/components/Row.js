import React, { useState, useEffect, useRef } from "react";
import axios from "../axios";
import "../style/Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isPoster }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const rowRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: { autoplay: 1 },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.original_name || movie?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  const scrollLeft = () => {
    const container = rowRef.current;
    const scrollAmount = container.clientWidth * 0.05; // 5% of container width
    const scrollDuration = 300; // Duration of scroll in milliseconds

    let start = null;

    const animateScroll = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percent = Math.min(progress / scrollDuration, 1);
      container.scrollLeft -= scrollAmount * percent;

      if (progress < scrollDuration) {
        window.requestAnimationFrame(animateScroll);
      } else {
        container.scrollLeft = Math.max(container.scrollLeft - scrollAmount, 0);
      }
    };

    window.requestAnimationFrame(animateScroll);
  };

  const scrollRight = () => {
    const container = rowRef.current;
    const scrollAmount = container.clientWidth * 0.05; // 5% of container width
    const scrollDuration = 300; // Duration of scroll in milliseconds
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    let start = null;

    const animateScroll = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percent = Math.min(progress / scrollDuration, 1);
      container.scrollLeft += scrollAmount * percent;

      if (progress < scrollDuration) {
        window.requestAnimationFrame(animateScroll);
      } else {
        container.scrollLeft = Math.min(container.scrollLeft + scrollAmount, maxScrollLeft);
      }
    };

    window.requestAnimationFrame(animateScroll);
  };

  return (
    <div className="row ml-5 mt-10">
      <h2 className="text-2xl font-bold text-white">{title}</h2>

      <div className="relative">
        <button className="arrow left-arrow" onClick={scrollLeft}>
          <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M11.56 5.56L10.5 4.5 6 9l4.5 4.5 1.06-1.06L8.12 9z"></path>
          </svg>
        </button>
        <div className="posters flex gap-x-4 overflow-y-hidden overflow-x-scroll p-5" ref={rowRef}>
          {movies.map((movie) => (
            <div key={movie.id}>
              <img
                onClick={() => handleClick(movie)}
                className={`poster hover:scale-105 ${isPoster && "bigPoster"}`}
                src={`${base_url}${isPoster ? movie.poster_path : movie.backdrop_path}`}
                alt={movie.name}
              />
              <h1 className="mt-4 text-center text-white">
                {movie?.name || movie?.original_name || movie?.title}
              </h1>
            </div>
          ))}
        </div>
        <button className="arrow right-arrow" onClick={scrollRight}>
          <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M6.44 5.56L7.5 4.5 12 9l-4.5 4.5-1.06-1.06L9.88 9z"></path>
          </svg>
        </button>
      </div>

      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
