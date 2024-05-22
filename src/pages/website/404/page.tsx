import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <>
      <section className="section-404 padding-top padding-bottom">
        <div className="container">
          <div className="thumb-404">
          <h3> Oops.. Trang hiện đang lỗi</h3>
            <img src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1716163200&semt=ais_user" alt="404" width="50px" height="250px" />

          </div>
          
          <a href="index.html" className="custom-button">
            Back To Home <i className="flaticon-right"></i>
          </a>
        </div>
      </section>
     
    </>
  );
};

export default NotFoundPage;