import React from "react";
import { uploadImage } from "@common/libs/uploadImage";
import {
  getProfileUser,
  postProfileUser,
} from "./../../../services/auth/authService";

const ProfilePage = () => {
  const [user, setUser] = React.useState<any>([]);
  const [urlImg, setUrlImg] = React.useState<any>("");
  const inputFile = React.useRef<any>();
  React.useEffect(() => {
    (async () => {
      const data = await getProfileUser();
      setUser(data.data);
    })();
  }, [urlImg]);
  function upLoadFile() {
    const _inputFile = inputFile.current;
    _inputFile?.click();
  }
  function urlParamImg(e: any) {
    (async (e: any) => {
      const apiImgProfile = await uploadImage(e.target.files);
      (async () => {
        const linkAvatar = { avatar: apiImgProfile };
        const data = await postProfileUser(linkAvatar);
        await postProfileUser(linkAvatar);
      })();
      setUrlImg(apiImgProfile);
    })(e);
  }
  return (
    <section className="movie-section padding-top padding-bottom bg-two">
      <div className="container">
        <div className="row row--form">
          <div className="col-12">
            <h4 className="form__title text-center my-4">Thông tin chi tiết</h4>
          </div>
          <div className="col-4 d-flex justify-content-center align-items-center">
            <img
              onClick={upLoadFile}
              className="w-75 h-75"
              src={user.avatar || ""}
              alt="lỗi"
            />
            <input
              ref={inputFile}
              className="d-none"
              type="file"
              onChange={urlParamImg}
            />
          </div>
          <div className="col-8">
            <div className="col-12">
              <div className="form__group">
                <label className="form__label" htmlFor="fullname">
                  Họ và tên
                </label>
                <input
                  id="fullname"
                  type="text"
                  name="fullname"
                  value={user.full_name || ""}
                  className="form__input"
                  readOnly
                />
              </div>
            </div>
            <div className="col-12">
              <div className="form__group">
                <label className="form__label" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  name="email"
                  value={user.email || ""}
                  className="form__input"
                  readOnly
                />
              </div>
            </div>
            <div className="col-12">
              <div className="form__group">
                <label className="form__label" htmlFor="gender">
                  Giới tính
                </label>
                <input
                  id="gender"
                  type="text"
                  name="gender"
                  value={user.gender || ""}
                  className="form__input"
                  readOnly
                />
              </div>
            </div>
            <div className="col-12">
              <div className="form__group">
                <label className="form__label" htmlFor="phone">
                  Số điện thoại
                </label>
                <input
                  id="phone"
                  type="text"
                  name="phone"
                  value={user.phone || ""}
                  className="form__input"
                  readOnly
                />
              </div>
            </div>
            <div className="col-12">
              <div className="form__group">
                <label className="form__label" htmlFor="birth_date">
                  Ngày sinh
                </label>
                <input
                  id="birth_date"
                  type="text"
                  name="birth_date"
                  value={user.birth_date || ""}
                  className="form__input"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
