import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import LoginPage from "./components/login/LoginPage";
import StudentPage from "./components/student/StudentPage";
import ProfessorPage from "./components/professor/ProfessorPage";
import Header from "./components/header/header";

const App = () => {
  useEffect(() => {
    // Sakrij sadržaj ako korisnik pokuša screenshot
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.body.style.display = "none";
        setTimeout(() => {
          document.body.style.display = "block";
        }, 3000);
      }
    };

    // Onemogući Print Screen tipku
    const handleKeyDown = (event) => {
      if (event.key === "PrintScreen") {
        document.body.style.display = "none";
        setTimeout(() => {
          document.body.style.display = "block";
        }, 3000);
        alert("Screenshot nije dozvoljen!");
        event.preventDefault();
      }
    };

  
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("keydown", handleKeyDown);
    

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("keydown", handleKeyDown);
      
    };
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/professor" element={<ProfessorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
