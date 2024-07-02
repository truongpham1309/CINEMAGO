import { Button, Result } from 'antd';
import '@styles/PaymentSuccess.css';

const PaymentSuccess = ({ type }: { type: 'SUCCESS' | 'FAILD' }) => {
  return (
    <div className="custom-result">
      <Result
        status={type === 'SUCCESS' ? 'success' : 'error'}
        title={<span className="custom-title">{type === 'SUCCESS' ? 'Thanh toán thành công' : 'Thanh toán thất bại'}</span>}
        subTitle={<span className="custom-subtitle">{type === 'SUCCESS' ? 'Cảm ơn bạn đã mua vé. Bạn có thể xem chi tiết vé của mình.' : 'Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại sau.'}</span>}
        extra={[
          <Button type="primary" key="ticketDetails">
            Xem chi tiết vé
          </Button>,
          <Button key="home">
            Quay về trang chủ
          </Button>,
        ]}
      />
    </div>
  );
};

export default PaymentSuccess;
