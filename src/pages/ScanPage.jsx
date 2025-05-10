import React, { useState, useRef, useEffect } from 'react';
import Header from '../component/Header';
import BottomNav from '../component/BottomNav';
import styles from '../styles/ScanPage.module.css';
import Webcam from 'react-webcam';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ScanPage() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [errorLoadingUser, setErrorLoadingUser] = useState('');

  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const [isWebcamActive, setIsWebcamActive] = useState(true);
  const [capturedImage, setCapturedImage] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [isLoadingPrediction, setIsLoadingPrediction] = useState(false);
  const [lastPredictedNumber, setLastPredictedNumber] = useState(null);
  const [lastPredictedTrashName, setLastPredictedTrashName] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setLoggedInUser(user);
        setIsLoadingUser(false);
      } catch (error) {
        localStorage.removeItem('loggedInUser');
        setErrorLoadingUser('Lỗi tải thông tin người dùng.');
        setIsLoadingUser(false);
        navigate('/login');
      }
    } else {
      setErrorLoadingUser('Bạn chưa đăng nhập.');
      setIsLoadingUser(false);
      navigate('/login');
    }
  }, [navigate]);

  const getTrashName = (result) => {
    return ['Bìa', 'Kính', 'Kim loại', 'Giấy', 'Nhựa', 'Rác chung'][result] || 'Không xác định';
  };

  const getPointsFromResult = (result) => {
    return [2, 4, 4, 2, 3, 1][result] || 0;
  };

  const predictImage = async (base64Image) => {
    if (!loggedInUser) return;
    setIsLoadingPrediction(true);
    setPrediction('Đang dự đoán...');
    try {
      const response = await axios.post('http://3.25.215.80:8080/predict', { image: base64Image });
      const predictedNumber = response.data;
      setLastPredictedNumber(predictedNumber);
      const trashName = getTrashName(predictedNumber);
      setLastPredictedTrashName(trashName);
      const pointsToAdd = getPointsFromResult(predictedNumber);
      const newTotalPoints = (loggedInUser.rewardPoints || 0) + pointsToAdd;
      const updatedUser = { ...loggedInUser, rewardPoints: newTotalPoints };
      await axios.put(`http://3.25.215.80:8080/api/users/${loggedInUser.id}`, updatedUser);
      setLoggedInUser(updatedUser);
      localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
      setPrediction(`Đây là ${trashName}. Bạn nhận được +${pointsToAdd} điểm!`);
    } catch (error) {
      setPrediction('Lỗi dự đoán.');
    } finally {
      setIsLoadingPrediction(false);
    }
  };

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setCapturedImage(imageSrc);
    setIsWebcamActive(false);
    predictImage(imageSrc);
  };

  const handleNextClick = () => {
    navigate('/order', { state: { trashName: lastPredictedTrashName } });
  };

  return (
    <div className={styles.scanContainer}>
      <Header userName={loggedInUser?.fullName || 'Đang tải...'} />
      <div className={styles.cameraView}>
        {isWebcamActive ? (
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className={styles.webcam} />
        ) : (
          capturedImage && <img src={capturedImage} alt="Đã chụp" className={styles.capturedImage} />
        )}
      </div>
      <div className={styles.scanControls}>
        <button  className={styles.captureButton} onClick={capture} disabled={isLoadingPrediction}>Chụp ảnh</button>
        <div className={styles.resultPlaceholder}>
          {isLoadingPrediction ? 'Đang dự đoán...' : prediction ? prediction : capturedImage ? 'Đã chụp ảnh, chờ dự đoán...' : 'Chưa có ảnh'}
        </div>
        <button  className={styles.nextButton} onClick={handleNextClick} disabled={!lastPredictedTrashName}>➔</button>
      </div>
      <BottomNav activeTab="scan" />
    </div>
  );
}

export default ScanPage;
