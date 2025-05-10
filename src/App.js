import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage'; // Import component
import LoginPage from './pages/LoginPage';   // Import component
import RegisterPage from './pages/RegisterPage'; // Import component
import VerifyPhonePage from './pages/VerifyPhonePage'; // Import component
import HomePage from './pages/HomePage';     // Import component
import AchievementPage from './pages/AchievementPage'; // Giả sử bạn có trang này
import ScanPage from './pages/ScanPage';           // Giả sử bạn có trang này
import GroupsPage from './pages/GroupsPage';         // Giả sử bạn có trang này
import ProfilePage from './pages/ProfilePage';        // Giả sử bạn có trang này
import OrderPage from './pages/OrderPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/achievement" element={<AchievementPage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/groups" element={<GroupsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/start" element={<StartPage />} /> {/* Thêm route cho StartPage nếu cần */}
        <Route path="/login" element={<LoginPage />} /> {/* Thêm route cho LoginPage nếu cần */}
        <Route path="/register" element={<RegisterPage />} /> {/* Thêm route cho RegisterPage nếu cần */}
        <Route path="/verify-phone" element={<VerifyPhonePage />} /> {/* Thêm route cho VerifyPhonePage nếu cần */}
        <Route path="/order" element={<OrderPage />} /> {/* Thêm route cho VerifyPhonePage nếu cần */}
      </Routes>
    </Router>
  );
}

export default App;