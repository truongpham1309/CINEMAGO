import { Banner04 } from "@/assets/images/banner";
import { Link, useParams } from "react-router-dom"
import ScreenThumb from './_image/screen-thumb.png';
import Seat01 from './_image/seat01.png';
import Seat01_Free from './_image/seat01-free.png';
import Seat02 from './_image/seat02.png';
import Seat02_Free from './_image/seat02-free.png';
import Seat02_Booked from './_image/seat02-booked.png';
import Movie_bg_proceed from './_image/movie-bg-proceed.jpg';

const BookingSeatPage = () => {
    const { id } = useParams();

    return (
        <>
            <section
                className="details-banner hero-area bg_img seat-plan-banner"
                data-background={Banner04}
            >
                <div className="container">
                    <div className="details-banner-wrapper">
                        <div className="details-banner-content style-two">
                            <h3 className="title">Tên phim</h3>
                            <div className="tags">
                                <a href="#0">City Walk</a>
                                <a href="#0">English - 2D</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* ==========Banner-Section========== */}
            {/* ==========Page-Title========== */}
            <section className="page-title bg-one">
                <div className="container">
                    <div className="page-title-area">
                        <div className="item md-order-1">
                            <a
                                href="movie-ticket-plan.html"
                                className="custom-button back-button"
                            >
                                <i className="flaticon-double-right-arrows-angles" />
                                back
                            </a>
                        </div>
                        <div className="item date-item">
                            <span className="date">MON, SEP 09 2020</span>
                            <select className="select-bar">
                                <option value="sc1">09:40</option>
                            </select>
                        </div>
                        <div className="item">
                            <h5 className="title">05:00</h5>
                            <p>Mins Left</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* ==========Page-Title========== */}
            {/* ==========Movie-Section========== */}
            <div className="seat-plan-section padding-bottom padding-top">
                <div className="container">
                    <div className="screen-area">
                        <h4 className="screen">screen</h4>
                        <div className="screen-thumb">
                            <img src={ScreenThumb} alt="movie" />
                        </div>
                        <h5 className="subtitle">Hàng ghế thường</h5>
                        <div className="screen-wrapper">
                            <ul className="seat-area">
                                <li className="seat-line">
                                    <span>f</span>
                                    <ul className="seat--area">
                                        <li className="front-seat">
                                            <ul>
                                                <li className="single-seat">
                                                    <img src={Seat01} alt="seat" />
                                                </li>
                                                <li className="single-seat">
                                                    <img src={Seat01} alt="seat" />
                                                </li>
                                                <li className="single-seat">
                                                    <img src={Seat01} alt="seat" />
                                                </li>
                                                <li className="single-seat">
                                                    <img src={Seat01} alt="seat" />
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="front-seat">
                                            <ul>
                                                <li className="single-seat">
                                                    <img src={Seat01} alt="seat" />
                                                </li>
                                                <li className="single-seat seat-free">
                                                    <img
                                                        src={Seat01_Free}
                                                        alt="seat"
                                                    />
                                                    <span className="sit-num">f7</span>
                                                </li>
                                                <li className="single-seat seat-free">
                                                    <img
                                                        src={Seat01_Free}
                                                        alt="seat"
                                                    />
                                                    <span className="sit-num">f8</span>
                                                </li>
                                                <li className="single-seat">
                                                    <img src={Seat01} alt="seat" />
                                                </li>
                                                <li className="single-seat">
                                                    <img src={Seat01} alt="seat" />
                                                </li>
                                                <li className="single-seat">
                                                    <img src={Seat01} alt="seat" />
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="front-seat">
                                            <ul>
                                                <li className="single-seat seat-free">
                                                    <img
                                                        src={Seat01_Free}
                                                        alt="seat"
                                                    />
                                                    <span className="sit-num">f9</span>
                                                </li>
                                                <li className="single-seat seat-free">
                                                    <img
                                                        src={Seat01_Free}
                                                        alt="seat"
                                                    />
                                                    <span className="sit-num">f10</span>
                                                </li>
                                                <li className="single-seat seat-free">
                                                    <img
                                                        src={Seat01_Free}
                                                        alt="seat"
                                                    />
                                                    <span className="sit-num">f11</span>
                                                </li>
                                                <li className="single-seat">
                                                    <img src={Seat01} alt="seat" />
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <span>f</span>
                                </li>
                            </ul>
                        </div>
                        <h5 className="subtitle">Hàng Ghế VIP</h5>
                        <div className="screen-wrapper">
                            <ul className="seat-area couple">
                                <li className="seat-line">
                                    <span>d</span>
                                    <ul className="seat--area">
                                        <li className="front-seat">
                                            <ul>
                                                <li className="single-seat">
                                                    <img src={Seat02} alt="seat" />
                                                </li>
                                                <li className="single-seat">
                                                    <img src={Seat02} alt="seat" />
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="front-seat">
                                            <ul>
                                                <li className="single-seat">
                                                    <img src={Seat02} alt="seat" />
                                                </li>
                                                <li className="single-seat seat-free-two">
                                                    <img
                                                        src={Seat02_Booked}
                                                        alt="seat"
                                                    />
                                                    <span className="sit-num">D7 D8</span>
                                                </li>
                                                <li className="single-seat">
                                                    <img src={Seat02} alt="seat" />
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="front-seat">
                                            <ul>
                                                <li className="single-seat">
                                                    <img src={Seat02} alt="seat" />
                                                </li>
                                                <li className="single-seat">
                                                    <img src={Seat02} alt="seat" />
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <span>d</span>
                                </li>
                                <li className="seat-line">
                                    <span>a</span>
                                    <ul className="seat--area">
                                        <li className="front-seat">
                                            <ul>
                                                <li className="single-seat seat-free-two">
                                                    <img
                                                        src={Seat02_Free}
                                                        alt="seat"
                                                    />
                                                    <span className="sit-num">a1 a2</span>
                                                </li>
                                                <li className="single-seat seat-free-two">
                                                    <img
                                                        src={Seat02_Free}
                                                        alt="seat"
                                                    />
                                                    <span className="sit-num">a3 a4</span>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="front-seat">
                                            <ul>
                                                <li className="single-seat seat-free-two">
                                                    <img
                                                        src={Seat02_Free}
                                                        alt="seat"
                                                    />
                                                    <span className="sit-num">a5 a6</span>
                                                </li>
                                                <li className="single-seat seat-free-two">
                                                    <img
                                                        src={Seat02_Free}
                                                        alt="seat"
                                                    />
                                                    <span className="sit-num">a7 a8</span>
                                                </li>
                                                <li className="single-seat seat-free-two">
                                                    <img
                                                        src={Seat02_Free}
                                                        alt="seat"
                                                    />
                                                    <span className="sit-num">a9 a10</span>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="front-seat">
                                            <ul>
                                                <li className="single-seat seat-free-two">
                                                    <img
                                                        src={Seat02_Free}
                                                        alt="seat"
                                                    />
                                                    <span className="sit-num">a11</span>
                                                </li>
                                                <li className="single-seat seat-free-two">
                                                    <img
                                                        src={Seat02_Free}
                                                        alt="seat"
                                                    />
                                                    <span className="sit-num">a12</span>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <span>a</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div
                        className="proceed-book bg_img"
                        data-background={Movie_bg_proceed}
                    >
                        <div className="proceed-to-book">
                            <div className="book-item">
                                <span>Ghế bạn chọn</span>
                                <h3 className="title">d9, d10</h3>
                            </div>
                            <div className="book-item text-center">
                                <span>Giá</span>
                                <h3 className="title">$150</h3>
                            </div>
                            <div className="book-item">
                                <Link to="#" className="custom-button">
                                    Tiếp tục
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookingSeatPage