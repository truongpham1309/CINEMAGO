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

  return (
    <Card style={{ width: '100%' }}>
      <Row gutter={[16, 16]}>
        <Col span={4}>
          <Image
            src={movie.image}
            alt={movie.title}
            onClick={() => showTrailerModal(movie.trailer)}
            style={{ cursor: 'pointer' }}
          />
        </Col>
        <Col span={16} style={{ fontSize: "20px" }}>
          <Title level={1}>{movie.title}</Title>
          <Text strong>Thể loại: </Text><Text>{movie.genre}</Text><br />
          <Text strong>Đạo diễn: </Text><Text>{movie.director}</Text><br />
          <Text strong>Diễn viên: </Text><Text>{movie.actor}</Text><br />
          <Text strong>Thời lượng: </Text><Text>{movie.duration} phút</Text><br />
          <Text strong>Ngày khởi chiếu: </Text><Text>{movie.release_date}</Text><br />
          <Text strong>Ngày dừng chiếu: </Text><Text>{movie.end_date}</Text><br />
          <Text strong>Trạng thái: </Text><Tag color={getStatusColor(movie.status)}>
            {movie.status === "Coming Soon"
              ? "Sắp chiếu"
              : movie.status === "Currently Showing"
                ? "Đang chiếu"
                : "Dừng chiếu"}
          </Tag><br />
          <Text strong>Độ tuổi: </Text><Text>{movie.rated}</Text><br />
          <Text strong>Mô tả: </Text><div dangerouslySetInnerHTML={{ __html: movie.description }} /> <br />
        </Col>
      </Row>
      <Button
        type="primary"
        danger
        style={{ marginTop: '20px' }}
        onClick={() => onDeleteService(movie.id)}
      >
        Xóa phim
      </Button>

      <ModalVideo channel='youtube' isOpen={visible} videoId={extractVideoId(movie?.trailer || "") || ""} onClose={() => setVisible(false)} />

    </Card>
  );
};

export default MovieDetailPage;
