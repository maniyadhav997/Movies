import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {movieDetails} = props
  const {id, title, posterPath, voteAverage} = movieDetails

  return (
    <li className="movie-card-container col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex flex-column align-items-center">
      <img
        className="movie-card-image"
        alt={title}
        src={posterPath}
        aria-label={`Poster image of ${title}`}
      />
      <div className="movie-info d-flex flex-column align-items-center mt-3">
        <h2 className="movie-title m-0">{title}</h2>
        <p className="movie-rating mb-0 ms-1">Rating: {voteAverage}</p>
      </div>
      <Link to={`/movie/${id}`} className="mt-auto w-100">
        <button
          className="btn btn-outline-success w-100"
          type="button"
          aria-label={`View details of ${title}`}
        >
          View Details
        </button>
      </Link>
    </li>
  )
}

export default MovieCard
