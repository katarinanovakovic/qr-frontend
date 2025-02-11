import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./student.css";

const StudentPage = () => {
  const [qrCodeData, setQrCodeData] = useState("");
  const [isMarked, setIsMarked] = useState(false);

  useEffect(() => {
    // Generiraj novi QR kod pri ulasku na stranicu
    const generateQrCode = () => {
      const userId = localStorage.getItem("token"); // Pretpostavlja se da token sadrži studentov ID
      const timestamp = Date.now();
      setQrCodeData(`${userId}-${timestamp}`);
    };

    generateQrCode();
  }, []);

  const handleMarkAttendance = async () => {
    try {
      const response = await fetch("http://localhost:5000/mark-attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ qrCodeData }),
      });

      if (response.ok) {
        setIsMarked(true);
        alert("Attendance marked successfully!");
      } else {
        alert("Failed to mark attendance.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div id="student-page" className="student-container">
      <h1 id="student-title" className="student-title">Dobrodošli</h1>
      <div id="qr-section" className="qr-container">
        <QRCodeCanvas id="qr-code" value={qrCodeData} size={200} />
        <p id="qr-description" className="qr-description">Vaš QR kod</p>
      </div>
      <button
        id="mark-attendance-btn"
        className={`mark-attendance-button ${isMarked ? "marked" : ""}`}
        onClick={handleMarkAttendance}
        disabled={isMarked}
      >
        {isMarked ? "Attendance Marked" : "Mark Attendance"}
      </button>
    </div>
  );
};

export default StudentPage;
