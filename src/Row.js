import React, { useEffect, useState } from 'react'
import axios from './axios'
import "./Row.css"
import YouTube from "react-youtube";
// import movieTrailer from "movie-trailer";

// eslint-disable-next-line no-unused-vars
const base_url = "https://image.tmdb.org/t/p/original/"

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl, trailerurl] = useState("");

    useEffect(() => {
        // if [], run once when the row loads, and dont run again.
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    },[fetchUrl]);
    
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1
        }
    };

    const handleClick = async (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            let trailerurl = await axios.get(`/movie/${movie.id}/videos?api_key=857730d7692e6bc20b00af46874b4a75`)
            };
            setTrailerUrl(trailerurl.data.results)
        }


    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">
                {movies.map((movie) => movie.backdrop_path !== null && (
                    <img key={movie.id}
                    onClick={() => handleClick(movie)}
                     className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                      src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                       alt={movie.name}/>
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} /> }

        </div>
    )
}

// https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png
export default Row;