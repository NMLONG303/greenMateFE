import React from 'react';
import styles from '../styles/VerifyPhonePage.module.css';
import { useLocation,useNavigate } from 'react-router-dom';

function VerifyPhonePage() {
  const location = useLocation(); // Lấy đối tượng location
  const phoneNumber = location.state?.phoneNumber;
  const navigate = useNavigate(); // *** Khởi tạo useNavigate ***

  // *** Hàm xử lý khi nhấn nút "Xác nhận" để quay về StartPage ***
  const handleConfirmClick = () => {
      navigate('/login'); // Điều hướng về trang gốc (StartPage)
  };
  return (
    <div className={styles.verifyContainer}>
      <h1 className={styles.verifyTitle}>Đăng ký</h1>
      <p className={styles.verifySubtitle}>Vui lòng xác thực danh tính của bạn</p>

      <div className={styles.inputGroup}>
        <input
          type="tel"
          className={styles.inputField}
          placeholder="Xác thực số điện thoại"
          readOnly
          value={phoneNumber || ''} 
        />
      </div>

      <div className={styles.inputGroup}>
        <input
          type="text"
          className={styles.inputField}
          placeholder="Code"
        />
      </div>

      <button className={styles.nextButton} onClick={handleConfirmClick}>Xác nhận</button>

      <div className={styles.logo}>
        <img src="/images/logo.svg" alt="Logo" />
      </div>
    </div>
  );
}

export default VerifyPhonePage;