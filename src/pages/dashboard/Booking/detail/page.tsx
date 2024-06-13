import { useNavigate, useParams } from "react-router-dom"
import { useBookingQuery } from "../_hooks/useBooking";
import LoadingComponent from "@/components/ui/LoadingComponent";
import ServerError from "../../_components/500";
import { Alert, Button, Card, Descriptions, Table, TableProps } from "antd";
import { useState } from "react";
import confirm from "antd/es/modal/confirm";
import { ExclamationCircleFilled } from "@ant-design/icons";

const BookingDetailDashBoardPage = () => {
  const { id: idBooking } = useParams();
  // const [countDown, setCountDown] = useState<number>(5);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  // const { data, isLoading, isError } = useBookingQuery(+idBooking!);
  // if (isLoading) return <LoadingComponent />
  // if (isError) return <ServerError />;
  const ResponseAPI = {
    booking: {
      id: 1,
      user: "Quốc Triệu",
      cinema: "Quoc Trieu",
      screen: "2D",
      movie: "Kingkong3",
      show_date: "2024-06-12",
      show_time: "19:40:39",
      quantity: 2,
      subtotal: "190000.00",
      status: "Paid"
    },
    services: [
      {
        name: "Coca",
        quantity: 1,
        subtotal: "10000.00"
      },
      {
        name: "Ngo",
        quantity: 1,
        subtotal: "20000.00"
      }
    ],
    ticket: {
      quantity: 2,
      subtotal: 160000
    }
  };

const columns: TableProps<any>['columns'] = [
  {
    title: '#',
    key: 'index',
    render: (_, __, index) => index + 1,
  },
  {
    title: 'Tên dịch vụ',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Giá',
    dataIndex: 'subtotal',
    key: 'subtotal',
  },
];

const handleCancelBooking = () => {
  confirm({
    title: "Bạn có chắc chắc muốn hủy đơn vé này?",
    icon: <ExclamationCircleFilled />,
    content: "Nhấn OK để xóa",
    okText: 'OK',
    okType: 'danger',
    okCancel: true,
    cancelText: 'Hủy',
    onOk() {
      setIsVisible(true);
      setTimeout(() => navigate('/dashboard/booking'), 2000)
    },
    onCancel() {
      console.log('Cancel');
    },
  })
};
const totalPrice = ResponseAPI.services.reduce((sum, record) => {
  return typeof record.subtotal === "string" ? sum + parseFloat(record.subtotal.replace('$', '')) : sum + record.subtotal;
}, 0);

return (
  <div className="card shadow mb-4">
    <div className="card-body">
      {isVisible && <Alert
        message="Success"
        description="Bạn đã hủy vé thành công! Trang sẽ tự động chuyển sau 2 giây"
        closable
      />}
      <Card className="text-uppercase" title="Chi tiết vé" bordered={false} style={{ width: '100%' }}>
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Booking ID">{ResponseAPI.booking.id}</Descriptions.Item>
          <Descriptions.Item label="Khách hàng">{ResponseAPI.booking.user}</Descriptions.Item>
          <Descriptions.Item label="Ngày">{ResponseAPI.booking.show_date}</Descriptions.Item>
          <Descriptions.Item label="Giờ">{ResponseAPI.booking.show_time}</Descriptions.Item>
          <Descriptions.Item label="Loại màn hình">{ResponseAPI.booking.screen}</Descriptions.Item>
          <Descriptions.Item label="Trạng thái">{ResponseAPI.booking.status}</Descriptions.Item>
        </Descriptions>
        <Table dataSource={ResponseAPI.services} columns={columns} rowKey={record => record.name} pagination={false} style={{ marginTop: 20 }} />
        <div className="row align-items-center">
          <div className="col-sm-12 col-md-6 md:text-left sm:text-right">
            <span>
              Subtotal: {totalPrice}
            </span>
          </div>
          <div className="col-sm-12 col-md-6" style={{ marginTop: 20, textAlign: "right" }}>
            <Button onClick={handleCancelBooking} className="btn-danger">Cancel Booking</Button>
          </div>
        </div>
      </Card>
    </div>
  </div>
)
}

export default BookingDetailDashBoardPage