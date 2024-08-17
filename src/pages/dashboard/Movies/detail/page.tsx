import { getDetailMovieByID } from "@/services/movie/movieService";
import { Button, Card, Col, Image, Modal, Row, Tag, Typography } from "antd";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteMovieByID } from "@/services/movie/movieService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import confirm from "antd/es/modal/confirm";
import { InfoCircleTwoTone } from "@ant-design/icons";
import ModalVideo from "react-modal-video";
const { Title, Text } = Typography;
const MovieDetailPage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [movie, setMovie] = React.useState<any>({});
  const [visible, setVisible] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState('');
  React.useEffect(() => {
    (async () => {
      const { data } = await getDetailMovieByID(+id!);
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
      icon: <InfoCircleTwoTone />,
      content: "Nhấn OK để xóa",
      okText: "Yes",
      okType: "primary",
      okCancel: true,
      cancelText: "Hủy",
      onOk() {
        deleteMovie(data);
      }
    });
  };

  const extractVideoId = (url: string) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

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

  const showTrailerModal = (url: string) => {
    setTrailerUrl(url);
    setVisible(true);
  };
  const getAgeRatingText = (rated) => {
    if (rated === 'P') {
      return 'Phù hợp cho mọi lứa tuổi';
    } else if (parseInt(rated) > 0) {
      return `Dành cho người trên ${rated} tuổi`;
    } else {
      return 'Không xác định độ tuổi';
    }
  };

  const ageRatingText = getAgeRatingText(movie.rated);
  

  return (
    <Card style={{ width: '100%' }}>
      <div className="row h-100">
        {/* Cột 1: Hình ảnh */}
        <div className="col-md-3 d-flex align-items-stretch">
          <div className="w-100">
            <img
              src={movie.image}
              alt={movie.title}
              onClick={() => showTrailerModal(movie.trailer)}
              style={{ cursor: 'pointer', width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Cột 2 và 3: Thông tin phim */}
        <div className="col-md-9 d-flex flex-column">
          {/* Tên phim */}
          <h1 className="mb-4 text-dark">{movie.title}</h1>
          <div className="row flex-grow-1">
            {/* Thông tin cột bên trái */}
            <div className="col-md-6 d-flex flex-column">
              <label><strong>Thể loại:</strong></label>
              <input type="text" className="form-control mb-2" value={movie.genre} readOnly />
              <br />

              <label><strong>Đạo diễn:</strong></label>
              <input type="text" className="form-control mb-2" value={movie.director} readOnly />
              <br />

              <label><strong>Diễn viên:</strong></label>
              <input type="text" className="form-control mb-2" value={movie.actor} readOnly />
              <br />

              <label><strong>Thời lượng:</strong></label>
              <input type="text" className="form-control mb-2" value={`${movie.duration} phút`} readOnly />
            </div>

            {/* Thông tin cột bên phải */}
            <div className="col-md-6 d-flex flex-column">
              <label><strong>Ngày khởi chiếu:</strong></label>
              <input type="text" className="form-control mb-2" value={movie.release_date} readOnly />
              <br />

              <label><strong>Ngày dừng chiếu:</strong></label>
              <input type="text" className="form-control mb-2" value={movie.end_date} readOnly />
              <br />

              <label><strong>Trạng thái:</strong></label>
              <input
                type="text"
                className="form-control mb-2"
                value={
                  movie.status === "Coming Soon"
                    ? "Sắp chiếu"
                    : movie.status === "Currently Showing"
                    ? "Đang chiếu"
                    : "Dừng chiếu"
                }
                readOnly
              />
              <br />

              <label><strong>Độ tuổi:</strong></label>
              <input type="text" className="form-control mb-2 text-dark" value={ageRatingText} readOnly />
            </div>
          </div>
        </div>
      </div>

      {/* Hàng cuối cùng: Mô tả */}
      <div className="row mt-4">
        <div className="col-12">
          <label><strong>Mô tả:</strong></label>
          <textarea
            // type="text"
            className="form-control"
            value={movie.description?.replace(/<[^>]+>/g, '')}
            readOnly
          />
        </div>
      </div>

      {/* Nút Xóa phim */}
      <Button
        type="primary"
        danger
        style={{ marginTop: '20px' }}
        onClick={() => onDeleteService(movie.id)}
      >
        Xóa phim
      </Button>

      {/* Modal Trailer */}
      <ModalVideo
        channel='youtube'
        isOpen={visible}
        videoId={extractVideoId(movie?.trailer || "") || ""}
        onClose={() => setVisible(false)}
      />
    </Card>
  );
};

export default MovieDetailPage;
