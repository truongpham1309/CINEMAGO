import { useNavigate, useParams } from "react-router-dom"
import { useBookingQuery } from "../_hooks/useBooking";
import LoadingComponent from "@/components/ui/LoadingComponent";
import ServerError from "../../_components/500";
import { Alert, Button, Card, Descriptions, Form, Input, Modal, Table, TableProps } from "antd";
import { useState } from "react";
import confirm from "antd/es/modal/confirm";
import { ExclamationCircleFilled } from "@ant-design/icons";

const BookingDetailDashBoardPage = () => {
  const { id: idBooking } = useParams();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { data, isLoading, isError } = useBookingQuery(+idBooking!);

  const dataSource = [
    {
      key: '1',
      item: "Phim",
      description: data.data.booking.movie,
      quantity: 10,
      price: data.data.booking.subtotal
    },
    {
      key: '2',
      item: 'Room Booking',
      description: 'Bỏng ngô',
      quantity: 10,
      price: 250,
    },
    {
      key: '3',
      item: 'Dinner',
      description: 'Nước ngọt',
      quantity: 10,
      price: 50,
    }
  ];

  const columns: TableProps<any>['columns'] = [
    {
      title: '#',
      key: 'index',
      render: (_, __, index: number) => index + 1,
    },
    {
      title: 'Tên dịch vụ',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
    },
  ];

  const handleCancelBooking = () => {
    confirm({
      title: "Bạn có chắc chắc muốn hủy đơn vé này?",
      icon: <ExclamationCircleFilled />,
      content: "Nhấn OK để xóa",
      okText: 'Có',
      okType: 'primary',
      okCancel: true,
      cancelText: 'Hủy',
      onOk() {
        setIsVisible(true);

        setTimeout(() => navigate('/dashboard/booking'), 5000)
      },
      onCancel() {
        console.log('Cancel');
      },
    })
  };
  const totalPrice = dataSource.reduce((sum, record) => {
    return typeof record.price === "string" ? sum + parseFloat(record.price.replace('$', '')) : sum;
  }, 0);
  if (isLoading) return <LoadingComponent />
  if (isError) return <ServerError />;
  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary text-uppercase">Chi tiết Booking</h6>
      </div>
      <div className="card-body">
        {isVisible && <Alert
          message="Success"
          description="Bạn đã hủy vé thành công!"
          closable
        />}
        <Card title="Bill Booking" bordered={false} style={{ width: '100%' }}>
          <Descriptions bordered>
            <Descriptions.Item label="Booking ID">{data.data.booking.id}</Descriptions.Item>
            <Descriptions.Item label="Khách hàng">{data.data.booking.user}</Descriptions.Item>
            <Descriptions.Item label="Ngày">{data.data.booking.show_date}</Descriptions.Item>
            <Descriptions.Item label="Giờ">{data.data.booking.show_time}</Descriptions.Item>
            <Descriptions.Item label="Loại màn hình">{data.data.booking.screen}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái">{data.data.booking.status}</Descriptions.Item>
          </Descriptions>
          <Table dataSource={dataSource} columns={columns} pagination={false} style={{ marginTop: 20 }} />
          <div className="row align-items-center">
            <div className="col-sm-12 col-md-6 md:text-left sm:text-right">
              <span>
                Subtotal: {totalPrice}
              </span>
            </div>
            <div className="col-sm-12 col-md-6" style={{ marginTop: 20, textAlign: "right" }}>
              <Button type="primary" onClick={() => setOpen(true)} style={{ marginRight: 10 }}>
                Edit Information
              </Button>
              <Button onClick={handleCancelBooking} className="btn-danger">Cancel Booking</Button>
            </div>
          </div>

        </Card>
        <Modal title="Edit Information" centered open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)}>
          <Form>
            <Form.Item name="name" label="Customer Name" rules={[{ required: true, message: 'Please input your name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input your email!' }]}>
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  )
}

export default BookingDetailDashBoardPage