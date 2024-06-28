import { Banner04 } from "@/assets/images/banner"
import CountDown from "../BookingSeat/_components/CountDown"
import { Link } from "react-router-dom"
import { formatDate } from "@/common/libs/formatDateToString"
import { useState } from "react"

const CheckOutPage = () => {
    const [booking, setBookings] = useState(JSON.parse(sessionStorage.getItem('booking')!) || null);
    const [infoMovie, _] = useState(JSON.parse(sessionStorage.getItem('info_movie')!) || null);
    console.log(infoMovie);
    return (
        <>
            {/* ==========Banner-Section========== */}
            <section
                className="details-banner hero-area bg_img seat-plan-banner"
                data-background={Banner04}
            >
                <div className="container">
                    <div className="details-banner-wrapper">
                        <div className="details-banner-content style-two">
                            <h3 className="title">{infoMovie?.movie_title || "LOADING..."}</h3>
                            <div className="tags">
                                <span>{infoMovie?.city} </span>
                                <span> {infoMovie?.cinema_name} - {infoMovie?.screen}</span>
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
                            <Link
                                to="movie"
                                className="custom-button back-button"
                            >
                                <i className="flaticon-double-right-arrows-angles" />
                                back
                            </Link>
                        </div>
                        <div className="item date-item text-uppercase text-white" >
                            <span className="date">{formatDate(infoMovie?.show_date)}</span>
                            <div className="nice-select current_showtime">
                                <span className="current">{infoMovie?.show_time?.slice(0, -3)}</span>
                            </div>
                        </div>
                        <CountDown />
                    </div>
                </div>
            </section>
            {/* ==========Page-Title========== */}
            {/* ==========Movie-Section========== */}
            <div className="movie-facility padding-bottom padding-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="booking-summery bg-one">
                                <h4 className="title">booking</h4>
                                <ul>
                                    <li>
                                        <h6 className="subtitle">Venus</h6>
                                        <span className="info">English-2d</span>
                                    </li>
                                    <li>
                                        <h6 className="subtitle">
                                            <span>Hà Nội</span>
                                            <span>02</span>
                                        </h6>
                                        <div className="info">
                                            <span>10 SEP TUE, 23:00 PM</span> <span>Tickets</span>
                                        </div>
                                    </li>
                                    <li>
                                        <h6 className="subtitle mb-0">
                                            <span>Giá vé</span>
                                            <span>$150</span>
                                        </h6>
                                    </li>
                                </ul>
                                <ul className="side-shape">
                                    <li>
                                        <h6 className="subtitle">
                                            <span>combos</span>
                                            <span>$57</span>
                                        </h6>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <span className="info">
                                            <span>giá</span>
                                            <span>$207</span>
                                        </span>
                                        {/* <span className="info">
                                            <span>vat</span>
                                            <span>$15</span>
                                        </span> */}
                                    </li>
                                </ul>
                            </div>
                            <div className="proceed-area text-center">
                                <h6 className="subtitle">
                                    <span>Phải thanh toán</span>
                                    <span>$257</span>
                                </h6>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="checkout-widget checkout-card mb-0">
                                <h5 className="title">Payment Option </h5>
                                <ul className="payment-option">
                                    <li className="active">
                                        <a href="#0">
                                            <img src="/src/assets/images/payment/Icon-VNPAY-QR.webp" alt="payment" />
                                            <span>VNPAY</span>
                                        </a>
                                    </li>
                                    <li className="">
                                        <a href="#0">
                                            <img src="/src/assets/images/payment/card.png" alt="payment" />
                                            <span>MOMO</span>
                                        </a>
                                    </li>
                                </ul>
                                <div className="form-group">
                                    <input
                                        type="submit"
                                        className="custom-button"
                                        value="Thanh toán"
                                    />
                                </div>
                                {/* <p className="notice">
                                    By Clicking "Make Payment" you agree to the{" "}
                                    <a href="#0">terms and conditions</a>
                                </p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default CheckOutPage