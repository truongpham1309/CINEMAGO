import { Movie } from "@/common/types/client/movie";
import { Link } from "react-router-dom";

const ItemsMovieComponent = ({
  movie,
  className,
}: {
  movie: Movie;
  className: string;
}) => {
  return (
    <div className={className}>
      <div className="movie-grid">
        <div className="movie-thumb c-thumb">
          <Link to={`/movie/detail/${movie.id}`}>
            <img src={movie.image} alt="movie" />
          </Link>
        </div>
        <div className="movie-content bg-one text-center">
          <h3 className="title text-2xl mb-0">
            <a href={`/movie/detail/${movie?.id}`} className="no-underline">
              {movie?.title.length > 20
                ? `${movie?.title.substring(0, 20)}...`
                : movie?.title}
            </a>
          </h3>
          <ul className=" list-none mb-0 flex justify-center">
            <li>
              <span>{movie.duration} phút</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ItemsMovieComponent;
