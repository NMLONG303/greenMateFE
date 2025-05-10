import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './BottomNav.module.css';

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const handleNavigation = (path) => {
    navigate(path);
    setActiveTab(path);
  };

  return (
    <nav className={styles.bottomNav}>
      <button
        className={`${styles.navButton} ${activeTab === '/' ? styles.active : ''}`}
        onClick={() => handleNavigation('/')}
      >
        <img src="/images/home.svg" alt="" />
        <span className={styles.navLabel}>Trang chủ</span>
      </button>
      <button
        className={`${styles.navButton} ${activeTab === '/achievement' ? styles.active : ''}`}
        onClick={() => handleNavigation('/achievement')}
      >
        <img src="/images/thanhTuu.svg" alt="" />
        <span className={styles.navLabel}>Thành tựu</span>
      </button>
      <button
        className={`${styles.navButton} ${activeTab === '/scan' ? styles.active : ''}`}
        onClick={() => handleNavigation('/scan')}
      >
        <img src="/images/scan.svg" alt="" />
        <span className={styles.navLabel}>Scan</span>
      </button>
      <button
        className={`${styles.navButton} ${activeTab === '/groups' ? styles.active : ''}`}
        onClick={() => handleNavigation('/groups')}
      >
        <img src="/images/congdong.svg" alt="" />
        <span className={styles.navLabel}>Cộng đồng</span>
      </button>
      <button
        className={`${styles.navButton} ${activeTab === '/profile' ? styles.active : ''}`}
        onClick={() => handleNavigation('/profile')}
      >
        <img src="/images/person.svg" alt="" />
        <span className={styles.navLabel}>Cá nhân</span>
      </button>
    </nav>
  );
}

export default BottomNav;