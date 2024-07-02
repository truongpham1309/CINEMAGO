import MovieBanner from "../_components/Booking/MovieBanner"
import { useSelector } from "react-redux";
import { movieSelector } from "@/common/store/booking/selectorMovie";
import { selectorBooking } from "@/common/store/booking/selectorBooking";
import { formatDate } from "@/common/libs/formatDateToString";
import { formatCurrencyVND } from "@/common/libs/fomatMoneyVND";
import { useState } from "react";
import { TPaymentMethod } from "@/common/types/booking";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { paymentBookingByMOMO } from "@/services/bookingClient/bookingClientService";

const CheckOutPage = () => {
    const movie = useSelector(movieSelector);
    const booking = useSelector(selectorBooking);
    const [paymentMethod, setPaymentMethod] = useState<TPaymentMethod>();
    const price_service = booking.services.length === 0 ? 0 : booking.services.reduce((sum: any, current: any) => sum + current.subtotal);
    const price_ticket = booking.subtotal + price_service;

    const { mutate, isPending } = useMutation({
        mutationFn: async (argument: any) => {
            switch (paymentMethod) {
                case "VN_PAY":
                    toast.warning("Chức năng chưa phát triển!", {
                        position: 'top-center'
                    });
                    break;
                case "MOMO":
                    return await paymentBookingByMOMO(argument);
                default: toast.error("Phương thức thanh toán không hợp lệ!", {
                    position: "top-center"
                });
            }
        },
        onSuccess: (data) => {
            switch (paymentMethod) {
                case "VN_PAY":

                    break;
                case "MOMO":
                    window.location.href = data?.data?.payment_link?.payUrl;
                    break;
            }
        },
        onError: () => {
            toast.error("Thất bại! Vui lòng thử lại...");
        }
    })

    const handlePaymentTicket = () => {
        if (!paymentMethod) {
            toast.error("Mời chọn phương thức thanh toán!", {
                position: 'top-center'
            });
            return;
        };
        console.log(booking);
        mutate(booking);

    }
    return (
        <>
            {/* ==========Banner-Section========== */}
            <MovieBanner />
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
                                        <h6 className="subtitle">{movie.movie_title}</h6>
                                        <span className="info">{movie.cinema_name} - {movie.screen}</span>
                                    </li>
                                    <li>
                                        <h6 className="subtitle">
                                            <span>{movie.city}</span>
                                            <span>{booking.seats.length}</span>
                                        </h6>
                                        <div className="info">
                                            <span>{formatDate(movie.show_date)}, {movie.show_time.slice(0, -3)}</span> <span>Tickets</span>
                                        </div>
                                    </li>
                                    <li>
                                        <h6 className="subtitle mb-0">
                                            <span>Giá vé</span>
                                            <span>{formatCurrencyVND(price_ticket) || 0}</span>
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
                            </div>
                            <div className="proceed-area text-center">
                                <h6 className="subtitle">
                                    <span>Phải thanh toán</span>
                                    <span>{formatCurrencyVND(booking.subtotal)}</span>
                                </h6>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="checkout-widget checkout-card mb-0">
                                <h5 className="title">Chọn phương thức thanh toán</h5>
                                <ul className="payment-option">
                                    <li onClick={() => setPaymentMethod(TPaymentMethod.VN_PAY)} className={paymentMethod === TPaymentMethod.VN_PAY ? "active" : ""}>
                                        <a>
                                            <img src="/src/assets/images/payment/Icon-VNPAY-QR.webp" alt="payment" />
                                            <span>VNPAY</span>
                                        </a>
                                    </li>
                                    <li onClick={() => setPaymentMethod(TPaymentMethod.MOMO)} className={paymentMethod === TPaymentMethod.MOMO ? "active" : ""}>
                                        <a>
                                            <img src="/src/assets/images/payment/icon_MOMO.png" alt="payment" />
                                            <span>MOMO</span>
                                        </a>
                                    </li>
                                </ul>
                                <div className="form-group">
                                    <button type="submit" disabled={isPending} onClick={handlePaymentTicket} className="custom-button">
                                        Thanh toán
                                    </button>
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