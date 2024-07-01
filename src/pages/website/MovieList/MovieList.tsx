import { getAllMovieClient } from "@/services/movie/movieService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  genre: string;
  release_date: string;
  trailer: string;
  director: string;
  image: string;
  rated: number;
  actor: string;
  duration: number;
  status: string;
  description: string;
  // Add other relevant properties
}

const MovieList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filterMovies, setFilterMovies] = useState<Movie[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [genreFilter, setGenreFilter] = useState<string>("all");

  // const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    (async () => {
      const data = await getAllMovieClient();
      setMovies(data.data.movie);
      setFilterMovies(data.data.movie);
    })();
  }, []);

  const handleFilterChange = (status: string, genre: string) => {
    setStatusFilter(status);
    setGenreFilter(genre);

    let filtered = movies;
    if (status !== "all") {
      filtered = filtered.filter((movie) => movie.status === status);
    }
    if (genre !== "all") {
      filtered = filtered.filter((movie) => movie.genre.includes(genre));
    }
    setFilterMovies(filtered);
  };

  const handleStatusFilterChange = (status: string) => {
    handleFilterChange(status, genreFilter);
  };

  const handleGenreFilterChange = (genre: string) => {
    handleFilterChange(statusFilter, genre);
  };

  const genres = Array.from(new Set(movies.flatMap((movie) => movie.genre.split(', '))));
  return (
    <>
      <section className="banner-section">
        <div
          className="banner-bg bg_img bg-fixed"
          data-background="assets/images/banner/banner02.jpg"
        />
        <div className="container">
          <div className="banner-content">
            <h1 className="title bold">
              get <span className="color-theme">movie</span> tickets
            </h1>
            <p>
              Buy movie tickets in advance, find movie times watch trailers, read
              movie reviews and much more
            </p>
          </div>
        </div>
      </section>
      <section className="movie-section padding-top padding-bottom">
        <div className="container">
          <div className="row flex-wrap-reverse justify-content-center">
            <div className="col-sm-10 col-md-8 col-lg-3">
              <div className="widget-1 widget-check">
                <div className="widget-1-body">
                  <h6 className="subtitle">Language</h6>
                  <div className="check-area">
                    {genres.map((g, i) => (
                      <div onClick={() => handleGenreFilterChange(g)} key={i} className="form-group">
                        <input type="checkbox" name="lang" id={g} />
                        <label htmlFor="lang1">{g}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9 mb-50 mb-lg-0">
              <div className="filter-tab tab">
                <div className="filter-area">
                  <div className="filter-main">
                    <div className="left">
                      <div className="item">
                        <span className="show">Show :</span>
                        <select className="select-bar">
                          <option value={12}>12</option>
                          <option value={15}>15</option>
                          <option value={18}>18</option>
                          <option value={21}>21</option>
                          <option value={24}>24</option>
                          <option value={27}>27</option>
                          <option value={30}>30</option>
                        </select>
                      </div>
                      <div className="item">
                        <span className="show">Sort By :</span>
                        <div className="nice-select" tabIndex={0}>
                          <span className="current">Comming Soon</span>
                          <ul className="list">
                            <li
                              data-value="all"
                              onClick={() => handleStatusFilterChange("all")}
                              className="option focus selected"
                            >
                              All
                            </li>
                            <li
                              data-value="Coming Soon"
                              onClick={() =>
                                handleStatusFilterChange("Coming Soon")
                              }
                              className="option focus"
                            >
                              Coming Soon
                            </li>
                            <li
                              data-value="Currently Showing"
                              onClick={() =>
                                handleStatusFilterChange("Currently Showing")
                              }
                              className="option focus"
                            >
                              Now Show
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <ul className="grid-button tab-menu">
                      <li className="active">
                        <i className="fas fa-th" />
                      </li>
                      <li>
                        <i className="fas fa-bars" />
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="tab-area">
                  <div className="tab-item active">
                    <div className="row mb-10 justify-content-center">
                      {filterMovies.map((movie, index) => (
                        <div key={index} className="col-sm-6 col-lg-4">
                          <div className="movie-grid">
                            <div className="movie-thumb c-thumb">
                              <Link to={`/movie/detail/${movie.id}`}>
                                <img src={movie.image} alt="movie" />
                              </Link>
                            </div>
                            <div className="movie-content bg-one">
                              <h5 className="title m-0">
                                <Link to={`/movie/detail/${movie.id}`}>
                                  {movie.title}
                                </Link>
                              </h5>
                              <ul className="movie-rating-percent">
                                <li>
                                  <span className="content">{movie.genre}</span>
                                </li>
                                <li>
                                  <span className="content">
                                    {movie.duration} phút
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="pagination-area text-center">
                  <a href="#0">
                    <i className="fas fa-angle-double-left" />
                    <span>Prev</span>
                  </a>
                  <a href="#0">1</a>
                  <a href="#0">2</a>
                  <a href="#0" className="active">
                    3
                  </a>
                  <a href="#0">4</a>
                  <a href="#0">5</a>
                  <a href="#0">
                    <span>Next</span>
                    <i className="fas fa-angle-double-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MovieList;
