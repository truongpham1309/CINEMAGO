import { BrowserRouter, Route, Routes } from "react-router-dom"
import LayoutDashBoard from "../pages/dashboard/LayoutDashBoard"

const Router = () => {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="admin" element={<LayoutDashBoard />}>

                </Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default Router