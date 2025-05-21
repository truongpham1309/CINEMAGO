import { formatCurrencyVND } from "@/common/libs/fomatMoneyVND";
import { formatDate } from "@/common/libs/formatDateToString";
import { selectorBooking } from "@/common/store/booking/selectorBooking";
import { movieSelector } from "@/common/store/booking/selectorMovie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MovieBanner from "../_components/Booking/MovieBanner";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { getAllServiceClient, paymentBookingByMOMO, paymentBookingByVNPAY } from "@/services/bookingClient/bookingClientService";
import { Button, Card, InputNumber, List, Result, Space } from "antd";
import NotFoundPage from "../404/page";
import { add_services, clean_booking, decrement_service, delete_service, increment_service } from "@/common/store/booking/sliceBooking";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { TPaymentMethod } from "@/common/types/booking";
import { delete_info_movie } from "@/common/store/booking/sliceMovie";

const BookingServicePage = () => {
   const navigate = useNavigate();
   const movie = useSelector(movieSelector);
   const booking = useSelector(selectorBooking);
   const dispatch = useDispatch();
   const [paymentMethod, setPaymentMethod] = useState<TPaymentMethod>();
   const {
      data: services,
      isLoading,
      isError,
   } = useQuery({
      queryKey: ["SERVICES"],
      queryFn: async () => {
         return await getAllServiceClient();
      },
   });
   const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
   useEffect(() => {
      if (!movie || booking.seats.length === 0) {
         toast.error("Mời bạn chọn phim!", {
            position: "top-center",
         });
         dispatch(clean_booking());
         dispatch(delete_info_movie());
         sessionStorage.clear();
         navigate("/movie");
         return;
      }

      if (booking.seats.length === 0) {
         toast.warning("Bạn chưa chọn ghế!", {
            position: "top-center",
         });
         navigate(`/movie/booking-seats/${booking.showtime_id}`);
         return;
      }
   }, []);

   const handleQuantityChange = (id: number, value: number) => {
      setQuantities((prev) => ({ ...prev, [id]: value }));
   };

   const handleAddClick = (service: any) => {
      const quantity = quantities[service.id] || 0;
      if (quantity === 0) {
         toast.warning("Số lượng phải lớn hơn 0!", {
            position: "top-center",
         });
         return;
      }
      let _service = services.data.find((_s: any) => _s.id === service.id);

      if (!_service) {
         toast.error("Dịch vụ không tồn tại!", {
            position: "top-center",
         });
         return;
      }

      if (quantity > _service.quantity) {
         toast.error("Số lượng vượt quá số lượng dịch vụ của cửa hàng!", {
            position: "top-center",
         });
         return;
      }
      dispatch(add_services({ id: service.id, price: service.price, quantity }));
      setQuantities((prev) => ({ ...prev, [service.id]: 0 }));
   };

   const handleIncrement = (serviceId: string, price: number) => {
      dispatch(increment_service({ id: serviceId, price }));
   };

   const handleDecrement = (serviceId: string, price: number) => {
      dispatch(decrement_service({ id: serviceId, price }));
   };

   const handleRemove = (serviceId: string) => {
      dispatch(delete_service({ id: serviceId }));
   };

   const renderServiceDetails = (serviceId: number) => {
      const serviceDetails = services.data.find((service: any) => service.id === serviceId);
      return serviceDetails;
   };

   const price_service: number = booking?.services.length === 0 ? 0 : booking.services.reduce((sum: any, current: any) => sum + current.subtotal, 0);
   const price_ticket: number = booking?.subtotal - price_service;

   const { mutate, isPending } = useMutation({
      mutationFn: async (argument: any) => {
         switch (paymentMethod) {
            case "VN_PAY":
               return await paymentBookingByVNPAY(argument);
            case "MOMO":
               return await paymentBookingByMOMO(argument);
            default:
               toast.error("Phương thức thanh toán không hợp lệ!", {
                  position: "top-center",
               });
         }
      },
      onSuccess: (data) => {
         switch (paymentMethod) {
            case "VN_PAY":
               window.location.href = data.data.url;
               break;
            case "MOMO":
               window.location.href = data?.data?.payment_link?.payUrl;
               break;
         }
      },
      onError: (error) => {
         console.log(error);
         toast.error("Thất bại! Vui lòng thử lại...");
      },
   });

   const handlePaymentTicket = () => {
      if (!paymentMethod) {
         toast.error("Mời chọn phương thức thanh toán!", {
            position: "top-center",
         });
         return;
      }
      mutate(booking);
   };
   if (isLoading || isPending) return <LoadingComponent />;
   if (isError) return <NotFoundPage />;
   return (
      <>
         <MovieBanner />
         <div className="movie-facility padding-bottom padding-top">
            <div className="container">
               <div className="row">
                  <div className="section-header-3 col-12">
                     <h2 className="title">COMBO ƯU ĐÃI LỚN!!!</h2>
                  </div>
                  <div className="col-lg-8">
                     <div className="grid--area">
                        {services.data.length === 0 ? (
                           <Result
                              status="404"
                              title={<span className="custom-title">Rạp hiện chưa có dịch vụ nào!</span>}
                              subTitle={
                                 <>
                                    <span className="custom-subtitle">Rạp chưa có dịch vụ nào!</span>
                                 </>
                              }
                           />
                        ) : (
                           <List
                              grid={{ gutter: 16, xs: 1, sm: 2, md: 3 }}
                              dataSource={services.data}
                              renderItem={(service: any) => (
                                 <List.Item className="" style={{ backgroundColor: "rgba(255, 255, 255, 0.5)", width: 220 }}>
                                    <Card
                                       title={<div style={{ whiteSpace: "normal", wordWrap: "break-word" }}>{service.name}</div>}
                                       style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                                       actions={[
                                          <Button type="primary" onClick={() => handleAddClick(service)}>
                                             Thêm
                                          </Button>,
                                       ]}
                                    >
                                       <p>Price: {formatCurrencyVND(service?.price?.slice(0, -3))}</p>
                                       <InputNumber min={0} type="number" max={service.quantity} value={quantities[service.id] || 0} onChange={(value) => handleQuantityChange(service.id, value)} />
                                    </Card>
                                 </List.Item>
                              )}
                           />
                        )}
                     </div>

                     <div className="grid--area pr-4 ml-2">
                        <Space direction="vertical" size="small" className="text-white py-3 row" style={{ background: "#001232" }}>
                           {booking.services.map((service: any) => {
                              const serviceDetails = renderServiceDetails(service.service_id);
                              return (
                                 <Card key={service.service_id} className="text-white ml-1" style={{ background: "#001232" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                       <div>
                                          <h3 className="text-uppercase title">{serviceDetails?.name}</h3>
                                          <br />
                                          <p>Giá: {formatCurrencyVND(serviceDetails?.price?.slice(0, -3))}</p>
                                          <p>Đã chọn: {service.quantity}</p>
                                       </div>
                                       <Space>
                                          <Button type="primary" onClick={() => handleIncrement(service.service_id, serviceDetails.price)} icon={<PlusOutlined />} />
                                          <InputNumber className="text-center d-flex align-items-center" style={{ height: 35, width: 50 }} value={service.quantity} readOnly />
                                          <Button type="primary" onClick={() => handleDecrement(service.service_id, serviceDetails.price)} icon={<MinusOutlined />} />
                                          <Button type="primary" onClick={() => handleRemove(service.service_id)} icon={<DeleteOutlined />} danger />
                                       </Space>
                                    </div>
                                 </Card>
                              );
                           })}
                        </Space>
                     </div>
                     <div className="note text-white">
                        <h5 className="title">Chú ý :</h5>
                        <p>Mỗi ghế chỉ được đặt tối đa 3 dịch vụ</p>
                        <p>Vui lòng có mặt tại quầy trước 15 phút để nhận vé và dịch vụ</p>
                     </div>
                  </div>
                  <div className="col-lg-4">
                     <div className="booking-summery bg-one">
                        <h4 className="title">Vé của bạn</h4>
                        <ul>
                           <li>
                              <h6 className="subtitle">{movie?.movie_title}</h6>
                              <span className="info">
                                 {movie?.cinema_name} - {movie?.screen}
                              </span>
                           </li>
                           <li>
                              <h6 className="subtitle">
                                 <span>{movie?.city}</span>
                                 <span>{booking.seats.length}</span>
                              </h6>
                              <div className="info">
                                 <span>
                                    {formatDate(movie?.show_date)}, {movie?.show_time?.slice(-3, 0)}
                                 </span>{" "}
                                 <span>Tickets</span>
                              </div>
                           </li>
                           <li>
                              <h6 className="subtitle mb-0">
                                 <span>Giá vé</span>
                                 <span>{formatCurrencyVND(price_ticket) || 0}</span>
                              </h6>
                           </li>
                        </ul>
                        <ul className="side-shape">
                           {booking?.services.map((service: any) => {
                              const _service = services.data.find((_s: any) => _s.id === service.service_id);
                              return (
                                 <li key={service.service_id}>
                                    <h6 className="subtitle">
                                       <span>{_service.name}</span>
                                       <span>{formatCurrencyVND(service.subtotal)}</span>
                                    </h6>
                                    <div className="info">
                                       <span>Số lượng</span>
                                       <span>{service.quantity}</span>
                                    </div>
                                 </li>
                              );
                           })}
                           <li>
                              <h6 className="subtitle mb-0">
                                 <span>Giá dịch vụ</span>
                                 <span>{formatCurrencyVND(price_service) || 0}</span>
                              </h6>
                           </li>
                        </ul>
                     </div>
                     <div className="proceed-area text-center">
                        <h6 className="subtitle">
                           <span>Phải thanh toán</span>
                           <span>{formatCurrencyVND(booking?.subtotal) || 0}</span>
                        </h6>
                     </div>
                  </div>
                  <div className="col-lg-12 mt-3">
                     <div className="checkout-widget checkout-card mb-0">
                        <h5 className="title">Chọn phương thức thanh toán</h5>
                        <ul className="payment-option">
                           <li onClick={() => setPaymentMethod(TPaymentMethod.VN_PAY)} className={paymentMethod === TPaymentMethod.VN_PAY ? "active" : ""}>
                              <a>
                                 <img src="/assets/images/payment/Icon-VNPAY-QR.webp" alt="payment" />
                                 <span>VNPAY</span>
                              </a>
                           </li>
                           <li onClick={() => setPaymentMethod(TPaymentMethod.MOMO)} className={paymentMethod === TPaymentMethod.MOMO ? "active" : ""}>
                              <a>
                                 <img src="/assets/images/payment/icon_MOMO.png" alt="payment" />
                                 <span>MOMO</span>
                              </a>
                           </li>
                        </ul>
                        <div className="form-group">
                           <span onClick={handlePaymentTicket} className="custom-button">
                              Thanh toán
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default BookingServicePage;
