import { Banner03 } from "@/assets/images/banner";
import { VideoButton } from "@/assets/images/movie";
import { getDetailMovieClient } from "@/services/movie/movieService";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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

const MovieDetail = () => {
  const [movies, setMovies] = useState<Movie>();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const data = await getDetailMovieClient(+id!);
      setMovies(data.data.movie);
    })();
  }, [id]);
  console.log(movies);
  return (
    <>
      <section className="details-banner bg_img" data-background={Banner03}>
        <div className="container">
          <div className="details-banner-wrapper">
            <div className="details-banner-thumb">
              <img src={movies?.image} alt="movie" />
              <Link
                to={movies?.trailer!}
                className="video-popup"
              >
                <img src={VideoButton} alt="movie" />
              </Link>
            </div>
            <div className="details-banner-content offset-lg-3">
              <h3 className="title fw-bold text-uppercase">{movies?.title}</h3>
              <div className="tags">
                <span>Tiếng Việt phụ đề Tiếng Anh</span>
              </div>
              <a href="#0" className="button">
                {movies?.genre}
              </a>
              <div className="social-and-duration">
                <div className="duration-area">
                  <div className="item">
                    <i className="fas fa-calendar-alt" />
                    <span>{movies?.release_date}</span>
                  </div>
                  <div className="item">
                    <i className="far fa-clock" />
                    <span>{movies?.duration} phút</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="book-section bg-one">
        <div className="container">
          <div className="book-wrapper offset-lg-3">
            <div className="left-side">
              <div className="item">

                <p>tomatometer</p>
              </div>
              <div className="item">

                <p>audience Score</p>
              </div>
            </div>
            <Link to={`/movie/booking-movie/${movies?.id}`}>
              <span className="custom-button">
                book tickets
              </span>
            </Link>

          </div>
        </div>
      </section>
      <section className="movie-details-section padding-top padding-bottom">
        <div className="container">
          <div className="row justify-content-center mb--50">
            <div className="col-lg-3 col-sm-10 col-md-6 mb-50">
              <div className="widget-1 widget-tags">
                <ul>
                  <li>
                    <a href="#0">2D</a>
                  </li>
                  <li>
                    <a href="#0">imax 2D</a>
                  </li>
                  <li>
                    <a href="#0">4DX</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-12 mb-50">
              <div className="movie-details">
                <h3 className="text-uppercase text-center text-bold">Tóm tắt</h3>
                <p>
                  {movies?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MovieDetail;
