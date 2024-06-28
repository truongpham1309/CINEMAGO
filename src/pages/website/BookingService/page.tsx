import { formatCurrencyVND } from "@/common/libs/fomatMoneyVND"
import { formatDate } from "@/common/libs/formatDateToString"
import { selectorBooking } from "@/common/store/booking/selectorBooking"
import { movieSelector } from "@/common/store/booking/selectorMovie"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import MovieBanner from "../_components/Booking/MovieBanner"

const BookingServicePage = () => {
    const navigate = useNavigate();
    const movie = useSelector(movieSelector);
    const booking = useSelector(selectorBooking);
    // const [booking, setBookings] = useState(JSON.parse(sessionStorage.getItem('booking')!) || null);
    // const [infoMovie, _] = useState(JSON.parse(sessionStorage.getItem('info_movie')!) || null);
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
        navigate("/movie/booking/checkout");
    }

    return (
        <>
            <MovieBanner />
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
                                        <h6 className="subtitle">{movie?.movie_title}</h6>
                                        <span className="info">{movie.cinema_name} - {movie.screen}</span>
                                    </li>
                                    <li>
                                        <h6 className="subtitle">
                                            <span>{movie.city}</span>
                                            <span>{booking.seats.length}</span>
                                        </h6>
                                        <div className="info">
                                            <span>{formatDate(movie.show_date)}, {movie.show_time.slice(-3, 0)}</span> <span>Tickets</span>
                                        </div>
                                    </li>
                                    <li>
                                        <h6 className="subtitle mb-0">
                                            <span>Giá vé</span>
                                            <span>{formatCurrencyVND(booking.subtotal) || 0}</span>
                                        </h6>
                                    </li>
                                </ul>
                                {/* <ul className="side-shape">
                                    <li>
                                        <h6 className="subtitle">
                                            <span>combos</span>
                                            <span>$57</span>
                                        </h6>
                                    </li>
                                </ul> */}
                                {/* <ul>
                                    <li>
                                        <span className="info">
                                            <span>giá</span>
                                            <span>$207</span>
                                        </span>
                                        <span className="info">
                                            <span>vat</span>
                                            <span>$15</span>
                                        </span>
                                    </li>
                                </ul> */}
                            </div>
                            <div className="proceed-area text-center">
                                <h6 className="subtitle">
                                    <span>Phải thanh toán</span>
                                    <span>{formatCurrencyVND(booking.subtotal) || 0}</span>
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