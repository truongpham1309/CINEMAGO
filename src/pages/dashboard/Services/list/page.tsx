import LoadingComponent from "@/components/ui/LoadingComponent";
import { useServiceMutation, useServiceQuery } from "../_hook/useService"
import { Button, Table, TableProps } from "antd";
import { TService } from "@/common/types/service/TypeService";
import ServerError from "../../_components/500";
import { Link } from "react-router-dom";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

const ServiceListPage = () => {
    const { mutate, isPending } = useServiceMutation({ type: "DELETE" });
    const tableService: TableProps<TService>['columns'] = [
        {
            title: "#",
            key: "index",
            render: (_, __, index) => index + 1
        },
        {
            title: "Tên dịch vụ",
            key: "name",
            dataIndex: "name"
        },
        {
            title: "Giá",
            key: "price",
            dataIndex: "price"
        },
        {
            title: "Số lượng",
            key: "quantity",
            dataIndex: "quantity",
        },
        {
            title: "Thao tác",
            key: "action",
            render: (record) => <>
                <Link className="mr-3" to={`/dashboard/service/edit/${record.id}`}><Button className="btn-success" icon={<EditFilled />}></Button></Link>
                <Button onClick={() => onDeleteService(record)} className="btn-danger" icon={<DeleteFilled />}></Button>
            </>
        }
    ];
    const onDeleteService = (data: Required<TService>) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa dịch vụ này?")) return;
        mutate(data);
    }
    const { data, isLoading, isError } = useServiceQuery();
    if (isLoading || isPending) return <LoadingComponent />
    if (isError) return <ServerError />
    return (
        <>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary text-uppercase">Danh sách dịch vụ</h6>
                </div>
                <div className="card-body">
                    <Table columns={tableService} rowKey={record => record.id!} dataSource={data.data.services} />
                </div>
            </div>
        </>
    )
}

export default ServiceListPage