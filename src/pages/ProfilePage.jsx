import React, { useState, useEffect } from 'react';
import Header from '../component/Header';
import BottomNav from '../component/BottomNav';
import styles from '../styles/ProfilePage.module.css';
import { useNavigate } from 'react-router-dom';

// Import các component riêng cho từng section nếu bạn tách code (rất nên làm!)
// import PersonalInfoContent from './PersonalInfoContent';
// import LevelPointsContent from './LevelPointsContent';
// import OrderHistoryContent from './OrderHistoryContent';
// import RewardExchangeContent from './RewardExchangeContent';
// import HelpSupportContent from './HelpSupportContent';


function ProfilePage() {
  const navigate = useNavigate();

  // State để lưu thông tin người dùng đã đăng nhập (giữ nguyên)
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [errorLoadingUser, setErrorLoadingUser] = useState('');

  // State để theo dõi ID của section hiện đang mở (hoặc null nếu không có) (giữ nguyên)
  const [openSectionId, setOpenSectionId] = useState(null);

  // *** State mới để kiểm soát hiển thị hộp thoại xác nhận đăng xuất ***
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);


  // useEffect để load thông tin user từ Local Storage (giữ nguyên)
  useEffect(() => {
      const storedUser = localStorage.getItem('loggedInUser');

      if (storedUser) {
          try {
              const user = JSON.parse(storedUser);
              setLoggedInUser(user);
              console.log('ProfilePage: Đã load thông tin user', user);
              setIsLoadingUser(false);

          } catch (error) {
              console.error('ProfilePage: Lỗi khi đọc thông tin user', error);
              localStorage.removeItem('loggedInUser');
              setErrorLoadingUser('Lỗi tải thông tin người dùng.');
              setIsLoadingUser(false);
              navigate('/login');
          }
      } else {
          console.log('ProfilePage: Không tìm thấy user. Chuyển hướng.');
          setErrorLoadingUser('Bạn chưa đăng nhập.');
          setIsLoadingUser(false);
          navigate('/login');
      }
  }, [navigate]);


  // Handler khi nhấn vào các nút tùy chọn (đóng/mở section) (giữ nguyên)
  const handleOptionClick = (sectionId) => {
    if (openSectionId === sectionId) {
      setOpenSectionId(null);
    } else {
      setOpenSectionId(sectionId);
    }
    console.log('Toggle section:', sectionId);
  };

  // *** Handler khi nhấn nút Đăng xuất (chỉ hiển thị hộp thoại xác nhận) ***
   const handlelogoutClick = () => {
       console.log('Đăng xuất clicked - Showing confirmation');
       setShowLogoutConfirm(true); // *** Set state để hiển thị hộp thoại xác nhận ***
   };

   // *** Handler khi nhấn nút "Có" trong hộp thoại xác nhận (thực hiện đăng xuất) ***
   const handleConfirmLogout = () => {
       console.log('Confirmed logout');
       // Xóa thông tin người dùng khỏi Local Storage
       localStorage.removeItem('loggedInUser');
       // TODO: Nếu dùng JWT, xóa cả token
       // localStorage.removeItem('userToken');

       // Đóng hộp thoại xác nhận
       setShowLogoutConfirm(false);

       // Chuyển hướng về trang bắt đầu/đăng nhập
       navigate('/start'); // Hoặc '/login'
   };

   // *** Handler khi nhấn nút "Không" trong hộp thoại xác nhận (hủy đăng xuất) ***
   const handleCancelLogout = () => {
       console.log('Canceled logout');
       // Chỉ cần đóng hộp thoại xác nhận
       setShowLogoutConfirm(false);
   };


   // Phần hiển thị trạng thái loading, lỗi, hoặc yêu cầu đăng nhập (giữ nguyên)
    if (isLoadingUser) {
        return (
             <div className={styles.profileContainer}>
                 <Header userName={'Đang tải...'} />
                 <div className={styles.content}>
                     <div className={styles.loadingContent}>Đang tải thông tin tài khoản...</div>
                 </div>
                 <BottomNav activeTab="profile" />
             </div>
         );
    }

    if (errorLoadingUser) {
         return (
             <div className={styles.profileContainer}>
                 <Header userName={'Lỗi'} />
                 <div className={styles.content}>
                     <div className={styles.errorContent}>Lỗi: {errorLoadingUser}</div>
                 </div>
                 <BottomNav activeTab="profile" />
             </div>
         );
    }

    if (!loggedInUser) {
        return (
             <div className={styles.profileContainer}>
                 <Header userName={'Khách'} />
                 <div className={styles.content}>
                     <div className={styles.noUser}>Không có thông tin người dùng. Vui lòng đăng nhập lại.</div>
                 </div>
                 <BottomNav activeTab="profile" />
             </div>
         );
    }

  // Hàm render nội dung inline dựa trên activeSection (giữ nguyên logic)
  const renderInlineContent = (sectionId) => {
      // Kiểm tra nếu sectionId này đang mở
      if (openSectionId === sectionId) {
          // Render nội dung tương ứng
          switch (sectionId) {
              case 'personal-info':
                  return (
                      <div className={styles.inlineContent}>
                          {/* Nội dung Thông tin cá nhân */}
                          <p><strong>Họ và tên:</strong> {loggedInUser.fullName}</p>
                          <p><strong>Số điện thoại:</strong> {loggedInUser.phoneNumber}</p>
                          <p><strong>Địa chỉ:</strong> {loggedInUser.address}</p>
                          {/* ... */}
                      </div>
                  );
              case 'level-points':
                  return (
                       <div className={styles.inlineContent}>
                           {/* Nội dung Cấp độ / Điểm thưởng */}
                           <p><strong>Cấp độ hiện tại:</strong> {loggedInUser.level}</p>
                           <p><strong>Tổng điểm thưởng:</strong> {loggedInUser.rewardPoints} điểm</p>
                           {/* ... */}
                       </div>
                   );
              case 'order-history':
                  return (
                      <div className={styles.inlineContent}>
                          {/* Nội dung Lịch sử */}
                          <p>Nội dung lịch sử hoạt động và đơn hàng.</p>
                          {/* ... */}
                      </div>
                  );
              case 'reward-exchange':
                  return (
                      <div className={styles.inlineContent}>
                          {/* Nội dung Đổi thưởng */}
                          <p>Các ưu đãi có thể đổi.</p>
                          {/* ... */}
                      </div>
                  );
              case 'help-support':
                   return (
                       <div className={styles.inlineContent}>
                           {/* Nội dung Trợ giúp */}
                           <p>Câu hỏi thường gặp, thông tin liên hệ.</p>
                           {/* ... */}
                       </div>
                   );
              default:
                  return null; // Không render gì nếu ID không khớp
          }
      }
      return null; // Không render gì nếu section này không mở
  };


  // *** Nếu user đã load thành công, render giao diện ProfilePage bình thường ***
  return (
    <div className={styles.profileContainer}>
      {/* Truyền user object xuống Header */}
      <Header userName={loggedInUser.fullName} />

      <div className={styles.content}>
        {/* Phần avatar và tên */}
         <div className={styles.profileHeader}>
             <div className={styles.avatar}>
                 <img src='/images/person.svg' alt="Your Avatar" />
             </div>
             {/* Tên user có thể hiển thị ở đây */}
         </div>


        {/* Danh sách các tùy chọn */}
        <ul className={styles.optionsList}>

          {/* --- Tùy chọn: Thông tin cá nhân --- */}
          <li className={styles.optionItem}>
            <button
                className={`${styles.optionButton} ${openSectionId === 'personal-info' ? styles.activeOption : ''}`}
                onClick={() => handleOptionClick('personal-info')}
            >
                Thông tin cá nhân
            </button>
            {/* Gọi hàm render nội dung inline ngay dưới nút */}
            {renderInlineContent('personal-info')}
          </li>

          {/* --- Tùy chọn: Cấp độ / Điểm thưởng --- */}
          <li className={styles.optionItem}>
            <button
                 className={`${styles.optionButton} ${openSectionId === 'level-points' ? styles.activeOption : ''}`}
                 onClick={() => handleOptionClick('level-points')}
            >
                 Cấp độ / Điểm thưởng
             </button>
             {/* Gọi hàm render nội dung inline */}
             {renderInlineContent('level-points')}
          </li>

          {/* --- Tùy chọn: Lịch sử đơn hàng / Lịch sử tích điểm --- */}
          <li className={styles.optionItem}>
            <button
                 className={`${styles.optionButton} ${openSectionId === 'order-history' ? styles.activeOption : ''}`}
                 onClick={() => handleOptionClick('order-history')}
            >
                 Lịch sử đơn hàng / Lịch sử tích điểm
             </button>
             {/* Gọi hàm render nội dung inline */}
             {renderInlineContent('order-history')}
          </li>

          {/* --- Tùy chọn: Đổi thưởng --- */}
          <li className={styles.optionItem}>
            <button
                 className={`${styles.optionButton} ${openSectionId === 'reward-exchange' ? styles.activeOption : ''}`}
                 onClick={() => handleOptionClick('reward-exchange')}
            >
                 Đổi thưởng
             </button>
             {/* Gọi hàm render nội dung inline */}
             {renderInlineContent('reward-exchange')}
          </li>

          {/* --- Tùy chọn: Trợ giúp / Hỗ trợ --- */}
          <li className={styles.optionItem}>
            <button
                 className={`${styles.optionButton} ${openSectionId === 'help-support' ? styles.activeOption : ''}`}
                 onClick={() => handleOptionClick('help-support')}
            >
                 Trợ giúp / Hỗ trợ
             </button>
             {/* Gọi hàm render nội dung inline */}
             {renderInlineContent('help-support')}
          </li>

          {/* --- Nút Đăng xuất --- */}
          <li className={styles.optionItem}>
            <button
                className={styles.optionButton}
                onClick={handlelogoutClick} // Gắn handler hiển thị xác nhận
            >
              Đăng xuất
            </button>
             {/* Nút đăng xuất không có nội dung inline */}
          </li>
        </ul>

        {/* KHU VỰC NỘI DUNG ĐỘNG TẬP TRUNG (KHÔNG DÙNG CHO YC NÀY) */}
        {/* <div className={styles.dynamicContentArea}> */}
            {/* renderSectionContent() sẽ được dùng ở đây nếu không hiển thị inline */}
        {/* </div> */}


      </div> {/* Kết thúc content div */}

      {/* Bottom Navigation (giữ nguyên) */}
      <BottomNav activeTab="profile" />


      {/* *** JSX CHO HỘP THOẠI XÁC NHẬN ĐĂNG XUẤT TÙY CHỈNH *** */}
      {showLogoutConfirm && ( // Chỉ hiển thị khi state showLogoutConfirm là true
          <div className={styles.confirmationOverlay}> {/* Lớp phủ nền */}
              <div className={styles.confirmationBox}> {/* Hộp thoại chính */}
                  <p className={styles.confirmationMessage}>Bạn có chắc chắn muốn đăng xuất không?</p>
                  <div className={styles.confirmationButtons}>
                      {/* Nút "Có" - gọi handler xác nhận */}
                      <button className={styles.confirmButton} onClick={handleConfirmLogout}>Có</button>
                      {/* Nút "Không" - gọi handler hủy bỏ */}
                      <button className={styles.cancelButton} onClick={handleCancelLogout}>Không</button>
                  </div>
              </div>
          </div>
      )}
      {/* *** KẾT THÚC JSX HỘP THOẠI XÁC NHẬN TÙY CHỈNH *** */}

    </div> // Kết thúc profileContainer
  );
}

export default ProfilePage;