import { Movie } from "@/common/types/client/movie";
import { getAllMovieClient } from "@/services/movie/movieService";
import { useEffect, useState } from "react";
import ItemsMovieComponent from "../_components/Movies/ItemsMovieComponent";

const MovieList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filterMovies, setFilterMovies] = useState<number[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [genreFilter, setGenreFilter] = useState<string[]>([]);


  useEffect(() => {
    (async () => {
      const data = await getAllMovieClient();
      setMovies(data.data.movie);
      setFilterMovies(data.data.movie.map((movie: any) => movie.id));
    })();
  }, []);

  const handleFilterChange = (status: string, genre: string) => {
    if (statusFilter !== status) setStatusFilter(status);
    let _newGenre = [...genreFilter];

    if (genre !== "") {
      if (!genreFilter.includes(genre)) {
        _newGenre = [...genreFilter, genre];
      }
      else {
        _newGenre = genreFilter.filter(_g => _g !== genre);
      }
      setGenreFilter(_newGenre);
    }
    let filtered = movies.map(_m => _m.id);
    if (status !== "all") {
      filtered = movies.filter(movie => movie.status === status).map(movie => movie.id);
    }

    if (_newGenre.length > 0) {
      let currentMovieId: number[] = [];
      for (let _gen of _newGenre) {
        let _movieid = movies.filter(_m => _m.genre.includes(_gen)).map(__m => __m.id);
        currentMovieId = [...currentMovieId, ..._movieid];
      }
      filtered = [...new Set(currentMovieId)];
    }
    setFilterMovies(filtered);
  };

  const handleStatusFilterChange = (status: string) => {
    handleFilterChange(status, "");
  };

  const handleGenreFilterChange = (genre: string) => {
    handleFilterChange(statusFilter, genre);
  };

  const genres = Array.from(new Set(movies.flatMap((movie) => movie.genre.split(', '))));
  return (
    <>
    <br />
    <br />
      <section className="py-5">
      </section>
      <section className="movie-section padding-top padding-bottom">
        <div className="container">
          <div className="row align-items-strech flex-wrap-reverse justify-content-center">
            <div className="col-sm-10 col-md-8 col-lg-3">
              <div className="widget-1 widget-check">
                <div className="widget-1-body">
                  <h6 className="subtitle">Thể loại</h6>
                  <div className="check-area">
                    {genres?.map((g, i) => (
                      <div onClick={() => handleGenreFilterChange(g)} key={i} className="form-group m-0">
                        <input type="checkbox" name="lang" checked={genreFilter.includes(g)} id={g} />
                        <label className="pt-1" htmlFor="lang1">{g}</label>
                      </div>
                    ))}
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
                        <span className="show text-white">Hiển thị: {filterMovies?.length} phim</span>
                      </div>
                      <span className="show text-white mt-1">Trạng thái :</span>
                      <div className="">
                        <div className="nice-select"> 
                          <span className="current">Sắp chiếu</span>
                          <ul className="list">
                            <li
                              data-value="all"
                              onClick={() => handleStatusFilterChange("all")}
                              className="option text-black focus selected"
                            >
                              Tất cả
                            </li>
                            <li
                              data-value="Coming Soon"
                              onClick={() =>
                                handleStatusFilterChange("Coming Soon")
                              }
                              className="option text-black focus"
                            >
                              Phim sắp chiếu
                            </li>
                            <li
                              data-value="Currently Showing"
                              onClick={() =>
                                handleStatusFilterChange("Currently Showing")
                              }
                              className="option text-black focus"
                            >
                              Phim đang chiếu
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-area">
                  <div className="tab-item active">
                    <div className="row mb-10 align-items-strech">
                      {filterMovies.map((movieid, index) => {
                        let movie = movies.find((movie) => movie.id === movieid);
                        return movie ? (
                          <ItemsMovieComponent className="col-md-6 col-lg-4" key={index} movie={movie} />
                        ) : null
                      })}
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

export default MovieList;
