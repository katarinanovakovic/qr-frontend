import React, { useState, useEffect } from "react";
import "./attendanceStudent.css";

const AttendanceStudent = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    // Dummy podaci umjesto fetchanja s backend-a
    const dummyData = [
      { name: "Matematika 1", attendance: 85 },
      { name: "Operacijski sustavi", attendance: 72 },
      { name: "Elektronika", attendance: 90 },
    ];
    
    setAttendanceData(dummyData);
  }, []);

  return (
    <div className="attendance-student-container">
      <h1 className="attendance-title">Moja evidencija</h1>

      {attendanceData.length > 0 ? (
        <ul className="attendance-list">
          {attendanceData.map((course, index) => (
            <li key={index} className="attendance-item">
              <strong>{course.name}</strong>: {course.attendance}%
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-attendance">Nema dostupnih podataka.</p>
      )}
    </div>
  );
};

export default AttendanceStudent;
