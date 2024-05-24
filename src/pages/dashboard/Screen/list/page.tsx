import { TScreen } from "@/common/types/screen/screenType"
import { DeleteFilled, EditFilled } from "@ant-design/icons"
import { Button, Table, TableProps } from "antd"
import { Link } from "react-router-dom"
import { useScreenMutation, useScreenQuery } from "../hooks/useScreen"
import LoadingComponent from "@/components/ui/LoadingComponent"

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
                <Link className="mx-2" to={`/dasboard/screen/edit/${record.id}`}><Button><EditFilled /></Button></Link>
                <Button onClick={() => onDeleteScreen(record)} danger><DeleteFilled /></Button>
            </>
        }
    ];

    const onDeleteScreen = (record: TScreen) => {
        if (!confirm("Bạn có chắc chắc muốn xóa màn hình này không?")) return;
        console.log(record);
        mutate(record);
    }
    if (isLoading || isPending) return <LoadingComponent />
    return (
        <>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary text-uppercase">Tạo mới màn hình chiếu</h6>
                </div>
                <div className="card-body">
                    <Table columns={tableScreen} rowKey={record => record.id} dataSource={data.data.screens} pagination={false} />
                </div>
            </div>
        </>
    )
}

export default ScreenListDasdBoardPage