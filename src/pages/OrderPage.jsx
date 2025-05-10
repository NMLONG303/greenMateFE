import React, { useState, useEffect } from 'react';
import Header from '../component/Header';
import BottomNav from '../component/BottomNav';
import styles from '../styles/OrderPage.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Helper function to generate random digits
const generateRandomDigits = (length) => {
    let result = '';
    const characters = '0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

// Helper function to format current time
const formatCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    return `${hours}h${minutes}, ${day}/${month}/${year}`;
};

function OrderPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [loggedInUser, setLoggedInUser] = useState(null);
    const [orderInfo, setOrderInfo] = useState({
        orderId: `MDV${generateRandomDigits(10)}`,
        creationTime: formatCurrentTime(),
        scannedList: 'Đang tải...',
        totalItems: 1,
        notes: '',
    });
    const [userInfo, setUserInfo] = useState({
        fullName: 'Đang tải...',
        address: 'Đang tải...',
        phoneNumber: 'Đang tải...',
        otherNotes: '',
    });
    const [collectionSchedule, setCollectionSchedule] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('loggedInUser');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setLoggedInUser(user);
            setUserInfo({
                fullName: user.fullName || '',
                address: user.address || '',
                phoneNumber: user.phoneNumber || '',
                otherNotes: '',
            });
        } else {
            navigate('/login');
        }
        const { trashName } = location.state || {};
        if (trashName) {
            setOrderInfo((prev) => ({ ...prev, scannedList: trashName, totalItems: 1 }));
        }
    }, [navigate, location.state]);

    const handleUserInfoChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateOrder = () => {
        alert("đã tạo đơn thành công")
    };

    return (
        <div className={styles.orderContainer}>
            <Header userName={userInfo.fullName} />
            <div className={styles.contentArea}>
                <h2>Thông tin đơn hàng</h2>
                <div>
                    <p>Mã đơn: {orderInfo.orderId}</p>
                    <p>Thời gian tạo: {orderInfo.creationTime}</p>
                    <p>Rác đã quét: {orderInfo.scannedList}</p>
                    <p>Tổng số món: {orderInfo.totalItems}</p>
                    <h2>Thông tin người tạo</h2>
                    <p>Họ tên: {userInfo.fullName}</p>
                    <p>Địa chỉ: {userInfo.address}</p>
                    <p>Số điện thoại: {userInfo.phoneNumber}</p>
                    <input 
                        type="date"
                        value={collectionSchedule}
                        onChange={(e) => setCollectionSchedule(e.target.value)}
                        placeholder="Lịch thu gom"
                    />
                    
                </div>
                <button className={styles.createOrderButton}  onClick={handleCreateOrder}>Tạo Đơn</button>
            </div>
            <BottomNav activeTab="order" />
        </div>
    );
}

export default OrderPage;
