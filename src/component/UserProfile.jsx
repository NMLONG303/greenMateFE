import React, { useState, useEffect } from 'react';
import styles from './UserProfile.module.css'; // Tạo file CSS module cho component này

function UserProfile({ level, diem, chucdanh }) {
  
  return (
    <div className={styles.userProfileContainer}>
      <h2 className={styles.title}>Tài sản</h2>
      <div className={styles.profileInfo}>
        <div className={styles.avatarPlaceholder}>
          {/* Thay thế bằng hình ảnh avatar thực tế */}
          <div className={styles.avatar}></div>
        </div>
        <div className={styles.userDetails}>
          <p className={styles.level}>Level :{level}</p>
          <p className={styles.points}>Điểm thưởng: {diem}</p>
          <p className={styles.rank}>Chức danh: {chucdanh}</p>
        </div>
      </div>
      <button className={styles.recentActivityButton}>Thành tích gần đây</button>
      <div className={styles.activityLog}>
        <div className={styles.activityHeader}>
          <span className={styles.headerItem}>Thời gian</span>
          <span className={styles.headerItem}>Hoạt động</span>
          <span className={styles.headerItem}>Điểm thưởng</span>
        </div>
        <div className={styles.activityItem}>
          <span className={styles.itemDetail}>mm/dd/yy</span>
          <span className={styles.itemDetail}>Phân loại rác</span>
          <span className={styles.itemDetail}>+5</span>
        </div>
        <div className={styles.activityItem}>
          <span className={styles.itemDetail}>mm/dd/yy</span>
          <span className={styles.itemDetail}>Hoàn thành thử thách</span>
          <span className={styles.itemDetail}>+100</span>
        </div>
        {/* Thêm các mục hoạt động khác nếu cần */}
        <div className={styles.emptyRow}></div>
        <div className={styles.emptyRow}></div>
        <div className={styles.emptyRow}></div>
      </div>
    </div>
  );
}

export default UserProfile;