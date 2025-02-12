import React, { useState } from "react";
import "./attendanceProfessor.css";

const AttendanceProfessor = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [attendanceList, setAttendanceList] = useState([]);

  const courses = ["Matematika 1", "Operacijski sustavi", "Elektronika"];

  const dummyAttendanceData = {
    "Matematika 1": [
      { name: "Ivan Horvat", attendance: 90 },
      { name: "Ana Marić", attendance: 85 },
      { name: "Marko Novak", attendance: 88 },
    ],
    "Operacijski sustavi": [
      { name: "Petra Kovač", attendance: 78 },
      { name: "Luka Babić", attendance: 82 },
      { name: "Maja Šarić", attendance: 76 },
    ],
    "Elektronika": [
      { name: "Karlo Jurčić", attendance: 92 },
      { name: "Ivana Radić", attendance: 87 },
      { name: "Dino Vuković", attendance: 80 },
    ],
  };

  const fetchAttendance = () => {
    setAttendanceList(dummyAttendanceData[selectedCourse] || []);
  };

  return (
    <div className="attendance-professor-container">
      <h1 className="attendance-title">Evidencija studenata</h1>

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
        <button className="fetch-attendance-button" onClick={fetchAttendance} disabled={!selectedCourse}>
          Dohvati evidenciju
        </button>
      </div>

      {attendanceList.length > 0 ? (
        <ul className="attendance-list">
          {attendanceList.map((student, index) => (
            <li key={index} className="attendance-item">
              {student.name}: {student.attendance}%
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-attendance">Nema podataka za prikaz.</p>
      )}
    </div>
  );
};

export default AttendanceProfessor;
