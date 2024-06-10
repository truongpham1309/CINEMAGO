import { bgTicket01 } from '@/assets/images/ticket';
import { getAllMovieClient } from '@/services/movie/movieService';
import React, { useEffect, useState } from 'react';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getAllMovieClient();
      setMovies(data.data.movie);
    })()
  }, []);

  return (
    <>
  <div
    className="search-tab bg_img"
    data-background={bgTicket01}
  >
    <div className="row align-items-center mb--20">
      <div className="col-lg-6 mb-20">
        <div className="search-ticket-header">
          <h6 className="category">welcome to Boleto </h6>
          <h3 className="title">what are you looking for</h3>
        </div>
      </div>
      <div className="col-lg-6 mb-20">
        <ul className="tab-menu ticket-tab-menu">
          <li className="active">
            <div className="tab-thumb">
              <img src="assets/images/ticket/ticket-tab01.png" alt="ticket" />
            </div>
            <span>movie</span>
          </li>
          <li>
            <div className="tab-thumb">
              <img src="E:\DATN\CINEMASWAY\src\assets\images\ticket\ticket-tab02.png" alt="ticket" />
            </div>
            <span>events</span>
          </li>
        </ul>
      </div>
    </div>
    <div className="tab-area">
      <div className="tab-item active">
        <form className="ticket-search-form">
          <div className="form-group large">
            <input type="text" placeholder="Search fo Movies" />
            <button type="submit">
              <i className="fas fa-search" />
            </button>
          </div>
          <div className="form-group">
            <div className="thumb">
              <img src="assets/images/ticket/city.png" alt="ticket" />
            </div>
            <span className="type">city</span>
            <select className="select-bar">
              <option value="london">London</option>
              <option value="dhaka">dhaka</option>
              <option value="rosario">rosario</option>
              <option value="madrid">madrid</option>
              <option value="koltaka">kolkata</option>
              <option value="rome">rome</option>
              <option value="khoksa">khoksa</option>
            </select>
          </div>
          <div className="form-group">
            <div className="thumb">
              <img src="assets/images/ticket/date.png" alt="ticket" />
            </div>
            <span className="type">date</span>
            <select className="select-bar">
              <option value="26-12-19">23/10/2020</option>
              <option value="26-12-19">24/10/2020</option>
              <option value="26-12-19">25/10/2020</option>
              <option value="26-12-19">26/10/2020</option>
            </select>
          </div>
          <div className="form-group">
            <div className="thumb">
              <img src="assets/images/ticket/cinema.png" alt="ticket" />
            </div>
            <span className="type">cinema</span>
            <select className="select-bar">
              <option value="Awaken">Awaken</option>
              <option value="dhaka">dhaka</option>
              <option value="rosario">rosario</option>
              <option value="madrid">madrid</option>
              <option value="koltaka">kolkata</option>
              <option value="rome">rome</option>
              <option value="khoksa">khoksa</option>
            </select>
          </div>
        </form>
      </div>
      <div className="tab-item">
        <form className="ticket-search-form">
          <div className="form-group large">
            <input type="text" placeholder="Search fo Events" />
            <button type="submit">
              <i className="fas fa-search" />
            </button>
          </div>
          <div className="form-group">
            <div className="thumb">
              <img src="assets/images/ticket/city.png" alt="ticket" />
            </div>
            <span className="type">city</span>
            <select className="select-bar">
              <option value="london">London</option>
              <option value="dhaka">dhaka</option>
              <option value="rosario">rosario</option>
              <option value="madrid">madrid</option>
              <option value="koltaka">kolkata</option>
              <option value="rome">rome</option>
              <option value="khoksa">khoksa</option>
            </select>
          </div>
          <div className="form-group">
            <div className="thumb">
              <img src="assets/images/ticket/date.png" alt="ticket" />
            </div>
            <span className="type">date</span>
            <select className="select-bar">
              <option value="26-12-19">23/10/2020</option>
              <option value="26-12-19">24/10/2020</option>
              <option value="26-12-19">25/10/2020</option>
              <option value="26-12-19">26/10/2020</option>
            </select>
          </div>
          <div className="form-group">
            <div className="thumb">
              <img src="assets/images/ticket/cinema.png" alt="ticket" />
            </div>
            <span className="type">event</span>
            <select className="select-bar">
              <option value="angular">angular</option>
              <option value="startup">startup</option>
              <option value="rosario">rosario</option>
              <option value="madrid">madrid</option>
              <option value="koltaka">kolkata</option>
              <option value="Last-First">Last-First</option>
              <option value="wish">wish</option>
            </select>
          </div>
        </form>
      </div>
      
    </div>
  </div>
  {/* ==========Ticket-Search========== */}
  {/* ==========Movie-Section========== */}
  <section className="movie-section padding-top padding-bottom">
    <div className="container">
      <div className="row flex-wrap-reverse justify-content-center">
        <div className="col-sm-10 col-md-8 col-lg-3">
          <div className="widget-1 widget-check">
            <div className="widget-header">
              <h5 className="m-title">Filter By</h5>{" "}
              <a href="#0" className="clear-check">
                Clear All
              </a>
            </div>
            </div>
          <div className="widget-1 widget-check">
            <div className="widget-1-body">
              <h6 className="subtitle">experience</h6>
              <div className="check-area">
                <div className="form-group">
                  <input type="checkbox" name="mode" id="mode1" />
                  <label htmlFor="mode1">2d</label>
                </div>
                <div className="form-group">
                  <input type="checkbox" name="mode" id="mode2" />
                  <label htmlFor="mode2">3d</label>
                </div>
              </div>
              <div className="add-check-area">
                <a href="#0">
                  view more <i className="plus" />
                </a>
              </div>
            </div>
          </div>
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
              </div>
            </div>
            <div className="tab-area">
              <div className="tab-item active">
                <div className="row mb-10 justify-content-center">
                  <div className="col-sm-6 col-lg-4">
                    <div className="movie-grid">
                      <div className="movie-thumb c-thumb">
                        <a href="movie-details.html">
                          <img
                            src="assets/images/movie/movie01.jpg"
                            alt="movie"
                          />
                        </a>
                      </div>
                      <div className="movie-content bg-one">
                        <h5 className="title m-0">
                          <a href="movie-details.html">alone</a>
                        </h5>
                        <ul className="movie-rating-percent">
                          <li>
                            <div className="thumb">
                               <span>{}</span> {/*map thời gian*/}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
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
}

export default MovieList;
