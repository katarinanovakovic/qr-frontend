import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./student.css";

const StudentPage = () => {
  const [qrCodeData, setQrCodeData] = useState("");

  useEffect(() => {
    const generateQrCode = () => {
      const userId = localStorage.getItem("token"); 
      const loginTimestamp = localStorage.getItem("loginTimestamp"); // Dohvati login timestamp
      if (userId && loginTimestamp) {
        setQrCodeData(`${userId}-${loginTimestamp}`); // Kreiranje QR koda s unikatnim podacima
      }
    };

    generateQrCode();
  }, []);

  return (
    <div id="student-page" className="student-container">
      <h1 id="student-title" className="student-title">Dobrodošli</h1>
      <div id="qr-section" className="qr-container">
        <QRCodeCanvas id="qr-code" value={qrCodeData} size={200} />
        <p id="qr-description" className="qr-description">Vaš QR kod</p>
      </div>
    </div>
  );
};

export default StudentPage;
