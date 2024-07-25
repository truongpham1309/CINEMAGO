import { Movie } from "@/common/types/client/movie";
import { getAllMovieHomePage } from "@/services/movie/movieService";
import { useEffect, useState } from "react";
import ItemsMovieComponent from "../_components/Movies/ItemsMovieComponent";
import "react-multi-carousel/lib/styles.css";

const HomePage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    useEffect(() => {
        (async () => {
            const data = await getAllMovieHomePage();
            setMovies(data.data.movie);

        })();
    }, []);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    console.log(movies?.filter(movie => new Date(movie.release_date) <= new Date()));
    return (
        <>
            <section className="banner-section">
                <div
                    className="banner-bg bg_img bg-fixed"
                    data-background="/src/assets/images/banner/banner01.jpg"

                />
                <div className="container">
                    <div className="banner-content">
                        <h1 className="title cd-headline clip">
                            <span className="d-block">book your</span> tickets for <span> </span>
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
                                <h2 className="title">Phim sắp chiếu</h2>
                            </div>
                        </div>
                        <div className="mb-30-none">
                            <div className="tab-item active">
                                <div className="owl-carousel owl-theme tab-slider owl-loaded owl-drag">
                                    <div className="owl-stage-outer">
                                        <div className="owl-stage row m-0">
                                            {movies.filter(_m => new Date(_m.release_date) > new Date()).map((movie, index) => (
                                                <ItemsMovieComponent key={index} movie={movie} className="col-md-6 col-lg-3" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="movie-section padding-top padding-bottom">
                <div className="container">
                    <div className="tab">
                        <div className="section-header-2">
                            <div className="left">
                                <h2 className="title fs-12">Phim đang chiếu</h2>
                            </div>
                        </div>
                        <div className="mb-30-none">
                            <div className="tab-item active">
                                <div className="owl-carousel owl-theme tab-slider owl-loaded owl-drag">
                                    <div className="owl-stage-outer">
                                        <div className="owl-stage row m-0">
                                            {movies.filter(movie => new Date(movie.release_date) <= new Date()).map((movie, index) => (
                                                <ItemsMovieComponent className="col-md-4 col-lg-3" key={index} movie={movie} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;
