import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, role }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      if (data.role === "student") {
        localStorage.setItem("loginTimestamp", Date.now()); // Spremi novi timestamp za QR kod
        navigate("/student");
      } else if (data.role === "professor") {
        navigate("/professor");
      }
      else if(data.role === "referada"){
        navigate("/referada");
      }
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Prijavi se</h1>
        <form onSubmit={handleSubmit}>
          <label className="label-text" htmlFor="email">E-mail</label>
          <input
            id="email"
            className="input-field"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Unesite svoj e-mail"
            required
          />
          
          <label className="label-text" htmlFor="password">Lozinka</label>
          <input
            id="password"
            className="input-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Unesite svoju lozinku"
            required
          />
          
          <label className="label-text" htmlFor="role">Uloga</label>
          <select
            id="role"
            className="role-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="professor">Profesor</option>
            <option value="referada">Referada</option>

          </select>

          <button className="login-button" type="submit">PRIJAVA</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
