import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./professor.css";

const ProfessorPage = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [qrCodeData, setQrCodeData] = useState("");
  const [attendanceList, setAttendanceList] = useState([]);
  const [courses, setCourses] = useState([]);

  // Dohvat svih predmeta s backend servera
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:5000/subjects');
        const data = await response.json();
        
        console.log("Fetched courses:", data); // Provjera što vraća server

        // Provjeravamo je li odgovor polje predmeta
        if (Array.isArray(data)) {
          setCourses(data); // Sprema predmete u state
        } else {
          console.error("Expected an array but received:", data);
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchCourses();
  }, []);

  // Generiraj QR kod na temelju predmeta
  const handleGenerateQrCode = () => {
    const timestamp = Date.now();
    const qrCodeValue = `${selectedCourse.name}-${timestamp}`; // Kreiraj QR kod sa nazivom kolegija i timestampom
    setQrCodeData(qrCodeValue); // Postavi generirani QR kod
  };

  const fetchAttendance = async () => {
    try {
      const response = await fetch("http://localhost:5000/get-attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ course: selectedCourse.name }), // Poslati naziv kolegija na backend
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
    <div className="professor-container">
      <h1 className="professor-title">Započnite evidenciju na predavanju</h1>

      {/* Izbornik za odabir kolegija */}
      <div className="course-selection">
        <label htmlFor="course" className="course-label">Izaberite kolegij:</label>
        <select
          id="course"
          className="course-dropdown"
          value={selectedCourse._id || ""}
          onChange={(e) => setSelectedCourse(courses.find(course => course._id === e.target.value))}
        >
          <option value="">-- Odaberite kolegij --</option>
          {courses.length > 0 ? (
            courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))
          ) : (
            <option value="" disabled>Nema kolegija</option>
          )}
        </select>
        <button
          className="generate-qr-button"
          onClick={handleGenerateQrCode}
          disabled={!selectedCourse}
        >
          Generirajte QR kod
        </button>
      </div>

      {/* QR kod sekcija */}
      {qrCodeData && (
        <div className="qr-container">
          <QRCodeCanvas value={qrCodeData} size={200} className="qr-code" />
          <p className="qr-description">Skenirajte QR kod za početak predavanja.</p>
        </div>
      )}

      {/* Prisutnost studenata */}
      <div className="attendance-section">
        <button
          className="fetch-attendance-button"
          onClick={fetchAttendance}
          disabled={!selectedCourse}
        >
          Dohvati prisutnost
        </button>
        {attendanceList.length > 0 && (
          <ul className="attendance-list">
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
