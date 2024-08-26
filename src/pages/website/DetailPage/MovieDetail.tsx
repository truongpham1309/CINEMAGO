import { VideoButton } from "@/assets/images/movie";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { getDetailMovieClient } from "@/services/movie/movieService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ModalVideo from 'react-modal-video';
import { Link, useParams } from "react-router-dom";
import NotFoundPage from "../404/page";
import ShowTimeByMovie from "./_components/ShowTimeByMovie";

interface Movie {
  id: number;
  title: string;
  genre: string;
  release_date: string;
  trailer: string;
  director: string;
  image: string;
  rated: string;
  actor: string;
  duration: number;
  status: string;
  description: string;
}

const extractVideoId = (url: string) => {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const MovieDetail = () => {
  const { id } = useParams();
  const [showTrailer, setShowTrailer] = useState(false);

  const { data: movies, isLoading, isError } = useQuery({
    queryKey: ['MOVIES', id],
    queryFn: async () => {
      const data = await getDetailMovieClient(+id!);
      return data.data.movie as Movie;
    }
  });
  if (isLoading) return <LoadingComponent />;
  if (isError) return <NotFoundPage />;
  return (
    <>
      <section className="details-banner bg_img" data-background={movies?.image}>
        <div className="container">
          <div className="details-banner-wrapper">
            <div className="details-banner-thumb">
              <img src={movies?.image} alt="movie" />
              <span onClick={() => setShowTrailer(true)} className="video-popup">
                <img src={VideoButton} alt="movie" />
              </span>
            </div>
            <ModalVideo channel='youtube' isOpen={showTrailer} videoId={extractVideoId(movies?.trailer || "") || ""} onClose={() => setShowTrailer(false)} />
            <div className="details-banner-content offset-lg-3">
              <h3 className="title fw-bold text-uppercase">{movies?.title}</h3>
              <div className="tags">
                <span>Tiếng Việt phụ đề Tiếng Anh</span>
              </div>
              <Link to="#0" className="button">
                {movies?.genre}
              </Link>
              <span className="button ml-2">{movies?.rated === "C18" ? "Trên 18 tuổi" : (movies?.rated === "C16" ? "Trên 16 tuổi" : (movies?.rated === "C13" ? "Trên 13 tuổi" : "Mọi lứa tuổi"))}</span>
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
        <div className="container py-3">
          <div className="book-wrapper offset-lg-3">
            <div className="left-side">
            </div>
          </div>
        </div>
      </section>
      
      <ShowTimeByMovie rate={movies?.rated} movieID={movies?.id} />
      <section className="movie-details-section padding-top padding-bottom">
        <div className="container">
          <div className="row justify-content-center mb--50">
            <div className="col-lg-12 mb-50">
              <div className="movie-details">
                <h3 className="text-uppercase text-center mb-4 text-bold">Tóm tắt</h3>
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
