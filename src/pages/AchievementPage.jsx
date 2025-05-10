import React, { useState, useEffect } from 'react';
import Header from '../component/Header'; // Import component Header
import BottomNav from '../component/BottomNav'; 
import styles from '../styles/AchievementPage.module.css';
import { useNavigate } from 'react-router-dom';

function AchievementPage() {
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
  const userNameForHeader = loggedInUser?.fullName || 'Đang tải...';


  // Nếu chưa có thông tin user (đang tải hoặc chưa login), hiển thị loading hoặc null
   if (!loggedInUser && localStorage.getItem('loggedInUser')) {
        // Có dữ liệu trong LS nhưng đang parse hoặc lỗi parse
       return <div>Đang tải thông tin người dùng...</div>;
   }

   if (!loggedInUser && !localStorage.getItem('loggedInUser')) {
       // Không có dữ liệu trong LS, useEffect sẽ chuyển hướng
       return null; // Không render gì
   }
  const userName = "Người dùng"; // Thay thế bằng tên người dùng thực tế

  return (
    <div className={styles.achievementContainer}>
      <Header userName={userNameForHeader} />

      <div className={styles.content}>
        <h2 className={styles.level}>Cấp độ 20</h2>
        <div className={styles.trophyContainer}>
          {/* Thay thế bằng hình ảnh hoặc SVG của chiếc cúp */}
          <div className={styles.trophy}>🏆</div>
          <div className={styles.progressBar}>
            <div className={styles.progress}></div>
          </div>
          <p className={styles.progressText}>290/300 XP</p>
        </div>

        <div className={styles.taskTabs}>
          <button className={`${styles.tabButton} ${styles.active}`}>Nhiệm vụ ngày</button>
          <button className={styles.tabButton}>Nhiệm vụ tuần</button>
        </div>

        <div className={styles.dailyTask}>
          <p className={styles.taskDescription}>Quét 10 chai nhựa <span className={styles.taskProgress}>8/10</span> <span className={styles.reward}>+ 30 đ</span></p>
          {/* Các nhiệm vụ hàng ngày khác có thể được thêm vào đây */}
        </div>

        <div className={styles.calendar}>
          <div className={styles.calendarHeader}>
            <button className={styles.calendarNav}>&lt;</button>
            <span className={styles.calendarMonth}>dd/mm/yy</span> {/* Hiển thị tháng/năm */}
            <button className={styles.calendarNav}>&gt;</button>
          </div>
          <div className={styles.weekdays}>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
          <div className={styles.daysGrid}>
            {/* Dữ liệu ngày và trạng thái nhiệm vụ sẽ được hiển thị ở đây */}
            {Array.from({ length: 35 }).map((_, index) => (
              <div key={index} className={styles.day}>
                <span className={styles.dayNumber}>{index + 1}</span>
                <div className={styles.taskIndicator}></div> {/* Chỉ báo trạng thái nhiệm vụ */}
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

export default AchievementPage;