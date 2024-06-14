import { bgTicket01 } from "@/assets/images/ticket";
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

  useEffect(() => {
    (async () => {
      const data = await getAllMovieClient();
      setMovies(data.data.movie);
    })();
  }, []);

  return (
    <>
      <section className="movie-section padding-top padding-bottom">
        <div className="container">
          <div className="row flex-wrap-reverse justify-content-center">
            <div className="col-sm-10 col-md-8 col-lg-3">
              <div className="widget-1 widget-check">
                <div className="widget-1-body">
                  <h6 className="subtitle">genre</h6>
                  <div className="check-area">
                    <div className="form-group">
                      <input type="checkbox" name="genre" id="genre1" />
                      <label htmlFor="genre1">thriller</label>
                    </div>
                    <div className="form-group">
                      <input type="checkbox" name="genre" id="genre2" />
                      <label htmlFor="genre2">horror</label>
                    </div>
                    <div className="form-group">
                      <input type="checkbox" name="genre" id="genre3" />
                      <label htmlFor="genre3">drama</label>
                    </div>
                    <div className="form-group">
                      <input type="checkbox" name="genre" id="genre4" />
                      <label htmlFor="genre4">romance</label>
                    </div>
                    <div className="form-group">
                      <input type="checkbox" name="genre" id="genre5" />
                      <label htmlFor="genre5">action</label>
                    </div>
                    <div className="form-group">
                      <input type="checkbox" name="genre" id="genre6" />
                      <label htmlFor="genre6">comedy</label>
                    </div>
                    <div className="form-group">
                      <input type="checkbox" name="genre" id="genre7" />
                      <label htmlFor="genre7">romantic</label>
                    </div>
                    <div className="form-group">
                      <input type="checkbox" name="genre" id="genre8" />
                      <label htmlFor="genre8">animation</label>
                    </div>
                    <div className="form-group">
                      <input type="checkbox" name="genre" id="genre9" />
                      <label htmlFor="genre9">sci-fi</label>
                    </div>
                    <div className="form-group">
                      <input type="checkbox" name="genre" id="genre10" />
                      <label htmlFor="genre10">adventure</label>
                    </div>
                  </div>
                  <div className="add-check-area">
                    <a href="#0">
                      view more <i className="plus" />
                    </a>
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
                        <select className="select-bar">
                          <option value="showing">now showing</option>
                          <option value="exclusive">exclusive</option>
                          <option value="trending">trending</option>
                          <option value="most-view">most view</option>
                        </select>
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
                      {movies.map((movie, index) => (
                        <div key={index} className="col-sm-6 col-lg-4">
                          <div className="movie-grid">
                            <div className="movie-thumb c-thumb">
                              <Link to={`/movie/detail/${movie.id}`}>
                                <img
                                  src={movie.image}
                                  alt="movie"
                                />
                              </Link>
                            </div>
                            <div className="movie-content bg-one">
                              <h5 className="title m-0">
                                <Link to={`/movie/detail/${movie.id}`}>{movie.title}</Link>
                              </h5>
                              <ul className="movie-rating-percent">
                                <li>
                                  <span className="content">{movie.genre}</span>
                                </li>
                                <li>
                                  <span className="content">{movie.duration} phút</span>
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
