import { useParams } from "react-router-dom"
import PaymentStatusMoMo from "./_components/PaymentStatusMoMo";
import PaymentStatusVNPAY from "./_components/PaymentStatusVNPAY";

const CheckoutStatusPage = () => {
  const { method } = useParams();
  return (
    <>
      {method === "MOMO" ? <PaymentStatusMoMo /> : (method === "VNPAY" ? <PaymentStatusVNPAY /> : null)}
    </>
  )
}

export default CheckoutStatusPage