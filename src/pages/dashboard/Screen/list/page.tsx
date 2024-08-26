import { TScreen } from "@/common/types/screen/screenType"
import { DeleteFilled, EditFilled, InfoCircleTwoTone } from "@ant-design/icons"
import { Button, Table, TableProps } from "antd"
import { Link } from "react-router-dom"
import { useScreenMutation, useScreenQuery } from "../hooks/useScreen"
import LoadingComponent from "@/components/ui/LoadingComponent"
import ServerError from "../../_components/500"
import confirm from "antd/es/modal/confirm"


const ScreenListDasdBoardPage = () => {
    const { data, isLoading, isError } = useScreenQuery();
    const { mutate, isPending } = useScreenMutation({ action: "DELETE" })
    const tableScreen: TableProps<Required<TScreen>>['columns'] = [
        {
            title: "#",
            key: "index",
            render: (_, __, index) => index + 1
        },
        {
            title: "Tên màn hình",
            key: "name",
            dataIndex: "name",
        },
        {
            title: "",
            key: "action",
            render: (record) => <>
                <Link className="mx-2" to={`/dashboard/screen/edit/${record.id}`}><Button className="btn-success" icon={<EditFilled />}></Button></Link>
                <Button onClick={() => onDeleteScreen(record)} className="btn-danger" icon={<DeleteFilled />}></Button>
            </>
        }
    ];

    const onDeleteScreen = (record: Required<TScreen>) => {
        confirm({
            title: "Bạn có chắc chắn muốn xóa màn hình này?",
            icon: <InfoCircleTwoTone />,
            content: "Nhấn OK để xóa",
            okText: 'Yes',
            okType: 'primary',
            okCancel: true,
            cancelText: 'Hủy',
            onOk() {
                mutate(record);
            }
        })
    }
    if (isLoading || isPending) return <LoadingComponent />
    if (isError) return <ServerError />;
    return (
        <>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary text-uppercase">Danh sách màn hình chiếu</h6>
                </div>
                <div className="card-body">
                    <Table columns={tableScreen} size="small" style={{width: 500, margin: "0 auto"}} rowKey={record => record.id} dataSource={data.data.screens} pagination={false} />
                </div>
            </div>
        </>
    )
}

export default ScreenListDasdBoardPage