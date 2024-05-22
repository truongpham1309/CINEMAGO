
import { type } from './../../../../common/types/form/methodUseForm';
const MovieCreatePage = () => {
    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Tạo mới phim</h6>
            </div>
            <div className="card-body">
                <form action="">
                    <div className="row mt-3">
                        <div className="col-sm-12 col-md-6">
                            <div>
                                <label className="text-gray-800" htmlFor="">Tên phim</label>
                                <input type="text" placeholder="Tên phim..." className="form-control" />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div>
                                <label className="text-gray-800" htmlFor="">Thể loại</label>
                                <input type="text" placeholder="Thể loại..." className="form-control" />
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-sm-12 col-md-6">
                            <div>
                                <label className="text-gray-800" htmlFor="">Đạo diễn</label>
                                <input type="text" placeholder="Đạo diễn..." className="form-control" />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div>
                                <label className="text-gray-800" htmlFor="">Diễn viên</label>
                                <input type="text" placeholder="Diễn viên..." className="form-control" />
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-sm-6 col-md-4">
                            <div>
                                <label className="text-gray-800" htmlFor="">Thời lượng(phút)</label>
                                <input type="number" placeholder="Thời lượng..." className="form-control" />
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <div>
                                <label className="text-gray-800" htmlFor="">Trạng thái</label>
                                <select className="form-control" name="" id="">
                                    <option value="">Chọn trạng thái</option>
                                    <option value="Coming Soon">Sắp chiếu</option>
                                    <option value="Currently Showing">Đang chiếu</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <div>
                                <label className="text-gray-800" htmlFor="">Độ tuổi</label>
                                <select className="form-control" name="" id="">
                                    <option value="">Chọn độ tuổi</option>
                                    <option value="P">Mọi lứa tuổi</option>
                                    <option value="C13">Trên 13 tuổi</option>
                                    <option value="C16">Trên 16 tuổi</option>
                                    <option value="C18">Trên 18 tuổi</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-sm-6 col-md-4">
                            <div>
                                <label className="text-gray-800" htmlFor="">Ngày khởi chiếu</label>
                                <input type="date" className="form-control" />
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <div>
                                <label className="text-gray-800" htmlFor="">Image</label>
                                <input type="file" className="form-control" />
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <div>
                                <label className="text-gray-800" htmlFor="">Trailer(URL)</label>
                                <input type="text" placeholder="Trailer..." className="form-control" />
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-sm-12 col-md-12">
                            <div>
                                <label className="text-gray-800" htmlFor="">Mô tả</label>
                                <textarea className="form-control" name="" id="" rows={4} placeholder="Mô tả" />
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-sm-12 col-md-12">
                            <button type="submit" className="btn btn-primary py-0">Thêm mới</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default MovieCreatePage