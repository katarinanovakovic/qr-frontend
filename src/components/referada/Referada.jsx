import React, { useState } from 'react';
import Modal from './Modal';
import './referada.css';

const Referada = () => {
  const [showProfessorModal, setShowProfessorModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showSubjectModal, setShowSubjectModal] = useState(false);

  const handleProfessorClick = () => setShowProfessorModal(true);
  const handleStudentClick = () => setShowStudentModal(true);
  const handleSubjectClick = () => setShowSubjectModal(true);

  return (
    <div className="referada-container">
      <button className="btn" onClick={handleProfessorClick}>
        Prikaži profesore
      </button>
      <button className="btn" onClick={handleStudentClick}>
        Prikaži studente
      </button>
      <button className="btn" onClick={handleSubjectClick}>
        Prikaži predmete
      </button>

      {showProfessorModal && <Modal title="Profesori" onClose={() => setShowProfessorModal(false)} type="professors" />}
      {showStudentModal && <Modal title="Studenti" onClose={() => setShowStudentModal(false)} type="students" />}
      {showSubjectModal && <Modal title="Predmeti" onClose={() => setShowSubjectModal(false)} type="subjects" />}
    </div>
  );
};

export default Referada;
