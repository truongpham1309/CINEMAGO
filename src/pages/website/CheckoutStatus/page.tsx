import { clean_booking } from "@/common/store/booking/sliceBooking";
import { delete_info_movie } from "@/common/store/booking/sliceMovie";
import { paymentBookingConfirm } from "@/services/bookingClient/bookingClientService";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import PaymentSuccess from "./_components/PaymentSuccess";

const CheckoutStatusPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const booking_id = queryParams.get("booking_id") || "";
  const orderId = queryParams.get("orderId") || "";
  const resultCode = queryParams.get("resultCode") || "";
  const [showError, setShowError] = useState(false);
  const { mutate, error } = useMutation({
    mutationFn: async () => {
      const data = await paymentBookingConfirm({ booking_id: 23, orderId });
      return data;
    },
    onSuccess: () => {
      if (Number(resultCode) === 0) {
        toast.success("Thanh toán thành công!", {
          position: 'top-center'
        });
        return;
      }

      switch (Number(resultCode)) {
        case 0:
          toast.success("Thanh toán thành công!", {
            position: 'top-center'
          });
          dispatch(clean_booking());
          dispatch(delete_info_movie());
          setTimeout(() => navigate('/'), 5000);
          break;
        case 1006:
          toast.success("Đã hủy thanh toán!", {
            position: 'top-center'
          });
          break;
      }
    },
    onError: () => {
      setShowError(true);
    }
  });
  useEffect(() => {
    if (Number(resultCode) === 0) {

    };
    // mutate()
  }, []);
  const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(e, 'I was closed.');
  };
  return (
    <>
      <section className="details-banner">
      </section>
      <section className="d">
        <div className="container">
          <div className="mb-5">
            {
              showError && (<Alert
                message="Lỗi xác nhận"
                description={(error as any)?.response?.data?.message || "Không thể xác nhận!"}
                type="error"
                closable
                onClose={onClose}
              />)
            }
          </div>
          <div className="row">
            <div className="col-12">
              <PaymentSuccess type="SUCCESS" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CheckoutStatusPage