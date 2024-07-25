import { Movie } from '@/common/types/client/movie';
import { Link } from 'react-router-dom';

const ItemsMovieComponent = ({ movie, className }: { movie: Movie, className: string }) => {
    return (
        <div className={className}>
            <div className="movie-grid">
                <div className="movie-thumb c-thumb">
                    <Link to={`/movie/detail/${movie.id}`}>
                        <img src={movie.image} alt="movie" />
                    </Link>
                </div>
                <div className="movie-content bg-one">
                    <h5 className="title m-0">
                        <Link to={`/movie/detail/${movie?.id}`}>
                            {movie?.title.length > 20 ? `${movie?.title.substring(0, 20)}...` : movie?.title}
                        </Link>
                    </h5>
                    <ul className="movie-rating-percent">
                        <li>
                            <span className="content">{movie?.genre.length > 15 ? `${movie?.genre.substring(0, 15)}...` : movie?.genre}</span>
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
    )
}

export default ItemsMovieComponent