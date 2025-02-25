import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./professor.css";

const ProfessorPage = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [qrCodeData, setQrCodeData] = useState("");
  const [attendanceList, setAttendanceList] = useState([]);
  const [subjects, setSubjects] = useState([]);  // Promijenjeno 'courses' u 'subjects'

  // Dohvati predmete kada se stranica učita
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch("http://localhost:5000/subjects");
        const data = await response.json();
        console.log(data);  // Ispisivanje podataka u konzolu
        setSubjects(data);  // Spremi predmete u 'subjects'
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
  
    fetchSubjects();
  }, []);
  

  // Generiranje QR koda
  const handleGenerateQrCode = () => {
    const timestamp = Date.now();
    const subjectData = subjects.find(subject => subject.name === selectedSubject);
    if (subjectData) {
      setQrCodeData(`${subjectData._id}-${timestamp}`); // QR kod s ID-em predmeta i timestampom
    }
  };

  const fetchAttendance = async () => {
    try {
      const response = await fetch("http://localhost:5000/get-attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subject: selectedSubject }),  // Koristi 'subject' umjesto 'course'
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
      <div className="subject-selection">
        <label htmlFor="subject" className="subject-label">Izaberite kolegij:</label>
        <select
          id="subject"
          className="subject-dropdown"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="">-- Odaberite kolegij --</option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject.name}>
              {subject.name}
            </option>
          ))}
        </select>
        <button
          className="generate-qr-button"
          onClick={handleGenerateQrCode}
          disabled={!selectedSubject}
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
          disabled={!selectedSubject}
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
