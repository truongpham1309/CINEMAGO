import { Button, TableProps } from "antd";
import { Link } from "react-router-dom";

export const tableColumns: TableProps<any>['columns'] = [
    {
        title: "#",
        dataIndex: "index",
        render: (_, __, index) => index + 1, 
    },
    {
        title: "Tên phim",
        dataIndex: "title",
        key: "title"
    },
    {
        title: "Thể loại",
        dataIndex: "genre",
        key: "genre"
    },
    {
        title: "Đạo diễn",
        dataIndex: "director",
        key: "director",
    },
    {
        title: "Thời lượng",
        dataIndex: "duration",
        key: "duration",
    },
    {
        title: "Ngày phát hành",
        dataIndex: "release_date",
        key: "release_date",
    },
    {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
    },
    {
        title: "",
        dataIndex: "Action",
        render: (_, __) => <>
            <Link to={"/dashboard/movie/edit/:id"}><Button className="btn btn-success">Edit</Button></Link>
            <Button>Xóa</Button>
        </>
    }
]