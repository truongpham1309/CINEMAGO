import { useNavigate, useParams } from "react-router-dom"
import { useBookingQuery } from "../_hooks/useBooking";
import LoadingComponent from "@/components/ui/LoadingComponent";
import ServerError from "../../_components/500";
import { Alert, Button, Card, Descriptions, Table, TableProps } from "antd";
import { useState } from "react";
import confirm from "antd/es/modal/confirm";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { formatCurrencyVND } from "@/common/libs/fomatMoneyVND";

const BookingDetailDashBoardPage = () => {
  const { id: idBooking } = useParams();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { data, isLoading, isError } = useBookingQuery(+idBooking!);
  if (isLoading) return <LoadingComponent />
  if (isError) return <ServerError />;
  const { data: ResponseAPI } = data;

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
      key: 'subtotal',
      render: (record) => formatCurrencyVND(record.subtotal)
    },
  ];

  const handleCancelBooking = () => {
    confirm({
      title: "Bạn có chắc chắc muốn hủy đơn vé này?",
      icon: <ExclamationCircleFilled />,
      content: "Khi xác nhận bạn không thể khôi phục!",
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

  const tableData = [
    ...ResponseAPI.services,
    {
      name: "Ghế",
      quantity: ResponseAPI.ticket.quantity,
      subtotal: ResponseAPI.ticket.subtotal,
    }
  ];

  const totalPrice = tableData.reduce((sum: any, record: any) => {
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
          <Descriptions bordered column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, }}>
            <Descriptions.Item label="Booking ID">{ResponseAPI.booking.id}</Descriptions.Item>
            <Descriptions.Item label="Khách hàng">{ResponseAPI.booking.user}</Descriptions.Item>
            <Descriptions.Item label="Ngày">{ResponseAPI.booking.show_date}</Descriptions.Item>
            <Descriptions.Item label="Tên rạp">{ResponseAPI.booking.cinema}</Descriptions.Item>
            <Descriptions.Item label="Số lượng ghế">{ResponseAPI.booking.quantity}</Descriptions.Item>
            <Descriptions.Item label="Tên ghế">{ResponseAPI.seats[0].seat_type}
              <br />
              {ResponseAPI.seats.map(_s => _s.seat_number).join(', ')}</Descriptions.Item>
            <Descriptions.Item label="Suất chiếu">{ResponseAPI.booking.show_time}</Descriptions.Item>
            <Descriptions.Item label="Loại màn hình">{ResponseAPI.booking.screen}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái">{ResponseAPI.booking.status}</Descriptions.Item>
          </Descriptions>
          <Table dataSource={tableData} columns={columns} rowKey={record => record.name} pagination={false} style={{ marginTop: 20 }} />
          <div className="row align-items-center">
            <div className="col-sm-12 col-md-6 md:text-left sm:text-right">
              <span>
                Subtotal: {formatCurrencyVND(totalPrice)}
              </span>
            </div>
            <div className="col-sm-12 col-md-6" style={{ marginTop: 20, textAlign: "right" }}>
              {ResponseAPI.booking.status === "Unpaid" ? <Button onClick={handleCancelBooking} className="btn-danger">Hủy</Button> : null}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default BookingDetailDashBoardPage