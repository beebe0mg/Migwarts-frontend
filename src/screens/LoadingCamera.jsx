import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/LoadingCamera.module.css";

import LoadingCameraBackGround from "../assets/images/LoadingCamera.png";
import LoadingCameraHat from "../assets/images/LoadingCameraHat.png";

export default function LoadingCamera() {
  let videoRef = useRef(null);

  const getUserCamera = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: { ideal: 462 },
          height: { ideal: 525 },
          aspectRatio: 462 / 525,
        },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserCamera();
  }, []);

  const [time, setTime] = useState(5);

  useEffect(() => {
    time > 0 && setTimeout(() => setTime(time - 1), 1000);
  }, [time]);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflowX: "hidden" }}>
      <img
        src={LoadingCameraBackGround}
        className={styles.LoadingCameraBackImg}
      />
      <div className={styles.AllLoadingCamera}>
        <img src={LoadingCameraHat} className={styles.LoadingCameraHat} />
        <div className={styles.VideoContainer}>
          <video ref={videoRef}></video>
        </div>
      </div>
      <div className={styles.AllCountDown}>
        <>{time > 0 && <div className={styles.CountDown}>{time}</div>}</>
      </div>
    </div>
  );
}
