import React, { useState } from 'react'; // Chỉ cần useState ở đây
import styles from '../styles/RegisterPage.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNaviage từ react-router-dom

function RegisterPage() {
  const [userData, setUserData] = useState({
    fullName: '',
    // dateOfBirth: '', // Thêm ngày sinh vào state
    address: '',
    phoneNumber: '',

    password: '', // Mật khẩu đã có trong state
  });

  // Thêm state riêng cho email và ngày sinh nếu bạn muốn xử lý chúng khác userData
  // hoặc đơn giản là thêm chúng vào userData
  const [dateOfBirth, setDateOfBirth] = useState('');

  const [termsAccepted, setTermsAccepted] = useState(false); // State cho checkbox

  const [errors, setErrors] = useState({}); // State để lưu các lỗi validation
  const [message, setMessage] = useState(''); // Message thành công/lỗi API

  const navigate = useNavigate(); // Hook để chuyển trang

  // Handler chung cho các input trong userData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    // Xóa lỗi cho trường này ngay khi người dùng bắt đầu gõ (tùy chọn)
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  // Handler riêng cho ngày sinh
   const handleDateOfBirthChange = (e) => {
       const { value } = e.target;
       setDateOfBirth(value);
       setErrors(prevErrors => ({ ...prevErrors, dateOfBirth: '' }));
   };


  // Handler cho checkbox điều khoản
  const handleTermsChange = (e) => {
      const { checked } = e.target;
      setTermsAccepted(checked);
      setErrors(prevErrors => ({ ...prevErrors, termsAccepted: '' }));
  };


  // Hàm validation
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Kiểm tra Họ và tên
    if (!userData.fullName.trim()) {
      newErrors.fullName = 'Họ và tên không được để trống.';
      isValid = false;
    }

     // Kiểm tra Ngày sinh
     if (!dateOfBirth) {
         newErrors.dateOfBirth = 'Ngày sinh không được để trống.';
         isValid = false;
     }
     // TODO: Thêm kiểm tra định dạng ngày sinh hoặc tuổi

    // Kiểm tra Khu vực sinh sống (address) - ví dụ không bắt buộc
    // if (!userData.address.trim()) {
    //     newErrors.address = 'Khu vực sinh sống không được để trống.';
    //     isValid = false;
    // }

    // Kiểm tra Số điện thoại
    if (!userData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Số điện thoại không được để trống.';
      isValid = false;
    } else if (!/^\d{10,11}$/.test(userData.phoneNumber.trim())) { // Ví dụ regex 10-11 chữ số
       newErrors.phoneNumber = 'Số điện thoại không hợp lệ (chỉ chứa 10-11 chữ số).';
       isValid = false;
    }


    // Kiểm tra Mật khẩu
    if (!userData.password.trim()) {
      newErrors.password = 'Mật khẩu không được để trống.';
      isValid = false;
    } else if (userData.password.trim().length < 6) { // Ví dụ mật khẩu tối thiểu 6 ký tự
      newErrors.password = 'Mật khẩu phải ít nhất 6 ký tự.';
      isValid = false;
    }

    // Kiểm tra checkbox điều khoản
    if (!termsAccepted) {
        newErrors.termsAccepted = 'Bạn phải đồng ý với điều khoản dịch vụ.';
        isValid = false;
    }


    setErrors(newErrors); // Cập nhật state lỗi
    return isValid; // Trả về kết quả validation
  };


  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn submit form mặc định của trình duyệt
    setMessage(''); // Xóa message cũ

    // Chạy validation trước khi gửi API
    const isValid = validateForm();

    if (isValid) {
      try {
         // Gửi yêu cầu POST đến endpoint tạo User
         // Bao gồm tất cả dữ liệu cần thiết từ state
        const response = await axios.post('http://3.25.215.80:8080/api/users', { // Thay URL endpoint của bạn
          fullName: userData.fullName,
          // Cần xử lý format ngày sinh phù hợp với backend (ví dụ: 'YYYY-MM-DD')
          // dateOfBirth: dateOfBirth,
          address: userData.address, // Sử dụng address trong userData
          phoneNumber: userData.phoneNumber,
          password: userData.password,
          // createdAt, level, rewardPoints, isVerified sẽ được backend xử lý
        });

        console.log('Registration successful', response.data);
        setMessage('Tạo tài khoản thành công! Chuyển hướng đến trang xác thực...');

        // Lấy số điện thoại từ phản hồi backend
        const createdUserPhoneNumber = response.data.phoneNumber;

        // Chuyển hướng đến trang xác thực số điện thoại và truyền số điện thoại đi
        navigate('/verify-phone', { state: { phoneNumber: createdUserPhoneNumber } });

      } catch (error) {
        console.error('Registration failed', error);
        // Hiển thị lỗi từ backend hoặc lỗi chung
        setMessage(error.response?.data || 'Lỗi trong quá trình tạo tài khoản!');
        // TODO: Xử lý các lỗi cụ thể từ backend (ví dụ: số điện thoại đã tồn tại)
        if (error.response && error.response.status === 400 && error.response.data.includes("Phone number already exists")) {
            setErrors(prevErrors => ({ ...prevErrors, phoneNumber: "Số điện thoại này đã được sử dụng." }));
            setMessage(''); // Không hiển thị message lỗi chung
        } else if (error.response) {
             setMessage(`Lỗi API: ${error.response.data || error.response.statusText}`);
        } else {
             setMessage(`Lỗi mạng: ${error.message}`);
        }

      }
    } else {
      // Nếu validation thất bại, các lỗi đã được cập nhật trong state errors
      setMessage('Vui lòng kiểm tra lại thông tin nhập.');
    }
  };


  return (
    <div className={styles.registerContainer}>
      <h1 className={styles.registerTitle}>Đăng ký</h1>

      {/* Bọc form và gắn onSubmit */}
      <form onSubmit={handleSubmit}>

          <div className={styles.inputGroup}>
            <span className={styles.inputIcon}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2m2-6h12m-3 6v-1a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v1m10-3.7c2.1 0 3.9-1.7 3.9-3.8S18.1 6.7 16 6.7c-2.1 0-3.9 1.7-3.9 3.8s1.8 3.7 3.9 3.7zm-7 0c2.1 0 3.9-1.7 3.9-3.8S9.1 6.7 7 6.7c-2.1 0-3.9 1.7-3.9 3.8s1.8 3.7 3.9 3.7z" />
              </svg>
            </span>
            <input
              type="text"
              className={`${styles.inputField} ${errors.fullName ? styles.inputError : ''}`} // Thêm class lỗi nếu có
              placeholder="Họ và tên"
              name="fullName" // Thêm name
              value={userData.fullName} // Gắn value từ state
              onChange={handleChange} // Gắn handler
            />
          </div>
          {errors.fullName && <p className={styles.errorText}>{errors.fullName}</p>} {/* Hiển thị lỗi */}


          <div className={styles.inputGroup}>
            <span className={styles.inputIcon}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M9 11a3 3 0 1 0 6 0 3 3 0 0 0-6 0zM17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2h16z" />
              </svg>
            </span>
            <input
              type="date" // Type="date" không dùng placeholder tốt
              className={`${styles.inputField} ${errors.dateOfBirth ? styles.inputError : ''}`}
              // placeholder="Ngày sinh" // Bỏ placeholder hoặc dùng giải pháp CSS
              name="dateOfBirth" // Thêm name
              value={dateOfBirth} // Gắn value từ state
              onChange={handleDateOfBirthChange} // Gắn handler riêng
            />
          </div>
          {errors.dateOfBirth && <p className={styles.errorText}>{errors.dateOfBirth}</p>}


          <div className={styles.inputGroup}>
            <span className={styles.inputIcon}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74L12 21l4-6.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm0 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
            </span>
            <input
              type="text"
              className={`${styles.inputField} ${errors.address ? styles.inputError : ''}`}
              placeholder="Khu vực sinh sống"
              name="address" // Thêm name
              value={userData.address} // Gắn value từ state
              onChange={handleChange} // Gắn handler
            />
          </div>
           {/* {errors.address && <p className={styles.errorText}>{errors.address}</p>} */} {/* Hiển thị lỗi nếu bắt buộc */}


          <div className={styles.inputGroup}>
            <span className={styles.inputIcon}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z" />
              </svg>
            </span>
            <input
              type="tel"
              className={`${styles.inputField} ${errors.phoneNumber ? styles.inputError : ''}`}
              placeholder="Số điện thoại"
              name="phoneNumber" // Thêm name
              value={userData.phoneNumber} // Gắn value từ state
              onChange={handleChange} // Gắn handler
            />
          </div>
          {errors.phoneNumber && <p className={styles.errorText}>{errors.phoneNumber}</p>}



           {/* Thêm input Mật khẩu */}
           <div className={styles.inputGroup}>
             <span className={styles.inputIcon}>
                {/* Icon cho mật khẩu - có thể dùng lại icon khóa từ LoginPage */}
                 <img src="/images/Lock.svg" alt="" />
             </span>
             <input
                 type="password"
                 className={`${styles.inputField} ${errors.password ? styles.inputError : ''}`}
                 placeholder="Mật khẩu"
                 name="password" // Thêm name
                 value={userData.password} // Gắn value từ state
                 onChange={handleChange} // Gắn handler
             />
           </div>
           {errors.password && <p className={styles.errorText}>{errors.password}</p>}


          <label className={`${styles.termsAndPolicy} ${errors.termsAccepted ? styles.errorText : ''}`}> {/* Thêm class lỗi cho label */}
            <input
                type="checkbox"
                checked={termsAccepted} // Gắn checked từ state
                onChange={handleTermsChange} // Gắn handler
            />
            Tôi đã đọc và đồng ý với điều khoản dịch vụ và chính sách bảo mật
          </label>
          {/* Lỗi điều khoản có thể hiển thị ở đây hoặc trên label */}
           {errors.termsAccepted && <p className={styles.errorText}>{errors.termsAccepted}</p>}


          {/* Nút submit nằm trong form */}
          <button type="submit" className={styles.confirmButton}>Xác nhận thông tin</button>

          {/* Message thành công hoặc lỗi API */}
          {message && <p className={message.includes('thành công') ? styles.successMessage : styles.errorMessage}>{message}</p>}


      </form> {/* Kết thúc form */}


      <div className={styles.logo}>
        <img src="/images/logo.svg" alt="Logo" />
      </div>
    </div>
  );
}

export default RegisterPage;