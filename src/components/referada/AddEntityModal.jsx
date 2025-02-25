import React, { useState } from 'react';
import './modal.css';
import './addentitymodal.css';


const AddEntityModal = ({ type, onClose, setShowListModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: type === "professors" ? "professor" : type === "students" ? "student" : "",
    subjects: [],
    qrCode: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubjectsChange = (e) => {
    setFormData({ ...formData, subjects: e.target.value.split(',') });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      //alert(`${type === "professors" ? "Profesor" : type === "students" ? "Student" : "Predmet"} uspješno dodan!`);
      onClose();
      setShowListModal(false);
    } catch (error) {
      console.error("Error adding entity:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Dodaj {type === "professors" ? "Profesora" : type === "students" ? "Studenta" : "Predmet"}</h2>
        <button className="close-btn" onClick={onClose}>X</button>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Ime" value={formData.name} onChange={handleChange} required />
          {type !== "subjects" && (
            <>
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              <input type="password" name="password" placeholder="Lozinka" value={formData.password} onChange={handleChange} required />
            </>
          )}
          {(type === "professors" || type === "students") && (
            <input type="text" name="subjects" placeholder="Predmeti (Odvoji zarezom
            )" value={formData.subjects.join(',')} onChange={handleSubjectsChange} />
          )}
          <button type="submit" className="submit-btn">Dodaj</button>
        </form>
      </div>
    </div>
  );
};

export default AddEntityModal;
