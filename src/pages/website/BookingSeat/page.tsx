import { Banner04 } from "@/assets/images/banner";
import { Link, useNavigate, useParams } from "react-router-dom"
import ScreenThumb from './_image/screen-thumb.png';
import Movie_bg_proceed from './_image/movie-bg-proceed.jpg';
import CountDown from "./_components/CountDown";
import Seat01 from './_image/seat01.png';
import { useQuery } from "@tanstack/react-query";
import { getSeatMapByIDShowTime } from "@/services/bookingClient/bookingClientService";
import LoadingComponent from "@/components/ui/LoadingComponent";
import NotFoundPage from "../404/page";
import { formatDate } from "@/common/libs/formatDateToString";
import { Fragment, useEffect, useState } from "react";
import { notification } from "antd";
import SeatClient from "./_components/SeatClient";
import { WarningFilled } from "@ant-design/icons";
import { formatCurrencyVND } from "@/common/libs/fomatMoneyVND";
import { toast } from "react-toastify";


const items = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q"];
const BookingSeatPage = () => {
    const { id } = useParams();
    let count = 0;
    const navigate = useNavigate();
    const [booking, setBooking] = useState(JSON.parse(sessionStorage.getItem('booking')!) || null);
    useEffect(() => {
        if (!booking) {
            notification.info({
                message: "Bạn chưa chọn suất chiếu!",
            });
            navigate('/movie');
        }
    }, [booking]);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['SEATS_MAP', id],
        queryFn: async () => {
            const { data } = await getSeatMapByIDShowTime(+id!);
            return data;
        }
    });
    const [chooseSeat, setChooseSeat] = useState<any>();

    useEffect(() => {
        let _newSeats = data?.seats.flatMap((s: any) => s);
        const _listSeatNumbers = booking.seats.flatMap((_seat: any) => {
            let _s = _newSeats?.find((__s: any) => __s.id === _seat);
            if (_s) return [_s.seat_number];
            return [];
        });
        setChooseSeat(_listSeatNumbers);
    }, [data]);


    const handleChooseSeatBooking = ({ id, price, ...rest }: any) => {
        const seat = booking.seats.find((_s: any) => +_s === +id);
        if (seat) {
            let _newSeatsBooking = booking.seats.filter((_s: any) => +_s !== +id);
            let _newSeats = chooseSeat.filter((_s: any) => _s !== rest.seatNumber);
            let newSubtotal = Number(booking.subtotal) - Number(price);
            setBooking({ ...booking, seats: [..._newSeatsBooking], subtotal: newSubtotal });
            setChooseSeat([..._newSeats]);
            return;
        }
        if (booking.seats.length >= 8) {
            toast.warning("Bạn chỉ được đặt tối đa 8 ghế trong 1 lần đặt vé!");
            return;
        }
        else {
            setChooseSeat([...chooseSeat, rest.seatNumber]);
            setBooking({ ...booking, seats: [...booking.seats, id], subtotal: Number(booking.subtotal) + Number(price) });
        }
    }

    const handleBookingSeatPlans = () => {
        if (booking.seats.length === 0) {
            notification.warning({
                message: "Bạn chưa chọn ghế nào!",
                icon: <WarningFilled />,
                duration: 4000,
                closable: true
            });
            return;
        }
        sessionStorage.setItem('booking', JSON.stringify(booking));
        navigate('/movie/booking/services');
    }
    if (isLoading) return <LoadingComponent />;
    if (isError) return <NotFoundPage />;
    return (
        <>
            <section
                className="details-banner hero-area bg_img seat-plan-banner"
                data-background={Banner04}
            >
                <div className="container">
                    <div className="details-banner-wrapper">
                        <div className="details-banner-content style-two">
                            <h3 className="title">{data.movie_title}</h3>
                            <div className="tags user-select-none">
                                <span>{data.city} </span>
                                <span> {data.cinema_name} - {data.screen}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="page-title bg-one">
                <div className="container">
                    <div className="page-title-area">
                        <div className="item md-order-1">
                            <Link to={'/movies'} className="custom-button back-button">
                                <i className="flaticon-double-right-arrows-angles" />
                                back
                            </Link>
                        </div>
                        <div className="item date-item">
                            <span className="date">{formatDate(data.show_date)}</span>
                            <div className="nice-select current_showtime">
                                <span className="current text-white">{data.showtime.slice(0, -3)}</span>
                            </div>
                        </div>
                        <CountDown />
                    </div>
                </div>
            </section>

            <div className="seat-plan-section padding-bottom padding-top user-select-none">
                <div className="container">
                    <div className="screen-area">
                        <h4 className="screen">screen</h4>
                        <div className="screen-thumb">
                            <img src={ScreenThumb} alt="movie" />
                        </div>
                        <div className="screen-wrapper">
                            <ul className="seat-area">
                                {data.seats.map((s: any, i: number) => {
                                    if (s.length === 0) {
                                        return (
                                            <li key={i} className="seat-line"></li>
                                        )
                                    };
                                    count++;
                                    return (
                                        <li key={i} className="seat-line">
                                            <span>{s[0].type?.includes("thường") ? "N" : (s[0].type?.includes("VIP") ? "V" : "C")}</span>
                                            <ul className="seat--area">
                                                <li className="front-seat">
                                                    <ul>
                                                        {s.map((_s: any, _i: number) => {
                                                            if (_s.type === "X" || _s.type === "UNOCCUPIED") {
                                                                return (
                                                                    <li key={_i} className='single-seat seat-visible'>
                                                                        <img src={Seat01} alt="seat" />
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
                                                                        booked={booking.seats}
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
                                <h3 className="title">{booking.subtotal ? formatCurrencyVND(booking.subtotal) : ""}</h3>
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