import AOS from "aos";
import { Movie } from "@/common/types/client/movie";
import { getAllMovieHomePage } from "@/services/movie/movieService";
import { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import ItemsMovieComponent from "../_components/Movies/ItemsMovieComponent";

const responsive = {
   superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
   },
   desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
   },
   tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
   },
   mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
   },
};

const HomePage = () => {
   const [movies, setMovies] = useState<Movie[]>([]);
   useEffect(() => {
      (async () => {
         const data = await getAllMovieHomePage();
         setMovies(data.data.movie);
      })();
      AOS.init({
         duration: 1000,
      });
   }, []);

   return (
      <>
         <section className="banner-section" data-aos="zoom-in down">
            <div className="banner-bg bg_img bg-fixed" data-background="/src/assets/images/banner/banner01.jpg" />
            <div className="container">
               <div className="banner-content">
                  <h1 className="title cd-headline clip">
                     <span className="d-block">Chào mừng bạn </span>đến với <span> </span>
                     <span className="color-theme p-0 m-0">
                        <b className="is-visible">CinemaGO</b>
                     </span>
                  </h1>
                  <p>Đặt vé an toàn, uy tín, bảo mật, đáng tin cậy.</p>
               </div>
            </div>
         </section>

         {movies.filter((movie) => new Date(movie.release_date) > new Date())?.length > 0 && (
            <section className="movie-section padding-top padding-bottom" data-aos="fade-left">
               <div className="container">
                  <div className="tab">
                     <div className="section-header-2 border-0">
                        <div className="left">
                           <h2 className="title fs-5">Phim sắp chiếu</h2>
                        </div>
                     </div>
                     <div className="mb-30-none">
                        <div className="tab-item active">
                           <div className="owl-carousel owl-theme tab-slider owl-loaded owl-drag">
                              <div className="owl-stage-outer">
                                 <div className="owl-stage row m-0">
                                    {movies.filter((_m) => new Date(_m.release_date) > new Date())?.length > 0
                                       ? movies
                                            .filter((_m) => new Date(_m.release_date) > new Date())
                                            .slice(0, 4)
                                            .map((movie, index) => <ItemsMovieComponent key={index} movie={movie} className="col-md-4 col-lg-3" />)
                                       : null}
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         )}

         {movies.filter((movie) => new Date(movie.release_date) <= new Date())?.length > 0 && (
            <section className="movie-section padding-top padding-bottom" data-aos="fade-left">
               <div className="container">
                  <div className="tab">
                     <div className="section-header-2 border-0">
                        <div className="left">
                           <h2 className="title">Phim đang chiếu</h2>
                        </div>
                     </div>
                     <div className="mb-30-none">
                        <div className="tab-item active">
                           <div className="owl-carousel owl-theme tab-slider owl-loaded owl-drag">
                              <div className="owl-stage-outer">
                                 <div className="owl-stage row m-0">
                                    {movies.filter((movie) => new Date(movie.release_date) <= new Date())?.length > 0
                                       ? movies
                                            .filter((movie) => new Date(movie.release_date) <= new Date())
                                            .slice(0, 4)
                                            .map((movie, index) => <ItemsMovieComponent className="col-md-4 col-lg-3" key={index} movie={movie} />)
                                       : null}
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         )}
      </>
   );
};

export default HomePage;
