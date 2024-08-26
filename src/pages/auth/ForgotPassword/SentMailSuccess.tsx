import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const EmailSentScreen = () => {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundImage: "url('/src/assets/images/account/account-bg.jpg')" }} >
            <Result
                style={{ color: "white !important" }}
                status="success"
                title={<><span className='text-white' style={{ color: "white !important" }}>Chúng tôi đã gửi email cho bạn</span></>}
                subTitle={<><span className='text-white' style={{ color: "white !important" }}>Vui lòng kiểm tra email của bạn để đổi mật khẩu.</span></>}
                extra={
                    <Button type="primary" onClick={handleLoginRedirect}>
                        Đăng nhập
                    </Button>
                }
            />
        </div>
    );
};

export default EmailSentScreen;
