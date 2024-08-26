import { TMovie } from "@/common/types/movie";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { getAllMovieList } from "@/services/movie/movieService";
import { useQuery } from "@tanstack/react-query";
import { Table, TableProps, Select, Tag } from "antd";
import { Link } from "react-router-dom";
import ServerError from "../../_components/500";
import { useState } from "react";

const { Option } = Select;

const MovieListPage = () => {
  const [filterStatus, setFilterStatus] = useState<string | undefined>(
    undefined
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Coming Soon':
        return 'green';
      case 'Currently Showing':
        return 'gold';
      case 'Stopped Showing':
        return 'red';
      default:
        return 'default';
    }
  };
  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["MOVIES"],
    queryFn: async () => {
      const data = await getAllMovieList();
      return data;
    },
  });

  const handleFilterChange = (value: string) => {
    setFilterStatus(value);
  };

  const filteredMovies = filterStatus
    ? movie?.data?.movies.filter(
      (movie: TMovie) => movie.status === filterStatus
    )
    : movie?.data?.movies;

  const tableColumns: TableProps<TMovie>["columns"] = [
    {
      title: "#",
      dataIndex: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Tên phim",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Thể loại",
      dataIndex: "genre",
      key: "genre",
    },
    {
      title: "Ảnh",
      key: "image",
      render: (record) => <img src={record.image} style={{ width: 80 }} />,
    },
    {
      title: "Thời lượng",
      align: "center",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Ngày phát hành",
      dataIndex: "release_date",
      align: "center",
      key: "release_date",
    },
    {
      title: "Ngày dừng chiếu",
      dataIndex: "end_date",
      align: "center",
      key: "end_date",
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (_, record) => (
        <>
          <Tag color={getStatusColor(record.status)}>
            {record.status === "Coming Soon"
              ? "Sắp chiếu"
              : record.status === "Currently Showing"
                ? "Đang chiếu"
                : "Dừng chiếu"}
          </Tag>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Link className="mr-3 btn btn-warning" to={`/dashboard/movie/edit/${record.id}`}>
            Sửa
          </Link>
          <Link className="btn btn-danger" to={`/dashboard/movie/detail/${record.id}`}>Chi tiết</Link>
        </>
      ),
    },
  ];

  if (isLoading) return <LoadingComponent />;
  if (isError) return <ServerError />;

  return (
    <>
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex justify-content-between align-items-center">
          <h6 className="m-0 font-weight-bold text-primary text-uppercase">
            Danh sách phim
          </h6>
          <Select
            placeholder="Chọn trạng thái phim"
            style={{ width: 200 }}
            onChange={handleFilterChange}
            allowClear
          >
            <Option value="Currently Showing">Đang chiếu</Option>
            <Option value="Coming Soon">Sắp chiếu</Option>
            <Option value="Stopped Showing">Dừng chiếu</Option>
          </Select>
        </div>
        <div className="card-body">
          <Table
            columns={tableColumns}
            size="small"
            dataSource={filteredMovies}
            rowKey={(record) => record.id}
            pagination={{ defaultPageSize: 10 }}
          />
        </div>
      </div>
    </>
  );
};

export default MovieListPage;
