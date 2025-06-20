import { ScrollToTop } from "@/common/hooks/global/useScrollToTop"
import SignInPage from "@/pages/auth/SignIn/page"
import SignUpUserPage from "@/pages/auth/SignUp/page"
import BookingDetailDashBoardPage from "@/pages/dashboard/Booking/detail/page"
import BookingDashBoardPage from "@/pages/dashboard/Booking/list/page"
import CinemaCreatePage from "@/pages/dashboard/Cinema/create/page"
import CinemaEditPage from "@/pages/dashboard/Cinema/edit/page"
import CinemaListPage from "@/pages/dashboard/Cinema/list/page"
import DashBoardHomePage from "@/pages/dashboard/Home/page"
import LayoutDashBoard from "@/pages/dashboard/LayoutDashBoard"
import MovieCreatePage from "@/pages/dashboard/Movies/create/page"
import MovieDetailPage from "@/pages/dashboard/Movies/detail/page"
import MovieEditPage from "@/pages/dashboard/Movies/edit/page"
import MovieListPage from "@/pages/dashboard/Movies/list/page"
import CinemaList from "@/pages/dashboard/RoomsCinema/create/cinemaList"
import CreateRoomByCinema from "@/pages/dashboard/RoomsCinema/create/page"
import DetailRoomCinema from "@/pages/dashboard/RoomsCinema/detailroom/page"
import RoomCinemaEditPage from "@/pages/dashboard/RoomsCinema/edit/page"
import RoomsListDashBoardCinema from "@/pages/dashboard/RoomsCinema/listRooms/page"
import ScreenCreatePage from "@/pages/dashboard/Screen/create/page"
import ScreenEditPage from "@/pages/dashboard/Screen/edit/page"
import ScreenListDashBoardPage from "@/pages/dashboard/Screen/list/page"
import SeatCreatePage from "@/pages/dashboard/Seat/create/page"
import SeatEditPage from "@/pages/dashboard/Seat/edit/page"
import SeatDashBoardPage from "@/pages/dashboard/Seat/list/page"
import SeatMapCreatePage from "@/pages/dashboard/SeatMap/create/page"
import SeatMapDetailPage from "@/pages/dashboard/SeatMap/detail/page"
import SeatMapEditPage from "@/pages/dashboard/SeatMap/edit/page"
import SeatMapListPage from "@/pages/dashboard/SeatMap/list/page"
import SeatTypeCreatePage from "@/pages/dashboard/SeatType/create/page"
import SeatTypeEditPage from "@/pages/dashboard/SeatType/edit/page"
import SeatTypeListPage from "@/pages/dashboard/SeatType/list/page"
import ServiceCreatePage from "@/pages/dashboard/Services/create/page"
import ServiceEditPage from "@/pages/dashboard/Services/edit/page"
import ServiceListPage from "@/pages/dashboard/Services/list/page"
import ShowTimeCreate from "@/pages/dashboard/ShowTime/create/page"
import ShowTimeEditPage from "@/pages/dashboard/ShowTime/edit/page"
import ShowTimeDashBoardPage from "@/pages/dashboard/ShowTime/list/page"
import TicketListPage from "@/pages/dashboard/Ticket/list/page"
import TicketTypeCreatePage from "@/pages/dashboard/TicketType/create/page"
import TicketTypeEditPage from "@/pages/dashboard/TicketType/edit/page"
import TicketTypeListPage from "@/pages/dashboard/TicketType/list/page"
import UserListPage from "@/pages/dashboard/User/list/page"
import NotFoundPage from "@/pages/website/404/page"
import LayoutBooking from "@/pages/website/_components/LayoutBooking/LayoutBooking"
import BookingSeat from "@/pages/website/BookingSeat/page"
import BookingServicePage from "@/pages/website/BookingService/page"
import CheckoutStatusPage from "@/pages/website/CheckoutStatus/page"
import MovieDetail from "@/pages/website/DetailPage/MovieDetail"
import HomePage from "@/pages/website/HomePage/page"
import LayoutClient from "@/pages/website/LayoutWebSite/LayoutClient"
import MovieList from "@/pages/website/MovieList/MovieList"
import TicketsPage from "@/pages/website/TicketList/page"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ProfilePage from './../pages/website/Profile/page'
import PrivateRouterLogin, { PrivateRouterBooking, PrivateRouterDashBoard } from "./PrivateRouterLogin"
import ForgotPassWordPage from "@/pages/auth/ForgotPassword/page"
import EmailSentScreen from "@/pages/auth/ForgotPassword/SentMailSuccess"

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/signup" element={<PrivateRouterLogin><SignUpUserPage /></PrivateRouterLogin>} />
          <Route path="/login" element={<PrivateRouterLogin><SignInPage /></PrivateRouterLogin>} />
          <Route path="/forgot-password" element={<PrivateRouterLogin><ForgotPassWordPage /></PrivateRouterLogin>} />
          <Route path="/send-email" element={<PrivateRouterLogin><EmailSentScreen /></PrivateRouterLogin>} />

          <Route path="/" element={<LayoutClient />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie" element={<MovieList />} />
            <Route path="/movie/detail/:id" element={<MovieDetail />} />

            <Route path="" element={<PrivateRouterBooking><LayoutBooking /></PrivateRouterBooking>}>
              <Route path="/movie/booking-seats/:id" element={<BookingSeat />} />
              <Route path="/movie/booking/services" element={<BookingServicePage />} />
              <Route path="/movie/booking/status/:method" element={<CheckoutStatusPage />} />
              <Route path="/account/profile" element={<ProfilePage />} />
              <Route path="account/ticket" element={<TicketsPage />} />
              <Route />
              <Route />
            </Route>
          </Route>

          {/* DashBoard */}
          <Route path="dashboard" element={<PrivateRouterBooking><PrivateRouterDashBoard><LayoutDashBoard /></PrivateRouterDashBoard></PrivateRouterBooking>}>
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
            <Route path="/dashboard/room-cinema/show-cinema" element={<CinemaList />} />
            <Route path="/dashboard/room-cinema/detail/:idRoom" element={<DetailRoomCinema />} />
            <Route path="/dashboard/room-cinema/edit/:idRoom" element={<RoomCinemaEditPage />} />

            <Route path="/dashboard/screen" element={<ScreenListDashBoardPage />} />
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

            <Route path="/dashboard/user" element={<UserListPage />} />
            {/* <Route path="/dashboard/movies" element={MovieListPage} /> */}


            <Route path="/dashboard/ticket" element={<TicketListPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Router