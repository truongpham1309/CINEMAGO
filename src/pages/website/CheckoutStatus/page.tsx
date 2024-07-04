import { clean_booking } from "@/common/store/booking/sliceBooking";
import { delete_info_movie } from "@/common/store/booking/sliceMovie";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { paymentBookingConfirm } from "@/services/bookingClient/bookingClientService";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import PaymentSuccess from "./_components/PaymentSuccess";

const CheckoutStatusPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const [status, setStatus] = useState<"SUCCESS" | "QUESTIONS" | "FAILD">("QUESTIONS");

  const booking_id = queryParams.get("booking_id") || "";
  const orderId = queryParams.get("orderId") || "";
  const resultCode = queryParams.get("resultCode") || "";

  
  const { mutate, error, isPending, isError } = useMutation({
    mutationFn: async () => {
      const data = await paymentBookingConfirm({ booking_id, orderId });
      return data;
    },
    onSuccess: () => {
      switch (resultCode) {
        case "0":
          toast.success("Thanh toán thành công!", {
            position: 'top-center'
          });
          dispatch(clean_booking());
          dispatch(delete_info_movie());
          break;
        case "1006":
          toast.success("Đã hủy thanh toán!", {
            position: 'top-center'
          });
          break;
        default:
      }
    },
    onError: () => {
      toast.error("Lỗi xác nhận thanh toán!", {
        position: 'top-center',
      })
    }
  });
  useEffect(() => {
    if(resultCode === "0") setStatus("SUCCESS");
    if(resultCode === "1006") setStatus("FAILD");

    if(['0', '1006'].includes(resultCode)) {
      mutate();
    }
  }, [location]);
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

export default CheckoutStatusPage