import Image404 from './_image/404.png';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <>
      <section className="section-404 padding-top padding-bottom">
        <div className="container">
          <div className="thumb-404">
            <img className='w-50' src={Image404} alt={'404'} />
          </div>
          <h3 className="title text-uppercase">Trang không tồn tại :(</h3>
          <Link to="/" className="custom-button">
            Về trang chủ <i className="flaticon-right" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default NotFoundPage;