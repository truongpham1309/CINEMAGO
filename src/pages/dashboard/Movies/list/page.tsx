import { TMovie } from "@/common/types/movie";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { getAllMovieList } from "@/services/movie/movieService";
import { useQuery } from "@tanstack/react-query";
import { Table, TableProps } from "antd";
import { Link } from "react-router-dom";
import ServerError from "../../_components/500";

const MovieListPage = () => {
    const { data: movie, isLoading, isError } = useQuery({
        queryKey: ["MOVIES"],
        queryFn: async () => {
            const data = await getAllMovieList();
            return data;
        }
    })
    const tableColumns: TableProps<TMovie>['columns'] = [
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
            title: "Ảnh",
            key: "image",
            render: (record) => (<img src={record.image} style={{width: 80}} />),
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
            title: "Ngày dừng chiếu",
            dataIndex: "end_date",
            key: "end_date",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "",
            key: "action",
            render: (_, record) => <>
                <Link className="mr-3" to={`/dashboard/movie/edit/${record.id}`}>Sửa</Link>
                <Link to={`/dashboard/movie/detail/${record.id}`}>Chi tiết</Link>
            </>
        }
    ];
    console.log(movie);
    if (isLoading) return <LoadingComponent />
    if (isError) return <ServerError />
    return (
        <>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary text-uppercase">Danh sách phim</h6>
                </div>
                <div className="card-body">
                    <Table columns={tableColumns} size="small" dataSource={movie?.data?.movies} rowKey={(record) => record.id} pagination={{ defaultPageSize: 10 }} />
                </div>
            </div>
        </>
    )
}

export default MovieListPage