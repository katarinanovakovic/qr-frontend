import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="welcome-text">
        <h1>DOBRODOŠLI</h1>
        <h1>NA</h1>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8igO8FhRqBDUMX7EujzuolghNUqtB2NLImg&s"
          alt="FESB Logo"
          className="fesb-logo"
        />
      </div>
      <button className="login-button" onClick={() => navigate("/login")}>
        PRIJAVI SE
      </button>
    </div>
  );
};

export default Home;
