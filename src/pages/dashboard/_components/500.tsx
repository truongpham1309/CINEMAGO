
const ServerError = () => {
    return (
        <div className="text-center">
            <div className="error mx-auto" data-text={500}>
                500
            </div>
            <p className="lead text-gray-800 mb-5">SERVER ERROR</p>
            <p className="text-gray-500 mb-0">VUI LÒNG THỬ LẠI</p>
            <a href="/dashboard">← Về trang chủ</a>
        </div>

    )
}

export default ServerError