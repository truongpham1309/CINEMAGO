import { Banner04 } from "@/assets/images/banner"
import { formatDate } from "@/common/libs/formatDateToString"
import { Link, useNavigate } from "react-router-dom"
import CountDown from "../BookingSeat/_components/CountDown"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const BookingServicePage = () => {
    const navigate = useNavigate();
    const [booking, setBookings] = useState(JSON.parse(sessionStorage.getItem('booking')!) || null);
    const [infoMovie, _] = useState(JSON.parse(sessionStorage.getItem('info_movie')!) || null);
    useEffect(() => {
        if (!booking) {
            toast.error('Mời bạn chọn phim!', {
                position: 'top-center'
            });
            sessionStorage.clear();
            navigate('/movie');
            return;
        }
    }, []);

    const handleNavigateCheckout = () => {
        sessionStorage.setItem('booking', JSON.stringify(booking));
        navigate("/movie/booking/checkout");
    }
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
                            <h3 className="title">{infoMovie?.movie_title}</h3>
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
                                to="/movie/booking"
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
                        <div className="col-lg-8">
                            <div className="section-header-3">
                                <h2 className="title">we have food</h2>
                            </div>
                            <div className="grid--area">
                                <div className="grid-area">
                                    <div className="grid-item combos popcorn">
                                        <div className="grid-inner">
                                            <div className="grid-thumb">
                                                <img
                                                    src="/src/assets/images/movie/popcorn/pop1.png"
                                                    alt="movie/popcorn"
                                                />
                                                <div className="offer-tag">$57</div>
                                                <div className="offer-remainder">
                                                    <h6 className="o-title mt-0">24%</h6>
                                                    <span>off</span>
                                                </div>
                                            </div>
                                            <div className="grid-content">
                                                <h5 className="subtitle">
                                                    <a href="#0">Muchaco, Crispy Taco, Bean Burrito</a>
                                                </h5>
                                                <form className="cart-button">
                                                    <div className="cart-plus-minus">
                                                        <input
                                                            className="cart-plus-minus-box"
                                                            type="text"
                                                            name="qtybutton"
                                                            defaultValue={2}
                                                        />
                                                    </div>
                                                    <button type="submit" className="custom-button">
                                                        add
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid-item bevarage">
                                        <div className="grid-inner">
                                            <div className="grid-thumb">
                                                <img
                                                    src="/src/assets/images/movie/popcorn/pop2.png"
                                                    alt="movie/popcorn"
                                                />
                                                <div className="offer-tag">$57</div>
                                                <div className="offer-remainder">
                                                    <h6 className="o-title mt-0">24%</h6>
                                                    <span>off</span>
                                                </div>
                                            </div>
                                            <div className="grid-content">
                                                <h5 className="subtitle">
                                                    <a href="#0">Crispy Beef Taco, Beef Mucho Nachos</a>
                                                </h5>
                                                <form className="cart-button">
                                                    <div className="cart-plus-minus">
                                                        <input
                                                            className="cart-plus-minus-box"
                                                            type="text"
                                                            name="qtybutton"
                                                            defaultValue={2}
                                                        />
                                                    </div>
                                                    <button type="submit" className="custom-button">
                                                        add
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid-item combos">
                                        <div className="grid-inner">
                                            <div className="grid-thumb">
                                                <img
                                                    src="/src/assets/images/movie/popcorn/pop3.png"
                                                    alt="movie/popcorn"
                                                />
                                                <div className="offer-tag">$57</div>
                                                <div className="offer-remainder">
                                                    <h6 className="o-title mt-0">24%</h6>
                                                    <span>off</span>
                                                </div>
                                            </div>
                                            <div className="grid-content">
                                                <h5 className="subtitle">
                                                    <a href="#0">Chicken Quesadilla Crispy Beef Taco</a>
                                                </h5>
                                                <form className="cart-button">
                                                    <div className="cart-plus-minus">
                                                        <input
                                                            className="cart-plus-minus-box"
                                                            type="text"
                                                            name="qtybutton"
                                                            defaultValue={2}
                                                        />
                                                    </div>
                                                    <button type="submit" className="custom-button">
                                                        add
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid-item bevarage popcorn">
                                        <div className="grid-inner">
                                            <div className="grid-thumb">
                                                <img
                                                    src="/src/assets/images/movie/popcorn/pop4.png"
                                                    alt="movie/popcorn"
                                                />
                                                <div className="offer-tag">$57</div>
                                                <div className="offer-remainder">
                                                    <h6 className="o-title mt-0">24%</h6>
                                                    <span>off</span>
                                                </div>
                                            </div>
                                            <div className="grid-content">
                                                <h5 className="subtitle">
                                                    <a href="#0">MexiDips &amp; Chips, Beef Muchaco</a>
                                                </h5>
                                                <form className="cart-button">
                                                    <div className="cart-plus-minus">
                                                        <input
                                                            className="cart-plus-minus-box"
                                                            type="text"
                                                            name="qtybutton"
                                                            defaultValue={2}
                                                        />
                                                    </div>
                                                    <button type="submit" className="custom-button">
                                                        add
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
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
                                <span onClick={handleNavigateCheckout} className="custom-button back-button">
                                    Tiếp tục
                                </span>
                            </div>
                            <div className="note text-white">
                                <h5 className="title">Chú ý :</h5>
                                <p>
                                    Vui lòng đến rạp sớm trước 15 phút để chúng tôi có thể chuẩn bị đồ ăn và vé cho bạn
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookingServicePage