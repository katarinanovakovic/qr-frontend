import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./professor.css";

const ProfessorPage = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [qrCodeData, setQrCodeData] = useState("");
  const [attendanceList, setAttendanceList] = useState([]);

  const courses = [
    "Ugradbeni računalni sustavi", 
    "Operacijski sustavi", 
    "Paralelno programiranje", 
    "Grid računalni sustavi",
    "Poslovni informacijski sustavi",
    "Matematika 1",
    "Matematika 2",
    "Fizika 1", 
    "Fizika 2",
    "Elektrotehnika",
    "Elektronika"
  ]; // Popis kolegija

  const handleGenerateQrCode = () => {
    const timestamp = Date.now();
    setQrCodeData(`${selectedCourse}-${timestamp}`);
  };

  const fetchAttendance = async () => {
    try {
      const response = await fetch("http://localhost:5000/get-attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ course: selectedCourse }),
      });

      if (response.ok) {
        const data = await response.json();
        setAttendanceList(data.attendance);
      } else {
        alert("Failed to fetch attendance.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div id="professor-page" className="professor-container">
      <h1 id="professor-title" className="professor-title">Professor Dashboard</h1>
      <div id="course-selection-section" className="course-selection">
        <label htmlFor="course">Select a Course:</label>
        <select
          id="course"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">--Select a Course--</option>
          {courses.map((course, index) => (
            <option key={index} value={course}>
              {course}
            </option>
          ))}
        </select>
        <button
          id="generate-qr-btn"
          className="generate-qr-button"
          onClick={handleGenerateQrCode}
          disabled={!selectedCourse}
        >
          Generate QR Code
        </button>
      </div>
      {qrCodeData && (
        <div id="qr-section" className="qr-container">
          <QRCodeCanvas id="qr-code" value={qrCodeData} size={200} />
          <p id="qr-description" className="qr-description">
            Scan this QR Code to start the lecture
          </p>
        </div>
      )}
      <div id="attendance-section" className="attendance-section">
        <button
          id="fetch-attendance-btn"
          className="fetch-attendance-button"
          onClick={fetchAttendance}
          disabled={!selectedCourse}
        >
          Fetch Attendance
        </button>
        {attendanceList.length > 0 && (
          <ul id="attendance-list" className="attendance-list">
            {attendanceList.map((student, index) => (
              <li key={index} className="attendance-item">{student}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProfessorPage;
