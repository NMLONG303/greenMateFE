import React, { useState, useEffect } from 'react';
import Header from '../component/Header';
import BottomNav from '../component/BottomNav';
import Post from '../component/Post';
import StatusUpdate from '../component/StatusUpdate';
import styles from '../styles/GroupsPage.module.css';
import { useNavigate } from 'react-router-dom';

function GroupsPage() {
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
  const postsData = [
    {
      id: 1,
      userName: "User One",
      level: 3,
      rank: "Eco Enthusiast",
      timestamp: "10:30 - 02/05/2025",
      content: {
        type: "image",
        src: "/images/recycling_illustration.png",
        alt: "People recycling",
      },
      likes: 22,
      comments: 5,
    },
    {
      id: 2,
      userName: "GreenActivist",
      level: 2,
      rank: "Recycle Ranger",
      timestamp: "09:00 - 01/05/2025",
      content: {
        type: "text",
        text: "Just joined a local cleanup event! Let's make our neighborhood greener.",
      },
      likes: 15,
      comments: 2,
    },
    // Add more posts here
  ];

  return (
    <div className={styles.groupsContainer}>
      <Header userName={userNameForHeader} />

      <div className={styles.content}>
        <StatusUpdate />
        {postsData.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>

      <BottomNav activeTab="groups" /> {/* Assuming BottomNav has an activeTab prop */}
    </div>
  );
}

export default GroupsPage;