import { formatDateString } from "@/common/libs/formatDateToString";
import { groupShowtimes } from "@/common/libs/formatObjectFillterMovie";
import { selectorBooking } from "@/common/store/booking/selectorBooking";
import { add_showtime, delete_showtime } from "@/common/store/booking/sliceBooking";
import { getAllShowTimeByCityAndCinema } from "@/services/bookingClient/bookingClientService";
import { Alert } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ShowTimeByMovie = ({ movieID, rate }: any) => {
  const rates = rate === "C13" ? 13 : (rate === 'C16' ? 16 : (rate === 'C18' ? 18 : null));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const booking = useSelector(selectorBooking);
  const [filterMovie, setFilterMovie] = useState([] as any[]);
  const [isShow, setIsShow] = useState(false);
  const [properties, setProperties] = useState<any>({
    cities: [],
    date: [],
    cinema: [],
    showtimes: [],
  })
  const [filter, setFilter] = useState({
    movie_title: '',
    city: '',
    date: '',
    cinema: '',
  });

  useEffect(() => {
    (async () => {
      const data = await getAllShowTimeByCityAndCinema(+movieID!);
      setFilter({ ...filter, movie_title: data.data.movies[0].movie_name });
      setFilterMovie(groupShowtimes(data.data.movies));
    })();
    if (!filterMovie) {
      navigate('/movie');
    }
  }, [movieID]);

  useEffect(() => {
    if (filterMovie.length > 0) {
      const cities = Array.from(new Set(filterMovie.map((item) => item.cinema_city)));
      let city = cities[0] || '';
      const cinemas = getCinemasForCity(filterMovie, city);
      let cinema = cinemas[0] || '';
      const dates = getDatesForCinema(filterMovie, city, cinema);
      let date = dates[0] || '';
      const showtimes = getShowtimesForCinemaAndDate(filterMovie, city, cinema, date);

      setProperties({ cities, date: dates, cinema: cinemas, showtimes });

      setFilter({ ...filter, city, date, cinema });
    }
  }, [filterMovie]);

  const getCinemasForCity = (movies: any[], city: string) => {
    return Array.from(new Set(movies.flatMap((item) => {
      return item.cinema_city === city ? item.cinema : [];
    })));
  };

  const getDatesForCinema = (movies: any[], city: string, cinema: string) => {
    const dates = Array.from(new Set(movies.flatMap((item) => {
      return item.cinema_city === city && item.cinema === cinema ? item.rooms.flatMap((room: any) => room.children.date) : [];
    })));
    return dates.sort((a: string, b: string) => new Date(a).getTime() - new Date(b).getTime());
  };

  const getShowtimesForCinemaAndDate = (movies: any[], city: string, cinema: string, date: string) => {
    return movies.flatMap((item) => {
      console.log(item);
      if (item.cinema_city === city && item.cinema === cinema) {
        return item.rooms.flatMap((room: any) => {
          return room.children.date === date ? {
            screen: room.screen,
            showtimes: room.children.showtimes
          } : [];
        });
      }
      return [];
    });
  };

  const handleChangeFilter = (type: string, value: string) => {
    const updatedFilter = { ...filter, [type]: value };

    let updatedDates = properties.date;
    let updatedCinemas = properties.cinema;
    let updatedShowtimes = properties.showtimes;

    if (type === 'city') {
      updatedCinemas = getCinemasForCity(filterMovie, value);
      const cinema = updatedCinemas[0] || '';
      updatedDates = getDatesForCinema(filterMovie, value, cinema);
      updatedShowtimes = getShowtimesForCinemaAndDate(filterMovie, value, cinema, updatedDates[0] || '');
      updatedFilter.date = updatedDates[0] || '';
      updatedFilter.cinema = cinema;
    } else if (type === 'cinema') {
      updatedDates = getDatesForCinema(filterMovie, filter.city, value);
      updatedShowtimes = getShowtimesForCinemaAndDate(filterMovie, filter.city, value, updatedDates[0] || '');
      updatedFilter.date = updatedDates[0] || '';
    } else if (type === 'date') {
      updatedShowtimes = getShowtimesForCinemaAndDate(filterMovie, filter.city, filter.cinema, value);
    }

    setProperties({
      ...properties,
      date: updatedDates,
      cinema: updatedCinemas,
      showtimes: updatedShowtimes
    });

    setFilter(updatedFilter);
  };


  const handleChooseBookingShowTimes = ({ type, id }: { type: 'CLOSE' | 'OPEN' | 'CHOOSE-SEATS', id?: any }) => {
    switch (type) {
      case 'CLOSE':
        dispatch(delete_showtime());
        setIsShow(false);
        break;
      case 'OPEN':
        setIsShow(true);
        dispatch(add_showtime(id));
        break;
      case 'CHOOSE-SEATS':
        navigate(`/movie/booking-seats/${booking.showtime_id}`);
        break;
      default: toast.warning('Thao tác không hợp lệ!');
    }
  }
  if (filterMovie.length === 0) {
    return (
      <div className="container py-3 my-5">
        <Alert message={"Phim hiện chưa có suất chiếu!"} type="warning"></Alert>
      </div>
    )
  }
  return (
    <>
      {isShow && (
        <section className="window-warning">
          <div onClick={() => handleChooseBookingShowTimes({ type: "CLOSE" })} className="lay" />
          <div className="warning-item">
            <h6 className="subtitle">Chào mừng!</h6>
            <h4 className="title">Chọn Ghế của bạn</h4>
          {rate !== 'P' ? <><span className="py-4">⚠️ Phim có giới hạn độ tuổi {rates}+. Chỉ dành cho khán giả từ {rates} tuổi trở lên.</span></> : null}
            <div className="thumb">
              <img src='/assets/images/movie/seat-plan.png' alt="movie" />
            </div>
            <span onClick={() => handleChooseBookingShowTimes({ type: "CHOOSE-SEATS" })} className="custom-button seatPlanButton">
              Chọn ghế
              <i className="fas fa-angle-right" />
            </span>
          </div>
        </section>
      )}
      <div className="container mt-5">
        <div className="ticket-search-form two">
          <div className="form-group">
            <div className="thumb">
              <img src='/assets/images/ticket/city.png' alt="ticket" />
            </div>
            <span className="type">Thành phố</span>
            <div className="nice-select" tabIndex={0}>
              <span className="current">{filter.city || "Loading..."}</span>
              <ul className="list">
                {properties.cities?.map((c: any, i: number) => (
                  <li onClick={() => handleChangeFilter('city', c)} key={i} data-value={c} className={i === 0 ? "option selected forcus" : "option forcus"}>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="form-group">
            <div className="thumb">
              <img src='/assets/images/ticket/cinema.png' alt="ticket" />
            </div>
            <span className="type">Rạp</span>
            <div className="nice-select" tabIndex={0}>
              <span className="current">{filter.cinema || "Loading..."}</span>
              <ul className="list">
                {properties.cinema?.map((c: any, i: number) => (
                  <li onClick={() => handleChangeFilter('cinema', c)} key={i} data-value={c} className={c === filter.cinema ? "option selected focus" : "option focus"} >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="form-group">
            <div className="thumb">
              <img src='/assets/images/ticket/date.png' alt="ticket" />
            </div>
            <span className="type">Ngày</span>
            <div className="nice-select" tabIndex={0}>
              <span className="current">{formatDateString(filter.date || "")}</span>
              <ul className="list">
                {properties.date?.map((d: any, i: number) => (
                  <li onClick={() => handleChangeFilter('date', d)} data-value={formatDateString(d)} key={i} className={d === filter.date ? "option selected focus" : "option  focus"}>
                    {formatDateString(d)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="ticket-plan-section padding-bottom padding-top">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 mb-5 mb-lg-0">
              <ul className="seat-plan-wrapper bg-five">
                {properties?.showtimes?.map((item: any, index: number) => (
                  <li className="row" key={index}>
                    <div className="movie-name col-4">
                      <span className="name">
                        {filter.cinema + " - " + item.screen}
                      </span>
                    </div>
                    <div className="movie-schedule col-8">
                      {item.showtimes.map((s: any, i: number) => (
                        <div key={i} onClick={() => handleChooseBookingShowTimes({ type: "OPEN", id: s.id })} style={s.status === "Suất chiếu sớm" ? { background: '#FF1122' } : {}} title={s.status === "Suất chiếu sớm" ? s.status : ""} className="item">{s.time.slice(0, -3)}</div>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShowTimeByMovie