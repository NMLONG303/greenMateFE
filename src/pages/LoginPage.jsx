import React, { useState } from 'react'; // Import useState
import styles from '../styles/LoginPage.module.css';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate, Link
import axios from 'axios'; // Import axios

function LoginPage() {
  // State cho các trường input: Số điện thoại/Email và Mật khẩu
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [password, setPassword] = useState('');

  // State cho checkbox "Nhớ tài khoản" (Logic này thường cần xử lý ở backend và frontend)
  const [rememberMe, setRememberMe] = useState(false);

  // State để hiển thị thông báo lỗi (nếu có)
  const [error, setError] = useState('');

  // State để hiển thị trạng thái loading khi đang gửi request (tùy chọn, nhưng tốt cho UX)
  const [isLoading, setIsLoading] = useState(false);

  // Hook để điều hướng người dùng sang trang khác
  const navigate = useNavigate();

  // Handler khi giá trị input Số điện thoại/Email thay đổi
  const handleLoginIdentifierChange = (e) => {
    setLoginIdentifier(e.target.value);
    setError(''); // Xóa lỗi cũ khi người dùng bắt đầu gõ
  };

  // Handler khi giá trị input Mật khẩu thay đổi
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(''); // Xóa lỗi cũ khi người dùng bắt đầu gõ
  };

  // Handler khi checkbox "Nhớ tài khoản" thay đổi
  const handleRememberMeChange = (e) => {
      setRememberMe(e.target.checked);
      // TODO: Bạn cần triển khai logic "Nhớ tài khoản" ở đây và backend
  };


  // Handler chính khi người dùng nhấn nút "Đăng nhập"
  const handleLogin = async () => {
    setError(''); // Reset thông báo lỗi
    setIsLoading(true); // Bắt đầu trạng thái loading

    // Basic Frontend Validation: Kiểm tra xem các trường có rỗng không
    if (!loginIdentifier.trim() || !password.trim()) {
        setError("Vui lòng nhập số điện thoại/email và mật khẩu.");
        setIsLoading(false); // Dừng loading
        return; // Ngừng xử lý nếu dữ liệu rỗng
    }

    try {
      // *** Gửi yêu cầu POST đến backend API ĐĂNG NHẬP AN TOÀN ***
      // Backend sẽ xử lý việc kiểm tra mật khẩu đã mã hóa và trạng thái xác thực.
      // URL: Thay đổi thành endpoint login chính xác của bạn (ví dụ: /api/auth/login)
      // Body: Gửi số điện thoại/email và mật khẩu thô. Backend sẽ nhận và xử lý.
      const response = await axios.post('http://3.25.215.80:8080/api/users/login', { // <-- THAY URL ENDPOINT ĐĂNG NHẬP CỦA BẠN
        phoneNumber: loginIdentifier, // Tên field phụ thuộc vào backend API mong đợi (có thể là username, email, phone...)
        password: password,
        // TODO: Có thể gửi trạng thái rememberMe nếu backend hỗ trợ
        // rememberMe: rememberMe,
      });

      // Xử lý khi yêu cầu thành công (backend trả về status 2xx)
      console.log('Login successful', response.data);

      // *** BƯỚC QUAN TRỌNG SAU ĐĂNG NHẬP THÀNH CÔNG: LƯU THÔNG TIN PHIÊN HOẶC TOKEN ***
      // Backend của bạn nên trả về JWT token và/hoặc thông tin user (không nhạy cảm).
      // Lưu thông tin này vào Local Storage, Session Storage hoặc Context API để duy trì trạng thái đăng nhập.
      // Ví dụ:
      // localStorage.setItem('userToken', response.data.token);
      // localStorage.setItem('userData', JSON.stringify(response.data.user));
      const userToStore = {
        id: response.data.id,
        fullName: response.data.fullName,
        phoneNumber: response.data.phoneNumber, // Lưu số điện thoại để dùng ở HomePage
        email: response.data.email, // Lưu các thông tin khác cần thiết
        address: response.data.address,
        level: response.data.level,
        rewardPoints: response.data.rewardPoints,
      };
      localStorage.setItem('loggedInUser', JSON.stringify(userToStore));
      setIsLoading(false); // Dừng loading

      // Chuyển hướng người dùng đến trang chính hoặc trang dashboard
      navigate('/'); // <-- THAY BẰNG ROUTE TRANG CHÍNH CỦA BẠN


    } catch (error) {
      // Xử lý khi yêu cầu thất bại (backend trả về status 4xx, 5xx)
      console.error('Login failed', error);

      setIsLoading(false); // Dừng loading

      // Hiển thị thông báo lỗi dựa trên phản hồi từ backend
      if (error.response && error.response.data) {
        // Backend nên trả về một message lỗi rõ ràng trong response.data
        // Ví dụ: "Invalid credentials", "Account not verified", v.v.
        setError(error.response.data);
      } else if (error.message) {
         // Xử lý lỗi mạng hoặc lỗi khác từ axios
         setError(`Lỗi kết nối: ${error.message}`);
      }
      else {
        setError('Đã xảy ra lỗi không xác định trong quá trình đăng nhập.');
      }
    }
  };


  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>Đăng nhập</h1>

      {/* FORM (tùy chọn sử dụng thẻ <form> và onSubmit thay vì onClick) */}
      {/* <form onSubmit={handleSubmit}> */}

          <div className={styles.inputGroup}>
            <span className={styles.inputIcon}>
              <img src="/images/Lock.svg" alt="Icon" />
            </span>
            <input
              type="text"
              className={`${styles.inputField} ${error ? styles.inputError : ''}`} // Thêm class lỗi nếu có
              placeholder="Số điện thoại hoặc email"
              value={loginIdentifier} // Gắn value từ state
              onChange={handleLoginIdentifierChange} // Gắn handler
              name="loginIdentifier" // Thêm name (tốt cho form và debug)
              disabled={isLoading} // Vô hiệu hóa khi đang loading
            />
          </div>

          <div className={styles.inputGroup}>
            <span className={styles.inputIcon}>
                <img src="/images/Lock.svg" alt="Icon" />
            </span>
            <input
              type="password"
              className={`${styles.inputField} ${error ? styles.inputError : ''}`} // Thêm class lỗi nếu có
              placeholder="Mật khẩu"
              value={password} // Gắn value từ state
              onChange={handlePasswordChange} // Gắn handler
              name="password" // Thêm name
              disabled={isLoading} // Vô hiệu hóa khi đang loading
            />
          </div>

           {/* Hiển thị thông báo lỗi */}
           {error && <p className={styles.errorText}>{error}</p>}

           {/* Hiển thị trạng thái loading */}
           {isLoading && <p>Đang xử lý đăng nhập...</p>}


          <div className={styles.rememberForgotPassword}>
            <label className={styles.rememberMe}>
              <input
                 type="checkbox"
                 checked={rememberMe}
                 onChange={handleRememberMeChange}
                 disabled={isLoading} // Vô hiệu hóa khi đang loading
              />
              Nhớ tài khoản
            </label>
            {/* TODO: Thay Link cho Quên mật khẩu */}
            <a href="#" className={styles.forgotPassword}>
              Quên mật khẩu?
            </a>
          </div>

          {/* Gắn handler handleLogin vào nút onClick */}
          {/* Hoặc dùng type="submit" nếu đặt trong form */}
          <button
              className={styles.loginButton}
              onClick={handleLogin}
              disabled={isLoading} // Vô hiệu hóa khi đang loading
          >
              {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'} {/* Thay đổi text nút khi loading */}
          </button>

      {/* </form> */}


      {/* Các phần đăng nhập qua mạng xã hội */}
      <div className={styles.socialLogin}>
        <hr className={styles.divider} />
        <span className={styles.socialText}>Hoặc đăng nhập với</span>
        <hr className={styles.divider} />
      </div>

      <div className={styles.socialButtons}>
        {/* Nút Facebook */}
        <button className={`${styles.socialButton} ${styles.facebookButton}`}>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.897 3.777-3.897 1.094.197 2.278.36 2.278.36v2.54h-1.279c-1.228 0-1.605.769-1.605 1.567v1.963h2.683l-.539 2.094H14.21v6.987c4.781-.75 8.438-4.887 8.438-9.878z" clipRule="evenodd" />
          </svg>
        </button>
        {/* Nút Google */}
        <button className={`${styles.socialButton} ${styles.googleButton}`}>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-1.945 3.479-4.792 3.479-2.759 0-4.992-2.241-4.992-4.991s2.233-4.991 4.992-4.991c1.454 0 2.416.635 3.071 1.248l2.291-2.291c-1.399-1.388-3.109-2.23-5.361-2.23-5.508 0-9.992 4.484-9.992 9.992s4.484 9.992 9.992 9.992c2.755 0 5.126-1.037 6.911-2.764-.589-.628-2.03-2.764-2.03-2.764s1.654-1.516 3.894-.817c2.24.699 3.894.817 3.894.817.904-.879 1.505-1.979 1.505-3.22 0-2.982-2.395-5.377-5.377-5.377z" />
          </svg>
        </button>
      </div>

      <div className={styles.registerSection}>
        <span className={styles.registerText}>Không có tài khoản?</span>
         {/* *** Thay Link cho Đăng ký *** */}
        <Link to="/register" className={styles.registerLink}>
          Đăng ký
        </Link>
      </div>
      <div className={styles.logo}>
        <img src="/images/logo.svg" alt="Logo" />
      </div>
    </div>
  );
}

export default LoginPage;