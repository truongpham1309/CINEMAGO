import { TMovie } from "@/common/types/movie";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { deleteMovieByID, getAllMovieList } from "@/services/movie/movieService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Table, TableProps } from "antd"
import { Link } from "react-router-dom"
import { toast } from "react-toastify";
import ServerError from "../../_components/500";

const MovieListPage = () => {
    const queryClient = useQueryClient();
    const { mutate: deleteMovie, isPending: isDeleting } = useMutation({
        mutationFn: async (movie: TMovie) => {
            console.log(movie);
            await deleteMovieByID(movie.id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["MOVIES"],
            })
            toast.success("Xóa phim thành công!")
        },
        onError: () => {
            toast.error("Không thể xóa phim!")
        }
    });

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
            render: (text, record, index) => index + 1,
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
            title: "Thao tác",
            key: "action",
            render: (text, record) => <>
                <Link to={`/dashboard/movie/edit/${record.id}`}><Button type="primary" >Edit</Button></Link>
                <Button loading={isDeleting} onClick={() => deleteMovie(record)} type="primary" danger>Xóa</Button>
            </>
        }
    ];

    if (isLoading) return <LoadingComponent />
    if (isError) return <ServerError />
    return (
        <>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary text-uppercase">Danh sách phim</h6>
                </div>
                <div className="card-body">
                    <Table columns={tableColumns} dataSource={movie?.data?.movies} rowKey={(record) => record.id} pagination={{ defaultPageSize: 10 }} />
                </div>
            </div>
        </>
    )
}

export default MovieListPage