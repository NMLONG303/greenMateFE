import React, { useState, useEffect } from 'react';
import styles from '../styles/HomePage.module.css';
import Header from '../component/Header'; // Import component Header
import BottomNav from '../component/BottomNav'; // Import component BottomNav
import { useNavigate } from 'react-router-dom'; // Import useNavigate để chuyển hướng nếu chưa login

function HomePage() {
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
        navigate('/start');
      }
    } else {
      console.log('Không tìm thấy thông tin người dùng. Chuyển hướng.');
      navigate('/start');
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

    // *** Nếu loggedInUser đã có giá trị (đã load thành công) thì render nội dung trang ***
  return (
    <div className={styles.homeContainer}>
        {/* Truyền tên người dùng vào Header */}
        <div className={styles.header}>
            <Header userName={userNameForHeader} />
        </div>

        {/* Section Tin tức */}
        <section className={styles.newsSection}>
            <h2 className={styles.sectionTitle}>Tin tức</h2>
            <div className={styles.gridContainer}>
                {/* ... Nội dung tin tức (sẽ cần load từ API khác) ... */}
            </div>
        </section>

        {/* Section Hướng dẫn phân loại rác */}
        <section className={styles.recycleGuideSection}>
            <h2 className={styles.sectionTitle}>Hướng dẫn phân loại rác</h2>
            <div className={styles.gridContainer}>
                {/* ... Nội dung hướng dẫn (sẽ cần load từ API khác) ... */}
            </div>
        </section>

        {/* Section Handmade video */}
        <section className={styles.handmadeVideoSection}>
            <h2 className={styles.sectionTitle}>Handmade video</h2>
            <div className={styles.gridContainer}>
                {/* ... Nội dung video (sẽ cần load từ API khác) ... */}
            </div>
        </section>

        {/* Section Hoạt động ngoại khóa */}
        <section className={styles.extracurricularSection}>
            <h2 className={styles.sectionTitle}>Hoạt động ngoại khóa</h2>
            <div className={styles.gridContainer}>
                {/* ... Nội dung hoạt động (sẽ cần load từ API khác) ... */}
            </div>
        </section>

        {/* Bottom Navigation */}
        <div className={styles.nav}>
            <BottomNav />
        </div>

    </div>
  );
}

export default HomePage;