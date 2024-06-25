import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignInPage from "@/pages/auth/SignIn/page"
import SignUpUserPage from "@/pages/auth/SignUp/page"
import LayoutDashBoard from "@/pages/dashboard/LayoutDashBoard"
import PrivateRouterLogin from "./PrivateRouterLogin"
import MovieCreatePage from "@/pages/dashboard/Movies/create/page"
import NotFoundPage from "@/pages/website/404/page"
import MovieListPage from "@/pages/dashboard/Movies/list/page"
import MovieEditPage from "@/pages/dashboard/Movies/edit/page"
import SeatTypeCreatePage from "@/pages/dashboard/SeatType/create/page"
import SeatTypeListPage from "@/pages/dashboard/SeatType/list/page"
import SeatTypeEditPage from "@/pages/dashboard/SeatType/edit/page"
import TicketTypeCreatePage from "@/pages/dashboard/TicketType/create/page"
import TicketTypeListPage from "@/pages/dashboard/TicketType/list/page"
import TicketTypeEditPage from "@/pages/dashboard/TicketType/edit/page"
import CinemaCreatePage from "@/pages/dashboard/Cinema/create/page"
import CinemaListPage from "@/pages/dashboard/Cinema/list/page"
import CinemaEditPage from "@/pages/dashboard/Cinema/edit/page"
import ScreenCreatePage from "@/pages/dashboard/Screen/create/page"
import ScreenListDasdBoardPage from "@/pages/dashboard/Screen/list/page"
import ScreenEditPage from "@/pages/dashboard/Screen/edit/page"
import CreateRoomByCinema from "@/pages/dashboard/RoomsCinema/create/page"
import RoomsListDashBoardCinema from "@/pages/dashboard/RoomsCinema/listRooms/page"
import DetailRoomCinema from "@/pages/dashboard/RoomsCinema/detailroom/page"
import RoomCinemaEditPage from "@/pages/dashboard/RoomsCinema/edit/page"
import SeatMapCreatePage from "@/pages/dashboard/SeatMap/create/page"
import SeatMapListPage from "@/pages/dashboard/SeatMap/list/page"
import SeatMapDetailPage from "@/pages/dashboard/SeatMap/detail/page"
import SeatMapEditPage from "@/pages/dashboard/SeatMap/edit/page"
import ServiceCreatePage from "@/pages/dashboard/Services/create/page"
import ServiceListPage from "@/pages/dashboard/Services/list/page"
import ServiceEditPage from "@/pages/dashboard/Services/edit/page"
import LayoutClient from "@/pages/website/LayoutWebSite/LayoutClient"
import ShowTimeCreate from "@/pages/dashboard/ShowTime/create/page"
import ShowTimeDashBoardPage from "@/pages/dashboard/ShowTime/list/page"
import ShowTimeEditPage from "@/pages/dashboard/ShowTime/edit/page"
import MovieDetail from "@/pages/website/DetailPage/MovieDetail"
import MovieList from "@/pages/website/MovieList/MovieList"
import SeatCreatePage from "@/pages/dashboard/Seat/create/page"
import SeatDashBoardPage from "@/pages/dashboard/Seat/list/page"
import SeatEditPage from "@/pages/dashboard/Seat/edit/page"
import BookingDashBoardPage from "@/pages/dashboard/Booking/list/page"
import DashBoardHomePage from "@/pages/dashboard/Home/page"
import BookingDetailDashBoardPage from "@/pages/dashboard/Booking/detail/page"
import BookingMovieShowTimePage from "@/pages/website/BookingMovie/page"
import ProfilePage from './../pages/website/Profile/page';
import MovieDetailPage from "@/pages/dashboard/Movies/detail/page"
import BookingSeat from "@/pages/website/BookingSeat/page"
import SeatSelection from "@/pages/website/BookingSeat/SelectSeat"

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<PrivateRouterLogin><SignUpUserPage /></PrivateRouterLogin>} />
          <Route path="/login" element={<PrivateRouterLogin><SignInPage /></PrivateRouterLogin>} />

          <Route path="/" element={<LayoutClient />}>
            {/* Các router website */}
            <Route path="/" element={<>Hello World</>} />
            <Route path="/movie" element={<MovieList />} />
            <Route path="/movie/detail/:id" element={<MovieDetail />} />
            <Route path="/movie/booking-movie/:id" element={<BookingMovieShowTimePage />} />
            <Route path="/movie/booking-seats/:id" element={<BookingSeat />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
            <Route path="/movie/booking-seats/test" element={<SeatSelection />} />

          {/* DashBoard */}
          <Route path="dashboard" element={<LayoutDashBoard />}>
            <Route index element={<DashBoardHomePage />} />
            <Route path="/dashboard/movie" element={<MovieListPage />} />
            <Route path="/dashboard/movie/create" element={<MovieCreatePage />} />
            <Route path="/dashboard/movie/edit/:id" element={<MovieEditPage />} />
            <Route path="/dashboard/movie/detail/:id" element={<MovieDetailPage />} />

            <Route path="/dashboard/seattype" element={<SeatTypeListPage />} />
            <Route path="/dashboard/seattype/create" element={<SeatTypeCreatePage />} />
            <Route path="/dashboard/seattype/edit/:id" element={<SeatTypeEditPage />} />

            <Route path="/dashboard/ticket-type" element={<TicketTypeListPage />} />
            <Route path="/dashboard/ticket-type/create" element={<TicketTypeCreatePage />} />
            <Route path="/dashboard/ticket-type/edit/:id" element={<TicketTypeEditPage />} />

            <Route path="/dashboard/cinema" element={<CinemaListPage />} />
            <Route path="/dashboard/cinema/create" element={<CinemaCreatePage />} />
            <Route path="/dashboard/cinema/edit/:id" element={<CinemaEditPage />} />

            <Route path="/dashboard/cinema/:idCinema/rooms/create" element={<CreateRoomByCinema />} />
            <Route path="/dashboard/room-cinema" element={<RoomsListDashBoardCinema />} />
            <Route path="/dashboard/room-cinema/detail/:idRoom" element={<DetailRoomCinema />} />
            <Route path="/dashboard/room-cinema/edit/:idRoom" element={<RoomCinemaEditPage />} />

            <Route path="/dashboard/screen" element={<ScreenListDasdBoardPage />} />
            <Route path="/dashboard/screen/create" element={<ScreenCreatePage />} />
            <Route path="/dashboard/screen/edit/:id" element={<ScreenEditPage />} />

            <Route path="/dashboard/seat-map" element={<SeatMapListPage />} />
            <Route path="/dashboard/seat-map/detail/:id" element={<SeatMapDetailPage />} />
            <Route path="/dashboard/seat-map/edit/:id" element={<SeatMapEditPage />} />
            <Route path="/dashboard/seat-map/create" element={<SeatMapCreatePage />} />

            <Route path="/dashboard/service" element={<ServiceListPage />} />
            <Route path="/dashboard/service/create" element={<ServiceCreatePage />} />
            <Route path="/dashboard/service/edit/:id" element={<ServiceEditPage />} />

            <Route path="/dashboard/show-time" element={<ShowTimeDashBoardPage />} />
            <Route path="/dashboard/show-time/create" element={<ShowTimeCreate />} />
            <Route path="/dashboard/show-time/edit/:id" element={<ShowTimeEditPage />} />

            <Route path="/dashboard/seat" element={<SeatDashBoardPage />} />
            <Route path="/dashboard/seat/create" element={<SeatCreatePage />} />
            <Route path="/dashboard/seat/edit/:id" element={<SeatEditPage />} />

            <Route path="/dashboard/booking" element={<BookingDashBoardPage />} />
            <Route path="/dashboard/booking/detail/:id" element={<BookingDetailDashBoardPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Router