import { formatCurrencyVND } from "@/common/libs/fomatMoneyVND"
import { formatDate } from "@/common/libs/formatDateToString"
import { selectorBooking } from "@/common/store/booking/selectorBooking"
import { movieSelector } from "@/common/store/booking/selectorMovie"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import MovieBanner from "../_components/Booking/MovieBanner"
import { useMutation, useQuery } from "@tanstack/react-query"
import LoadingComponent from "@/components/ui/LoadingComponent"
import { getAllServiceClient } from "@/services/bookingClient/bookingClientService"
import { Button, Card, InputNumber, List, Result } from "antd"
import NotFoundPage from "../404/page"
import { add_services } from "@/common/store/booking/sliceBooking"

const BookingServicePage = () => {
    const navigate = useNavigate();
    const movie = useSelector(movieSelector);
    const booking = useSelector(selectorBooking);
    const dispatch = useDispatch();
    const { data: services, isLoading, isError } = useQuery({
        queryKey: ['SERVICES'],
        queryFn: async () => {
            return await getAllServiceClient();
        }
    });
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
    const { } = useMutation({
        mutationFn: async () => {

        },
        onSuccess: () => {

        },
        onError: () => {

        }
    });
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
    const handleQuantityChange = (id: number, value: number) => {
        setQuantities((prev) => ({ ...prev, [id]: value }));
    };

    const handleAddClick = (service: any) => {
        const quantity = quantities[service.id] || 0;
        console.log({ id: service.id, price: service.price, quantity });
        console.log(services)
        let _service = services.data.find((_s: any) => _s.id === service.id);

        if(!_service) {
            toast.error("Dịch vụ không tồn tại!", {
                position: "top-center"
            });
            return;
        }

        if(quantity > _service.quantity) {
            toast.error("Số lượng vượt quá số lượng dịch vụ của cửa hàng!", {
                position: "top-center"
            });
            return;
        }
        dispatch(add_services({ id: service.id, price: service.price, quantity }))
        setQuantities((prev) => ({ ...prev, [service.id]: 0 }));
    };
    if (isLoading) return <LoadingComponent />
    if (isError) return <NotFoundPage />
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
                                {services.data.length === 0 ? (
                                    <Result
                                        status='404'
                                        title={<span className="custom-title">Rạp hiện chưa có dịch vụ nào!</span>}
                                        subTitle={<>
                                            <span className="custom-subtitle">
                                                Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại sau.
                                            </span>
                                        </>}
                                    />
                                ) : (
                                    <List
                                        grid={{ gutter: 16, column: 3 }}
                                        dataSource={services.data}

                                        renderItem={(service: any) => (
                                            <List.Item style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                                                <Card
                                                    title={service.name}
                                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                                                    actions={[
                                                        <Button
                                                            type="primary"
                                                            onClick={() => handleAddClick(service)}
                                                        >
                                                            Add
                                                        </Button>,
                                                    ]}
                                                >
                                                    <p>Price: {formatCurrencyVND(service.price.slice(0, -3))}</p>
                                                    <InputNumber
                                                        min={0}
                                                        type="number"
                                                        max={service.quantity}
                                                        value={quantities[service.id] || 0}
                                                        onChange={(value) => handleQuantityChange(service.id, value)}
                                                    />
                                                    <span>Còn: {service.quantity}</span>
                                                </Card>
                                            </List.Item>
                                        )}
                                    />
                                )}
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