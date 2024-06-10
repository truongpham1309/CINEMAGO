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
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getDetailMovieClient(+id!);
      console.log(data);
      setMovies(data.data.movie);
    })();
  }, [id]);
  console.log(movies);
  return (
    <>
      <div className="details-banner-wrapper">
        <div key={movies?.id}>
          <div className="details-banner-thumb">
            <img src={movies?.image} alt="movie" />
          </div>
          <div className="details-banner-content offset-lg-3">
            <h3 className="title">{movies?.title}</h3>
            <div className="tags">
              <a href="#0">English</a>
              <a href="#0">Hindi</a>
              <a href="#0">Telegu</a>
              <a href="#0">Tamil</a>
            </div>
            <a href="#0" className="button">
              horror
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
        <br />
        <p>{movies?.description}</p>
        <br />
      </div>
      {/* finished baner */}
      {/* booking + trailer */}
      <section className="book-section bg-one">
        <div className="container">
          <div className="book-wrapper offset-lg-3">
            <div className="left-side">
              <div className="item">
                <div className="item-header">
                  <div className="counter-area">
                    <span>{movies?.director}</span>
                  </div>
                </div>
                <p>Đạo diễn</p>
              </div>
              <div className="item">
                <div className="item-header">
                  <div className="counter-area">
                    <span>{movies?.actor}</span>
                  </div>
                </div>
                <p>Diễn viên</p>
              </div>
              <div className="item">
                <div className="item-header">
                  <h5 className="title">{movies?.status}</h5>
                  <div className="rated">
                  </div>
                </div>
                <p>Trạng thái</p>
              </div>
              <div className="item">
                <div className="item-header">
                  <div className="rated rate-it">

                  </div>
                  <h5 className="title">{movies?.rated}</h5>
                </div>
                <p>
                  <a href="#0">Độ tuổi</a>
                </p>
              </div>
            </div>
            <a href="#0" onClick={() => setShowTrailer(!showTrailer)} className="custom-button">
              Trailer
            </a>
            <Link to="#0" className="custom-button">
              book tickets
            </Link>
          </div>
          {showTrailer && (
            <iframe src={movies?.trailer}></iframe>
          )}
        </div>
      </section>
      {/* booking + trailer */}
    </>
  );
};

export default MovieDetail;
