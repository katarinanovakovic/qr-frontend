import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./header.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Ako je korisnik na login stranici, header se ne prikazuje
  if (location.pathname === "/login") return null;

  return (
    <header className="header">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8igO8FhRqBDUMX7EujzuolghNUqtB2NLImg&s"
        alt="FESB Logo"
        className="header-logo"
      />
      {(location.pathname === "/student" || location.pathname === "/professor") && (
        <button className="logout-button" onClick={() => navigate("/")}>ODJAVA</button>
      )}
    </header>
  );
};

export default Header;
