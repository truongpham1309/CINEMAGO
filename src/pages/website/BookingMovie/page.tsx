import { cinema, city, date } from "@/assets/images/ticket";
import { getAllShowTimeByCityAndCinema } from "@/services/bookingClient/bookingClientService";
import "@styles/main.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const BookingMovieShowTimePage = () => {
    const { id: idMovie } = useParams();
    const [filterMovie, setFilterMovie] = useState([] as any[]);
    const [citys, setCity] = useState([] as any[]);
    useEffect(() => {
        (async () => {
            const data = await getAllShowTimeByCityAndCinema(+idMovie!);
            // console.log(data.data);
            setFilterMovie(data.data);
        })();

    }, [idMovie]);

    useEffect(() => {
        if (filterMovie.length > 0) {
            const newCity = filterMovie.map((item) => item?.city);
            setCity(newCity);
        }
        citys.map(c => console.log(c))
    }, [filterMovie])
    // console.log(citys);
    return (
        <>
            <section
                className="details-banner hero-area bg_img"
                data-background="assets/images/banner/banner03.jpg"
            >
                <div className="container">
                    <div className="details-banner-wrapper">
                        <div className="details-banner-content">
                            <h3 className="title">Venus</h3>
                            <div className="tags">
                                <a href="#0">English</a>
                                <a href="#0">Hindi</a>
                                <a href="#0">Telegu</a>
                                <a href="#0">Tamil</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* ==========Banner-Section========== */}
            {/* ==========Book-Section========== */}
            <section className="book-section bg-one">
                <div className="container">
                    <div className="ticket-search-form two">
                        <div className="form-group">
                            <div className="thumb">
                                <img src={city} alt="ticket" />
                            </div>
                            <span className="type">Thành phố</span>
                            <select className="select-bar">
                                {citys?.map((c, i) => (
                                    <option key={i} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <div className="thumb">
                                <img src={date} alt="ticket" />
                            </div>
                            <span className="type">Ngày</span>
                            <select className="select-bar">
                                <option value="26-12-19">23/10/2020</option>
                                <option value="26-12-19">24/10/2020</option>
                                <option value="26-12-19">25/10/2020</option>
                                <option value="26-12-19">26/10/2020</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <div className="thumb">
                                <img src={cinema} alt="ticket" />
                            </div>
                            <span className="type">Rạp</span>
                            <select className="select-bar">
                                <option value="Awaken">Awaken</option>
                                <option value="Venus">Venus</option>
                                <option value="wanted">wanted</option>
                                <option value="joker">joker</option>
                                <option value="fid">fid</option>
                                <option value="kidio">kidio</option>
                                <option value="mottus">mottus</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>
            {/* ==========Book-Section========== */}
            {/* ==========Movie-Section========== */}
            <div className="ticket-plan-section padding-bottom padding-top">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-9 mb-5 mb-lg-0">
                            <ul className="seat-plan-wrapper bg-five">
                                <li>
                                    <div className="movie-name">
                                        <div className="icons">
                                            <i className="far fa-heart" />
                                            <i className="fas fa-heart" />
                                        </div>
                                        <a href="#0" className="name">
                                            Genesis Cinema
                                        </a>
                                        <div className="location-icon">
                                            <i className="fas fa-map-marker-alt" />
                                        </div>
                                    </div>
                                    <div className="movie-schedule">
                                        <div className="item">09:40</div>
                                        <div className="item">13:45</div>
                                        <div className="item">15:45</div>
                                        <div className="item">19:50</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="movie-name">
                                        <div className="icons">
                                            <i className="far fa-heart" />
                                            <i className="fas fa-heart" />
                                        </div>
                                        <a href="#0" className="name">
                                            the beach
                                        </a>
                                        <div className="location-icon">
                                            <i className="fas fa-map-marker-alt" />
                                        </div>
                                    </div>
                                    <div className="movie-schedule">
                                        <div className="item">09:40</div>
                                        <div className="item">13:45</div>
                                        <div className="item">15:45</div>
                                        <div className="item">19:50</div>
                                    </div>
                                </li>
                                <li className="active">
                                    <div className="movie-name">
                                        <div className="icons">
                                            <i className="far fa-heart" />
                                            <i className="fas fa-heart" />
                                        </div>
                                        <a href="#0" className="name">
                                            city work
                                        </a>
                                        <div className="location-icon">
                                            <i className="fas fa-map-marker-alt" />
                                        </div>
                                    </div>
                                    <div className="movie-schedule">
                                        <div className="item">09:40</div>
                                        <div className="item active">13:45</div>
                                        <div className="item">15:45</div>
                                        <div className="item">19:50</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="movie-name">
                                        <div className="icons">
                                            <i className="far fa-heart" />
                                            <i className="fas fa-heart" />
                                        </div>
                                        <a href="#0" className="name">
                                            box park
                                        </a>
                                        <div className="location-icon">
                                            <i className="fas fa-map-marker-alt" />
                                        </div>
                                    </div>
                                    <div className="movie-schedule">
                                        <div className="item">09:40</div>
                                        <div className="item">13:45</div>
                                        <div className="item">15:45</div>
                                        <div className="item">19:50</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="movie-name">
                                        <div className="icons">
                                            <i className="far fa-heart" />
                                            <i className="fas fa-heart" />
                                        </div>
                                        <a href="#0" className="name">
                                            la mer
                                        </a>
                                        <div className="location-icon">
                                            <i className="fas fa-map-marker-alt" />
                                        </div>
                                    </div>
                                    <div className="movie-schedule">
                                        <div className="item">09:40</div>
                                        <div className="item">13:45</div>
                                        <div className="item">15:45</div>
                                        <div className="item">19:50</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="movie-name">
                                        <div className="icons">
                                            <i className="far fa-heart" />
                                            <i className="fas fa-heart" />
                                        </div>
                                        <a href="#0" className="name">
                                            wanted
                                        </a>
                                        <div className="location-icon">
                                            <i className="fas fa-map-marker-alt" />
                                        </div>
                                    </div>
                                    <div className="movie-schedule">
                                        <div className="item">09:40</div>
                                        <div className="item">13:45</div>
                                        <div className="item">15:45</div>
                                        <div className="item">19:50</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-10">
                            <div className="widget-1 widget-banner">
                                <div className="widget-1-body">
                                    <a href="#0">
                                        <img
                                            src="assets/images/sidebar/banner/banner03.jpg"
                                            alt="banner"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default BookingMovieShowTimePage