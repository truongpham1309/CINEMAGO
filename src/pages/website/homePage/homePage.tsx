import { Movie2 } from '@/assets/images/movie';
import { getAllMovieHomePage } from '@/services/movie/movieService';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
const HomePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    (async () => {
      const data = await getAllMovieHomePage();
      setMovies(data.data.movie);
    })()
  }, []);
  console.log(movies);
  return (
    <>
      <section className="search-ticket-section padding-top pt-lg-0">
        <div className="container">
          <div
            className="search-tab bg_img"
            data-background="assets/images/ticket/ticket-bg01.jpg"
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
                      <img
                        src="assets/images/ticket/ticket-tab01.png"
                        alt="ticket"
                      />
                    </div>
                    <span>movie</span>
                  </li>
                  <li>
                    <div className="tab-thumb">
                      <img
                        src="assets/images/ticket/ticket-tab02.png"
                        alt="ticket"
                      />
                    </div>
                    <span>events</span>
                  </li>
                  <li>
                    <div className="tab-thumb">
                      <img
                        src="assets/images/ticket/ticket-tab03.png"
                        alt="ticket"
                      />
                    </div>
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
                      <option value="26-12-19">23/10/2019</option>
                      <option value="26-12-19">24/10/2019</option>
                      <option value="26-12-19">25/10/2019</option>
                      <option value="26-12-19">26/10/2019</option>
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
                      <option value="26-12-19">23/10/2019</option>
                      <option value="26-12-19">24/10/2019</option>
                      <option value="26-12-19">25/10/2019</option>
                      <option value="26-12-19">26/10/2019</option>
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
        </div>
      </section>
     
     
      {/* <section className="movie-section padding-top padding-bottom bg-two">
        <div className="container">
          <div className="row flex-wrap-reverse justify-content-center">
           
            <div className="col-lg-12">
              <div className="article-section padding-bottom">
                <div className="section-header-1">
                  <h2 className="title">movies</h2>
                  <Link to={`/movie`} className="view-all">
                    View All
                  </Link>
                </div>
                <div className="row mb-30-none justify-content-center">
                 {movies.map((movie,index) => (
                  <div key={index} className="col-sm-6 col-lg-4">
                    <div className="movie-grid">
                      <div className="movie-thumb c-thumb">
                        <Link to={`/movie/detail/:id`}>
                          <img src={movie.image} alt="movie" />
                        </Link>
                      </div>
                      <div className="movie-content bg-one">
                        <h5 className="title m-0">
                          <a href="#0">{movie.title}</a>
                        </h5>
                        <ul className="movie-rating-percent">
                          <li>
                            <div className="thumb">
                              <img
                                src="./assets/images/movie/tomato.png"
                                alt="movie"
                              />
                            </div>
                            <span className="content">88%</span>
                          </li>
                          <li>
                            <div className="thumb">
                              <img src="./assets/images/movie/cake.png" alt="movie" />
                            </div>
                            <span className="content">88%</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
              </div>
              <div className="article-section padding-bottom">
                <div className="section-header-1">
                  <h2 className="title">events</h2>
                  <a className="view-all" href="events.html">
                    View All
                  </a>
                </div>
                <div className="row mb-30-none justify-content-center">
                  <div className="col-sm-6 col-lg-4">
                    <div className="event-grid">
                      <div className="movie-thumb c-thumb">
                        <a href="#0">
                          <img src="./assets/images/event/event01.jpg" alt="event" />
                        </a>
                        <div className="event-date">
                          <h6 className="date-title">28</h6>
                          <span>Dec</span>
                        </div>
                      </div>
                      <div className="movie-content bg-one">
                        <h5 className="title m-0">
                          <a href="#0">Digital Economy Conference 2020</a>
                        </h5>
                        <div className="movie-rating-percent">
                          <span>327 Montague Street</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-lg-4">
                    <div className="event-grid">
                      <div className="movie-thumb c-thumb">
                        <a href="#0">
                          <img src="./assets/images/event/event02.jpg" alt="event" />
                        </a>
                        <div className="event-date">
                          <h6 className="date-title">28</h6>
                          <span>Dec</span>
                        </div>
                      </div>
                      <div className="movie-content bg-one">
                        <h5 className="title m-0">
                          <a href="#0">web design conference 2020</a>
                        </h5>
                        <div className="movie-rating-percent">
                          <span>327 Montague Street</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-lg-4">
                    <div className="event-grid">
                      <div className="movie-thumb c-thumb">
                        <a href="#0">
                          <img src="./assets/images/event/event03.jpg" alt="event" />
                        </a>
                        <div className="event-date">
                          <h6 className="date-title">28</h6>
                          <span>Dec</span>
                        </div>
                      </div>
                      <div className="movie-content bg-one">
                        <h5 className="title m-0">
                          <a href="#0">digital thinkers meetup</a>
                        </h5>
                        <div className="movie-rating-percent">
                          <span>327 Montague Street</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

    </>
  );
}

export default HomePage;
