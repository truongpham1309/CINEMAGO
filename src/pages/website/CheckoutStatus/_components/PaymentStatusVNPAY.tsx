import { Alert } from "antd"
import PaymentSuccess from "./PaymentSuccess"
import { paymentBookingByVNPAYConfirm } from "@/services/bookingClient/bookingClientService";
import { useMutation } from "@tanstack/react-query";
import { delete_info_movie } from "@/common/store/booking/sliceMovie";
import { clean_booking } from "@/common/store/booking/sliceBooking";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingComponent from "@/components/ui/LoadingComponent";

const PaymentStatusVNPAY = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const dispatch = useDispatch();
    const [status, setStatus] = useState<"SUCCESS" | "QUESTIONS" | "FAILD">("QUESTIONS");

    const booking_id = queryParams.get("booking_id") || "";
    // const orderId = queryParams.get("orderId") || "";
    const resultCode = queryParams.get("vnp_TransactionStatus") || ""; // thay bằng status của VNPAY


    const { mutate, error, isPending, isError } = useMutation({
        mutationFn: async () => {
            const data = await paymentBookingByVNPAYConfirm({ booking_id, resultCode });
            return data;
        },
        onSuccess: () => {
            switch (resultCode) {
                case "00":
                    toast.success("Thanh toán thành công!", {
                        position: 'top-center'
                    });
                    break;
                case "02":
                    toast.success("Đã hủy thanh toán!", {
                        position: 'top-center'
                    });
                    break;
                default: toast.error("Mã trạng thái không hợp lệ!");
            }
            dispatch(clean_booking());
            dispatch(delete_info_movie());
        },
        onError: () => {
            toast.error("Lỗi xác nhận thanh toán!", {
                position: 'top-center',
            })
        }
    });
    useEffect(() => {
        if (resultCode === "00") setStatus("SUCCESS");
        if (resultCode === "02") setStatus("FAILD");
    }, [location]);
    if (['00', '02'].includes(resultCode)) {
        mutate();
    }
    if (isPending) return <LoadingComponent />
    return (
        <>
            <section className="py-5">
            </section>
            <section className="">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {
                                isError && (<Alert
                                    message="Lỗi xác nhận"
                                    className="mb-4"
                                    description={(error as any)?.response?.data?.message || "Không thể xác nhận!"}
                                    type="error"
                                    closable
                                />)
                            }
                        </div>
                        <div className="col-12">
                            <PaymentSuccess type={status} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PaymentStatusVNPAY