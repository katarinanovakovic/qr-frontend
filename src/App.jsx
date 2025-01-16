import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import LoginPage from "./components/login/LoginPage";
import StudentPage from "./components/student/StudentPage";
import ProfessorPage from "./components/professor/ProfessorPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/student" element={ <StudentPage />} />
        <Route path="/professor" element={ <ProfessorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
