import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./professor.css";

const ProfessorPage = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [qrCodeData, setQrCodeData] = useState("");
  const [attendanceList, setAttendanceList] = useState([]);
  const [courses, setCourses] = useState([]);

  // Funkcija za dohvat kolegija sa servera
  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:5000/subjects");
      if (response.ok) {
        const data = await response.json();
        // Pretpostavljamo da vaša baza vraća niz objekata
        setCourses(data.map(subject => subject.name)); // Ako je u objektu svojstvo 'name'
      } else {
        alert("Failed to fetch courses.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchCourses(); // Poziva se čim se komponenta mount-a
  }, []);

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
    <div className="professor-container">
      <h1 className="professor-title">Započnite evidenciju na predavanju</h1>

      {/* Izbornik za odabir kolegija */}
      <div className="course-selection">
        <label htmlFor="course" className="course-label">Izaberite kolegij:</label>
        <select
          id="course"
          className="course-dropdown"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">-- Odaberite kolegij --</option>
          {courses.map((course, index) => (
            <option key={index} value={course}>
              {course}
            </option>
          ))}
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
