import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // Dodano za izbor između studenta i profesora
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Pošaljite prijavu na backend
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, role }), // Dodano role u body
    });

    const data = await response.json();

    if (response.ok) {
      // Spremi token u localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // Preusmjeri korisnika na odgovarajuću stranicu
      if (data.role === "student") {
        navigate("/student");
      } else if (data.role === "professor") {
        navigate("/professor");
      }
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Log in</h1>
        <form onSubmit={handleSubmit}>
          <label className="label-text" htmlFor="email">Email</label>
          <input
            id="email"
            className="input-field"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          
          <label className="label-text" htmlFor="password">Password</label>
          <input
            id="password"
            className="input-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          
          <label className="label-text" htmlFor="role">Role</label>
          <select
            id="role"
            className="role-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="professor">Professor</option>
          </select>

          <button className="login-button" type="submit">Log in</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
