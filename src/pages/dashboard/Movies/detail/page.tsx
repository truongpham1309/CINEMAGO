import { getDetailMovieByID } from "@/services/movie/movieService";
import { Button } from "antd";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteMovieByID } from "@/services/movie/movieService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import confirm from "antd/es/modal/confirm";
import { ExclamationCircleFilled } from "@ant-design/icons";

const MovieDetailPage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [movie, setMovie] = React.useState<any>({});
  React.useEffect(() => {
    (async () => {
      const { data } = await getDetailMovieByID(id);
      setMovie(data.movie);
    })();
  }, [id]);
  const navigate = useNavigate();
  const { mutate: deleteMovie, isPending: isDeleting } = useMutation({
    mutationFn: async (id: any) => {
      console.log(id);
      await deleteMovieByID(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["MOVIES"],
      });
      toast.success("Xóa phim thành công!");
      navigate("/dashboard/movie");
    },
    onError: () => {
      toast.error("Không thể xóa phim!");
    },
  });
  const onDeleteService = (data: any) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa phim này?",
      icon: <ExclamationCircleFilled />,
      content: "Nhấn OK để xóa",
      okText: "Yes",
      okType: "primary",
      okCancel: true,
      cancelText: "Hủy",
      onOk() {
        deleteMovie(data);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">CHI TIẾT PHIM</h6>
        </div>
        <div className="card-body row mt-3">
          <div className="col-3 row m-0 position-relative ">
            <div className="col-12 h-100 d-flex justify-content-center align-items-center">
              <img className="w-75 h-100" src={movie.image || ""} alt="lỗi" />
            </div>
            <button
              className="btn__detail--movie"
              data-bs-toggle="modal"
              data-bs-target="#boxtrailer"
            >
              Xem trailer
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-youtube"
                viewBox="0 0 16 16"
              >
                <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
              </svg>
            </button>
          </div>
          <div className="col-9 row m-0">
            <div className="col-6">
              <div>
                <label className="text-gray-800" htmlFor="">
                  Tên phim
                </label>
                <input
                  type="text"
                  value={movie.title || ""}
                  className="form-control"
                  readOnly
                />
              </div>
            </div>
            <div className="col-6">
              <div>
                <label className="text-gray-800" htmlFor="">
                  Thể loại
                </label>
                <input
                  type="text"
                  value={movie.genre || ""}
                  className="form-control"
                  readOnly
                />
              </div>
            </div>
            <div className="col-6">
              <div>
                <label className="text-gray-800" htmlFor="">
                  Đạo diễn
                </label>
                <input
                  type="text"
                  value={movie.director || ""}
                  className="form-control"
                  readOnly
                />
              </div>
            </div>
            <div className="col-6">
              <div>
                <label className="text-gray-800" htmlFor="">
                  Diễn viên
                </label>
                <input
                  type="text"
                  value={movie.actor || ""}
                  className="form-control"
                  readOnly
                />
              </div>
            </div>
            <div className="col-6">
              <div>
                <label className="text-gray-800" htmlFor="">
                  Thời lượng
                </label>
                <input
                  type="text"
                  value={movie.duration || ""}
                  className="form-control"
                  readOnly
                />
              </div>
            </div>
            <div className="col-6">
              <div>
                <label className="text-gray-800" htmlFor="">
                  Ngày phát hành
                </label>
                <input
                  type="date"
                  value={movie.release_date || ""}
                  className="form-control"
                  readOnly
                />
              </div>
            </div>
            <div className="col-6">
              <div>
                <label className="text-gray-800" htmlFor="">
                  Độ tuổi phù hợp
                </label>
                <input
                  type="text"
                  value={movie.rated || ""}
                  className="form-control"
                  readOnly
                />
              </div>
            </div>
            <div className="col-6">
              <label className="text-gray-800" htmlFor="">
                Trạng thái
              </label>
              <input
                type="text"
                value={movie.status || ""}
                className="form-control"
                readOnly
              />
            </div>
            <div className="col-12">
              <div>
                <label className="text-gray-800" htmlFor="">
                  Mô tả
                </label>
                <div className="card__description">{movie.description}</div>
              </div>
            </div>
            <div className="col-12 d-flex justify-content-end">
              <div className="col-3 row m-0 mt-3 float-end">
                <div className="col-6">
                  <Link to={`/dashboard/movie/edit/${movie.id}`}>
                    <Button type="primary">Edit</Button>
                  </Link>
                </div>
                <div className="col-6">
                  <Button
                    loading={isDeleting}
                    onClick={() => onDeleteService(movie.id)}
                    type="primary"
                    danger
                  >
                    Xóa
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal detail__movie " id="boxtrailer">
        <div className="modal-dialog"></div>
        <div className="detail__movie__boxtrailer">
          <iframe src={movie.trailer || ""} title="Movie Trailer"></iframe>
        </div>
      </div>
    </>
  );
};

export default MovieDetailPage;
