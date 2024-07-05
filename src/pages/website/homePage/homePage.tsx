import { getAllMovieHomePage } from "@/services/movie/movieService";
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
const HomePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [statusMovie, setStatusMovie] = useState<number>(1);
  useEffect(() => {
    (async () => {
      const data = await getAllMovieHomePage(statusMovie);
      setMovies(data.data.movie);
      console.log(data.data.movie);
    })();
  }, [statusMovie]);

  return (
    <>
      <section className="banner-section">
        <div
          className="banner-bg bg_img bg-fixed"
          data-background="/src/assets/images/banner/banner01.jpg"
        />
        <div className="container">
          <div className="banner-content">
            <h1 className="title  cd-headline clip">
              <span className="d-block">book your</span> tickets for
              <span className="color-theme cd-words-wrapper p-0 m-0">
                <b className="is-visible">Movie</b>
                <b>Event</b>
                <b>Sport</b>
              </span>
            </h1>
            <p>
              Safe, secure, reliable ticketing.Your ticket to live
              entertainment!
            </p>
          </div>
        </div>
      </section>

      <section className="movie-section padding-top padding-bottom">
        <div className="container">
          <div className="tab">
            <div className="section-header-2">
              <div className="left">
                <h2 className="title">movies</h2>
                <p>Be sure not to miss these Movies today.</p>
              </div>
              <ul className="tab-menu">
                <li
                  className="active"
                  onClick={() => {
                    setStatusMovie(1);
                  }}
                >
                  now showing
                </li>
                <li
                  onClick={() => {
                    setStatusMovie(2);
                  }}
                >
                  coming soon
                </li>
              </ul>
            </div>
            <div className="mb-30-none">
              <div className="tab-item active">
                <div className="owl-carousel owl-theme tab-slider owl-loaded owl-drag">
                  <div className="owl-stage-outer">
                    <div className="owl-stage row m-0">
                      {movies.map((movie, index) => (
                        <div className="owl-item col-3" key={index}>
                          <div className="item">
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
                                  <li className="w-100">
                                    <span className="content">
                                      {"Thể loại: " + movie.genre}
                                    </span>
                                  </li>
                                  <li className="w-100">
                                    <span className="content">
                                      {"Thời lượng: " + movie.duration}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section class="event-section padding-top padding-bottom bg-four">
        <div class="container">
            <div class="tab">
                <div class="section-header-2">
                    <div class="left">
                        <h2 class="title">events</h2>
                        <p>Be sure not to miss these Event today.</p>
                    </div>
                    <ul class="tab-menu">
                        <li class="active">
                            now showing 
                        </li>
                        <li>
                            coming soon
                        </li>
                        <li>
                            exclusive
                        </li>
                    </ul>
                </div>
                <div class="tab-area mb-30-none">
                    <div class="tab-item active">
                        <div class="owl-carousel owl-theme tab-slider">
                            <div class="item">
                                <div class="event-grid">
                                    <div class="movie-thumb c-thumb">
                                        <Link to="#0">
                                            <img src="/src/assets/images/event/event01.jpg" alt="event">
                                        </Link>
                                        <div class="event-date">
                                            <h6 class="date-title">28</h6>
                                            <span>Dec</span>
                                        </div>
                                    </div>
                                    <div class="movie-content bg-one">
                                        <h5 class="title m-0">
                                            <Link to="#0">Digital Economy Conference 2020</Link>
                                        </h5>
                                        <div class="movie-rating-percent">
                                            <span>327 Montague Street</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="event-grid">
                                    <div class="movie-thumb c-thumb">
                                        <Link to="#0">
                                            <img src="/src/assets/images/event/event02.jpg" alt="event">
                                        </Link>
                                        <div class="event-date">
                                            <h6 class="date-title">28</h6>
                                            <span>Dec</span>
                                        </div>
                                    </div>
                                    <div class="movie-content bg-one">
                                        <h5 class="title m-0">
                                            <Link to="#0">web design conference 2020</Link>
                                        </h5>
                                        <div class="movie-rating-percent">
                                            <span>327 Montague Street</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="event-grid">
                                    <div class="movie-thumb c-thumb">
                                        <Link to="#0">
                                            <img src="/src/assets/images/event/event03.jpg" alt="event">
                                        </Link>
                                        <div class="event-date">
                                            <h6 class="date-title">28</h6>
                                            <span>Dec</span>
                                        </div>
                                    </div>
                                    <div class="movie-content bg-one">
                                        <h5 class="title m-0">
                                            <Link to="#0">digital thinkers meetup</Link>
                                        </h5>
                                        <div class="movie-rating-percent">
                                            <span>327 Montague Street</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="event-grid">
                                    <div class="movie-thumb c-thumb">
                                        <Link to="#0">
                                            <img src="/src/assets/images/event/event04.jpg" alt="event">
                                        </Link>
                                        <div class="event-date">
                                            <h6 class="date-title">28</h6>
                                            <span>Dec</span>
                                        </div>
                                    </div>
                                    <div class="movie-content bg-one">
                                        <h5 class="title m-0">
                                            <Link to="#0">world digital conference 2020</Link>
                                        </h5>
                                        <div class="movie-rating-percent">
                                            <span>327 Montague Street</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-item">
                        <div class="owl-carousel owl-theme tab-slider">
                            <div class="item">
                                <div class="event-grid">
                                    <div class="movie-thumb c-thumb">
                                        <Link to="#0">
                                            <img src="/src/assets/images/event/event01.jpg" alt="event">
                                        </Link>
                                        <div class="event-date">
                                            <h6 class="date-title">28</h6>
                                            <span>Dec</span>
                                        </div>
                                    </div>
                                    <div class="movie-content bg-one">
                                        <h5 class="title m-0">
                                            <Link to="#0">Digital Economy Conference 2020</Link>
                                        </h5>
                                        <div class="movie-rating-percent">
                                            <span>327 Montague Street</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="event-grid">
                                    <div class="movie-thumb c-thumb">
                                        <Link to="#0">
                                            <img src="/src/assets/images/event/event02.jpg" alt="event">
                                        </Link>
                                        <div class="event-date">
                                            <h6 class="date-title">28</h6>
                                            <span>Dec</span>
                                        </div>
                                    </div>
                                    <div class="movie-content bg-one">
                                        <h5 class="title m-0">
                                            <Link to="#0">web design conference 2020</Link>
                                        </h5>
                                        <div class="movie-rating-percent">
                                            <span>327 Montague Street</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="event-grid">
                                    <div class="movie-thumb c-thumb">
                                        <Link to="#0">
                                            <img src="/src/assets/images/event/event03.jpg" alt="event">
                                        </Link>
                                        <div class="event-date">
                                            <h6 class="date-title">28</h6>
                                            <span>Dec</span>
                                        </div>
                                    </div>
                                    <div class="movie-content bg-one">
                                        <h5 class="title m-0">
                                            <Link to="#0">digital thinkers meetup</Link>
                                        </h5>
                                        <div class="movie-rating-percent">
                                            <span>327 Montague Street</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="event-grid">
                                    <div class="movie-thumb c-thumb">
                                        <Link to="#0">
                                            <img src="/src/assets/images/event/event04.jpg" alt="event">
                                        </Link>
                                        <div class="event-date">
                                            <h6 class="date-title">28</h6>
                                            <span>Dec</span>
                                        </div>
                                    </div>
                                    <div class="movie-content bg-one">
                                        <h5 class="title m-0">
                                            <Link to="#0">world digital conference 2020</Link>
                                        </h5>
                                        <div class="movie-rating-percent">
                                            <span>327 Montague Street</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-item">
                        <div class="owl-carousel owl-theme tab-slider">
                            <div class="item">
                                <div class="event-grid">
                                    <div class="movie-thumb c-thumb">
                                        <Link to="#0">
                                            <img src="/src/assets/images/event/event01.jpg" alt="event">
                                        </Link>
                                        <div class="event-date">
                                            <h6 class="date-title">28</h6>
                                            <span>Dec</span>
                                        </div>
                                    </div>
                                    <div class="movie-content bg-one">
                                        <h5 class="title m-0">
                                            <Link to="#0">Digital Economy Conference 2020</Link>
                                        </h5>
                                        <div class="movie-rating-percent">
                                            <span>327 Montague Street</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="event-grid">
                                    <div class="movie-thumb c-thumb">
                                        <Link to="#0">
                                            <img src="/src/assets/images/event/event02.jpg" alt="event">
                                        </Link>
                                        <div class="event-date">
                                            <h6 class="date-title">28</h6>
                                            <span>Dec</span>
                                        </div>
                                    </div>
                                    <div class="movie-content bg-one">
                                        <h5 class="title m-0">
                                            <Link to="#0">web design conference 2020</Link>
                                        </h5>
                                        <div class="movie-rating-percent">
                                            <span>327 Montague Street</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="event-grid">
                                    <div class="movie-thumb c-thumb">
                                        <Link to="#0">
                                            <img src="/src/assets/images/event/event03.jpg" alt="event">
                                        </Link>
                                        <div class="event-date">
                                            <h6 class="date-title">28</h6>
                                            <span>Dec</span>
                                        </div>
                                    </div>
                                    <div class="movie-content bg-one">
                                        <h5 class="title m-0">
                                            <Link to="#0">digital thinkers meetup</Link>
                                        </h5>
                                        <div class="movie-rating-percent">
                                            <span>327 Montague Street</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="event-grid">
                                    <div class="movie-thumb c-thumb">
                                        <Link to="#0">
                                            <img src="/src/assets/images/event/event04.jpg" alt="event">
                                        </Link>
                                        <div class="event-date">
                                            <h6 class="date-title">28</h6>
                                            <span>Dec</span>
                                        </div>
                                    </div>
                                    <div class="movie-content bg-one">
                                        <h5 class="title m-0">
                                            <Link to="#0">world digital conference 2020</Link>
                                        </h5>
                                        <div class="movie-rating-percent">
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
};

export default HomePage;
