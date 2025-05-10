import React, { useState, useRef, useEffect } from 'react';
import styles from './Header.module.css';
import UserProfile from './UserProfile';
import { useNavigate } from 'react-router-dom';

function Header({ userName }) {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');

    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        // Lưu toàn bộ object user vào state
        setLoggedInUser(user);
        console.log('Đã tìm thấy thông tin người dùng:', user);

      } catch (error) {
        console.error('Lỗi khi đọc thông tin người dùng:', error);
        localStorage.removeItem('loggedInUser');
        navigate('/login');
      }
    } else {
      console.log('Không tìm thấy thông tin người dùng. Chuyển hướng.');
      navigate('/login');
    }
  }, [navigate]);


  // Tên người dùng để truyền vào Header
  // Sử dụng optional chaining (?.) để an toàn truy cập thuộc tính
  
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const profileRef = useRef(null);

  const toggleProfile = () => {
    setIsProfileVisible(!isProfileVisible);
  };

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target) && event.target.className !== styles.tabButton && event.target.innerText !== 'Tài sản>') {
      setIsProfileVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <img src='/images/logo.svg' alt="Logo Green Mate" className={styles.logoImage} />
      </div>
      <div className={styles.headerRight}>
        <p className={styles.greeting}>Xin chào {userName}!!!</p>
        <p className={styles.wish}>Chúc bạn một ngày tốt lành!!!</p>
        <button className={styles.tabButton} onClick={toggleProfile}>Tài sản&gt;</button> {/* Gắn lại onClick */}
      </div>
      <div className={styles.headerIcon}>
        <img src="/images/logo2.svg" alt="" />
      </div>
      {isProfileVisible && (
        <div ref={profileRef} className={styles.userProfileOverlay}> {/* Sử dụng lớp phủ */}
          <UserProfile
                        level={loggedInUser.level} // Truyền level từ object user
                        diem={loggedInUser.rewardPoints} // Truyền điểm thưởng từ object user
                        chucdanh={"Anh hùng Rác thải"} // Truyền chức danh (có thể là tĩnh hoặc logic tính toán)
                        // TODO: Nếu UserProfile cần các thông tin khác (ví dụ: tên, email, id cho activity log),
                        // hãy truyền user object đầy đủ xuống và UserProfile sẽ tự lấy các trường cần thiết.
                        // user={user} // <-- Truyền toàn bộ object nếu cần
                        // onClose={() => setIsProfileVisible(false)} // <-- Truyền hàm đóng nếu UserProfile có nút đóng
                    />
        </div>
      )}
    </header>
  );
}

export default Header;