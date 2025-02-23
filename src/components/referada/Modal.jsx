import React, { useEffect, useState } from 'react';
import './modal.css';

const Modal = ({ title, onClose, type }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response;
      try {
        if (type === "professors") {
          response = await fetch('http://localhost:5000/professors');
        } else if (type === "students") {
          response = await fetch('http://localhost:5000/students');
        } else if (type === "subjects") {
          response = await fetch('http://localhost:5000/subjects');
        }
           // Provjeri status odgovora prije nego što ga parsiraš
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [type]);

  

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <button className="close-btn" onClick={onClose}>X</button>
        <ul>
          {data.map((item) => (
            <li key={item._id}>{item.name}</li>  // Pretpostavljamo da svaki objekt ima 'name' i '_id'
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
