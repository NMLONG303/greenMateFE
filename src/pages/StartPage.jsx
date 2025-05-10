import React from 'react';
import styles from '../styles/StartPage.module.css'; // Import CSS module
import { useNavigate } from 'react-router-dom';


function StartPage() {
  const navigate = useNavigate(); // *** Khởi tạo useNavigate ***

  // *** Hàm xử lý khi nhấn nút "Xác nhận" để quay về StartPage ***
  const handleloginClick = () => {
    navigate('/login'); // Điều hướng về trang gốc (StartPage)
  };
  const handleregiseterClick = () => {
    navigate('/register'); // Điều hướng về trang gốc (StartPage)
  };
  return (
    <div className={styles.loginContainer}>
      <div className={styles.welcome}>
        <img src="/images/welcome.svg" alt="welcome" />
      </div>
      <div className={styles.buttonSection}>
        <button className={styles.loginButton} onClick={handleloginClick}>Đăng nhập</button>
        <button className={styles.registerButton} onClick={handleregiseterClick}>Đăng ký</button>
      </div>
      <div className={styles.logo}>
        <img src="/images/logo.svg" alt="Logo" />
      </div>
    </div>
  );
}

export default StartPage;