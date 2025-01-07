import React from 'react'
import Loader from 'react-loader-spinner'

import MovieCard from '../MovieCard'
import NavBar from '../NavBar'
import Pagination from '../Pagination'

import './index.css'

class TopRated extends React.Component {
  state = {
    isLoading: true,
    topRatedMovieResponse: {},
  }

  componentDidMount() {
    this.getTopRatedMoviesResponse()
  }

  getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  getTopRatedMoviesResponse = async (page = 1) => {
    const API_KEY = 'ae861de2d1d132782b40b5743f1da7ea'
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
    this.setState({isLoading: true})

    try {
      const response = await fetch(apiUrl)
      const data = await response.json()
      const newData = this.getUpdatedData(data)
      this.setState({isLoading: false, topRatedMovieResponse: newData})
    } catch (error) {
      console.error('Error fetching top-rated movies:', error)
      this.setState({isLoading: false})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" height={50} width={50} />
    </div>
  )

  renderTopRatedMoviesList = () => {
    const {topRatedMovieResponse} = this.state
    const {results} = topRatedMovieResponse

    return (
      <ul className="movies-list">
        {results.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, topRatedMovieResponse} = this.state
    return (
      <>
        <NavBar />
        <div className="route-page-body">
          {isLoading
            ? this.renderLoadingView()
            : this.renderTopRatedMoviesList()}
        </div>
        {topRatedMovieResponse.totalPages && (
          <Pagination
            totalPages={topRatedMovieResponse.totalPages}
            apiCallback={this.getTopRatedMoviesResponse}
          />
        )}
      </>
    )
  }
}

export default TopRated
