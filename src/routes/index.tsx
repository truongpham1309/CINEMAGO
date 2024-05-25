import SignInPage from "@/pages/auth/SignIn/page"
import SignUpUserPage from "@/pages/auth/SignUp/page"
import LayoutDashBoard from "@/pages/dashboard/LayoutDashBoard"
import { BrowserRouter, Route, Routes } from "react-router-dom"
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

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<PrivateRouterLogin><SignUpUserPage /></PrivateRouterLogin>} />
          <Route path="/login" element={<PrivateRouterLogin><SignInPage /></PrivateRouterLogin>} />

          {/* DashBoard */}
          <Route path="dashboard" element={<LayoutDashBoard />}>
            <Route index element={<>DashBoard Home</>} />
            <Route path="/dashboard/movie/create" element={<MovieCreatePage />} />
            <Route path="/dashboard/movie" element={<MovieListPage />} />
            <Route path="/dashboard/movie/edit/:id" element={<MovieEditPage />} />

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

            <Route path="/dashboard/screen" element={<ScreenListDasdBoardPage />} />
            <Route path="/dashboard/screen/create" element={<ScreenCreatePage />} />
            <Route path="/dashboard/screen/edit/:id" element={<ScreenEditPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Router