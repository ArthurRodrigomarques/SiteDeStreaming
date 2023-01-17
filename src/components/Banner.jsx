import React from 'react'
import categories, { getMovies } from '../api'
import { useEffect } from 'react'
import './banner.css'

const Banner = () => {
    const [movie, setMovie] = React.useState({})

    const fetchRamdomMovie = async () => {
        try {
            const netflixOriginalsCategory = categories.find((category) => category.name === "netflixOriginals");

           const data = await getMovies (netflixOriginalsCategory.path)
           const movies = data?.results
           const randomIndex = Math.floor(Math.random() * movies.length)
           setMovie(movies[randomIndex]);
        } catch (error) {
            console.log("Banner fetchRamdomMovie error:", error )
        }
    }
    useEffect(() => {
        fetchRamdomMovie()
    }, [])
    
  return (
    <header className='banner-container' style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        roundPosition: "center-center",
    }}>
        <div className='banner-content'>
            <h1 className="banner-title">
                {movie?.title || movie?.name || movie?.original_name}
            </h1>
            <div className='banner-button-container'>
                <button className="banner-button">
                    Assistir
                </button>
                <button className="banner-button">
                    Minha Lista
                </button>
            </div>
            <div className="banner-description">
                <h4>{movie?.overview}</h4>
            </div>
        </div>
    </header>
  )
}

export default Banner