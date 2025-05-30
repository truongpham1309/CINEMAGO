import { formatDate } from "@/common/libs/formatDateToString"
import { movieSelector } from "@/common/store/booking/selectorMovie"
import { clear_services } from "@/common/store/booking/sliceBooking"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import CountDown from "../../BookingSeat/_components/CountDown"

const MovieBanner = () => {
    const navigate = useNavigate();
    const movie = useSelector(movieSelector);
    const dispatch = useDispatch();
    console.log("movie-banner", movie)
    const handleBackPage = () => {
        dispatch(clear_services());
        navigate(-1);
    }
    return (
        <>
            <section
                className="details-banner hero-area bg_img seat-plan-banner"
                style={{backgroundImage: "url('/assets/images/banner/banner04.jpg')", height: "60vh"}}
            >
                <div className="container">
                    <div className="details-banner-wrapper">
                        <div className="details-banner-content style-two">
                            <h3 className="title">{movie?.movie_title || "Loading..."}</h3>
                            <div className="tags">
                                <span>{movie?.city || "Loading..."} </span>
                                <span> {movie?.cinema_name || "Loading..."} - {movie?.screen || "Loading..."}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="page-title bg-one">
                <div className="container">
                    <div className="page-title-area">
                        <div className="item md-order-1">
                            <p
                                onClick={handleBackPage}
                                className="custom-button back-button"
                            >
                                <i className="flaticon-double-right-arrows-angles" />
                                Quay lại
                            </p>
                        </div>
                        <div className="item date-item text-uppercase text-white" >
                            <span className="date">{formatDate(movie?.show_date) || "Loading..."}</span>
                            <div className="nice-select current_showtime">
                                <span className="current">{movie?.show_time?.slice(0, -3) || "Loading..."}</span>
                            </div>
                        </div>
                        <CountDown />
                    </div>
                </div>
            </section>
        </>
    )
}

export default MovieBanner