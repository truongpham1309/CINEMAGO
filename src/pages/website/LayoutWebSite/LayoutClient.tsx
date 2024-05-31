
import { Outlet } from 'react-router-dom';
import HeaderClient from './../_components/Header/HeaderClient';
import FooterClient from '../_components/Footer/FooterClient';
import GoToTop from '../_components/GoToTop';
const LayoutClient = () => {
    return (
        <>
            <HeaderClient />
            <section className="movie-section padding-top padding-bottom">
                <div className="container">
                    <Outlet />
                </div>
            </section>
            <GoToTop />
            <FooterClient />
        </>
    )
}

export default LayoutClient