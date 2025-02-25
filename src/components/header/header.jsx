import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./header.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === "/login") return null;

  const isStudentPage = location.pathname === "/student";
  const isProfessorPage = location.pathname === "/professor";
  const isStudentAttendance = location.pathname === "/attendance-student";
  const isProfessorAttendance = location.pathname === "/attendance-professor";
  const isReferadaPage = location.pathname === "/referada";

  return (
    <header className="header">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8igO8FhRqBDUMX7EujzuolghNUqtB2NLImg&s"
        alt="FESB Logo"
        className="header-logo"
      />

      <div className="header-buttons">
        {/* Dugme POVRATAK na attendance stranicama */}
        {(isStudentAttendance || isProfessorAttendance) && (
          <button
            className="back-button"
            onClick={() => navigate(isStudentAttendance ? "/student" : "/professor")}
          >
            POVRATAK
          </button>
        )}

        {/* Dugme EVIDENCIJA (lijevo od ODJAVA) prikazuje se samo na student i professor stranicama */}
        {(isStudentPage || isProfessorPage) && (
          <button
            className="attendance-button"
            onClick={() => navigate(isStudentPage ? "/attendance-student" : "/attendance-professor")}
          >
            EVIDENCIJA
          </button>
        )}

        {/* Dugme ODJAVA (uvijek prisutno na student, professor i attendance stranicama) */}
        {(isStudentPage || isProfessorPage || isStudentAttendance || isProfessorAttendance || isReferadaPage) && (
          <button className="logout-button" onClick={() => navigate("/")}>
            ODJAVA
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
