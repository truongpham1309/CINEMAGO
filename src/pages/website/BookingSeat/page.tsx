import { useNavigate, useParams } from "react-router-dom"
import ScreenThumb from './_image/screen-thumb.png';
import Movie_bg_proceed from './_image/movie-bg-proceed.jpg';
import Seat01 from './_image/seat01.png';
import { useQuery } from "@tanstack/react-query";
import { getSeatMapByIDShowTime } from "@/services/bookingClient/bookingClientService";
import LoadingComponent from "@/components/ui/LoadingComponent";
import NotFoundPage from "../404/page";
import { Fragment, useEffect, useState } from "react";
import { notification } from "antd";
import SeatClient from "./_components/SeatClient";
import { WarningFilled } from "@ant-design/icons";
import { formatCurrencyVND } from "@/common/libs/fomatMoneyVND";
import { useDispatch, useSelector } from "react-redux";
import { add_info_movie } from "@/common/store/booking/sliceMovie";
import { selectorBooking } from "@/common/store/booking/selectorBooking";
import { add_seats } from "@/common/store/booking/sliceBooking";
import MovieBanner from "../_components/Booking/MovieBanner";
import { validateSeatSelection } from "./libs/checkSeat";
import { useChooseSeatsBooking } from "./hooks/useChooseSeat";
import { toast } from "react-toastify";


const items = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q"];
const BookingSeatPage = () => {
    let count = 0;
    const { id: showtime_id } = useParams();
    const dispatch = useDispatch();
    const { mutate } = useChooseSeatsBooking();
    const bookingMovie = useSelector(selectorBooking);
    const navigate = useNavigate();
    useEffect(() => {
        if (!bookingMovie.showtime_id) {
            navigate('/movie');
        }
    }, [bookingMovie]);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['SEATS_MAP', showtime_id],
        queryFn: async () => {
            const { data } = await getSeatMapByIDShowTime(+showtime_id!);
            return data;
        }
    });
    const [chooseSeat, setChooseSeat] = useState<any>();

    useEffect(() => {
        let _newSeats = data?.seats?.flatMap((s: any) => s);
        const _listSeatNumbers = bookingMovie?.seats?.flatMap((_seat: any) => {
            let _s = _newSeats?.find((__s: any) => __s.id === _seat);
            if (_s) return [_s.seat_number];
            return [];
        });
        const info_movie = {
            movie_title: data?.movie_title,
            show_time: data?.showtime,
            show_date: data?.show_date,
            city: data?.city,
            screen: data?.screen,
            cinema_name: data?.cinema_name
        };
        dispatch(add_info_movie(info_movie));
        setChooseSeat(_listSeatNumbers);
    }, [data]);


    const handleChooseSeatBooking = ({ id, price, ...rest }: any) => {
        if (!id) return null;
        const seat = bookingMovie?.seats.find((_s: any) => +_s === +id);
        const booking_seat = seat && rest.status === "Selected" ? { seat_ids: [id], showtime_id: showtime_id } : { id, showtime_id: showtime_id };
        if (bookingMovie.seats.length === 8 && !seat) {
            toast.error("Bạn chỉ được đặt tối đa 8 ghế!", {
                position: "top-center",
                autoClose: 1000
            });
            return null;
        }
        mutate({ type: seat && rest.status === "Selected" ? "CANCEL" : "CHOOSE", booking_seat: booking_seat }, {
            onSuccess: () => {
                console.log("Đã chọn ghế");
            },
            onError: (err) => {
                console.log(err);
                dispatch(add_seats({ id, price }));
            }
        });

        dispatch(add_seats({ id, price }));
        if (seat) {
            let _newSeats = chooseSeat.filter((_s: any) => _s !== rest.seatNumber);
            setChooseSeat([..._newSeats]);
            return;
        }
        else {
            if (bookingMovie.seats.length === 8) return;
            setChooseSeat([...chooseSeat, rest.seatNumber]);
        }

    }

    const handleBookingSeatPlans = () => {
        if (bookingMovie?.seats.length === 0) {
            notification.warning({
                message: "Bạn chưa chọn ghế nào!",
                icon: <WarningFilled />,
                duration: 3000,
                closable: true
            });
            return;
        }
        const checkSeatEmptyMiddle = validateSeatSelection(data.seats, bookingMovie.seats);
        if (checkSeatEmptyMiddle) navigate('/movie/booking/services');
    }
    if (isLoading) return <LoadingComponent />;
    if (isError) return <NotFoundPage />;
    return (
        <>
            <MovieBanner />
            <div className="seat-plan-section padding-bottom padding-top user-select-none">
                <div className="container">
                    <div className="screen-area">
                        <h4 className="screen">screen</h4>
                        <div className="screen-thumb">
                            <img src={ScreenThumb} alt="movie" />
                        </div>
                        <div className="screen-wrapper">
                            <ul className="seat-area">
                                {data?.seats?.map((s: any, i: number) => {
                                    if (s.length === 0) {
                                        return (
                                            <li key={i} className="seat-line empty"></li>
                                        )
                                    };
                                    count++;
                                    return (
                                        <li key={i} className="seat-line">
                                            <span>{s[0].type?.includes("thường") ? "N" : (s[0].type?.includes("vip") ? "V" : "C")}</span>
                                            <ul className="seat--area">
                                                <li className="front-seat">
                                                    <ul>
                                                        {s.map((_s: any, _i: number) => {
                                                            if (_s.type === "X" || _s.status === "UNOCCUPIED") {
                                                                return (
                                                                    <li key={_i} className='single-seat seat-visible'>
                                                                        <img src={Seat01} alt="seat" />
                                                                        <span className="sit-num">X</span>
                                                                    </li>
                                                                )
                                                            }
                                                            if (_s.id) {
                                                                return (
                                                                    <SeatClient
                                                                        key={_i}
                                                                        id={_s.id}
                                                                        seatNumber={_s.seat_number}
                                                                        seatType={_s.type} price={_s.price}
                                                                        handleClick={handleChooseSeatBooking}
                                                                        status={_s.status}
                                                                        booked={bookingMovie?.seats}
                                                                    />
                                                                )
                                                            }
                                                        })}
                                                    </ul>
                                                </li>
                                            </ul>
                                            <span>{items[count - 1]}</span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="proceed-book bg_img" data-background={Movie_bg_proceed}>
                        <div className="proceed-to-book">
                            <div className="book-item">
                                <span>Ghế bạn chọn</span>
                                <h3 className="title">
                                    {chooseSeat?.map((_s: any, _i: number) => {
                                        return (_i + 1) % 4 === 0 ? (<Fragment key={_i}>{_s} <br /></Fragment>) : <Fragment key={_i}>{_s}, </Fragment>;
                                    })}
                                </h3>
                            </div>
                            <div className="book-item text-center">
                                <span>Giá</span>
                                <h3 className="title">{bookingMovie.subtotal ? formatCurrencyVND(bookingMovie.subtotal) : ""}</h3>
                            </div>
                            <div className="book-item">
                                <span onClick={handleBookingSeatPlans} className="custom-button">
                                    tiếp tục
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookingSeatPage