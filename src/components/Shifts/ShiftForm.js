import React, { useState } from 'react';
import axios from 'axios';
import './ShiftForm.css';
import { Link } from 'react-router-dom';

const AddShift = () => {
  const [heureDebut, setHeureDebut] = useState('');
  const [heureFin, setHeureFin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!heureDebut || !heureFin) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    const debutInt = parseInt(heureDebut);
    const finInt = parseInt(heureFin);
    try {
      await axios.post('http://localhost:8000/shifts', {
        heure_debut: debutInt,
        heure_fin: finInt
      });
      setHeureDebut('');
      setHeureFin('');
      setError('');
      alert('Le shift a été ajouté avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du shift :', error);
      setError('Une erreur est survenue lors de l\'ajout du shift.');
    }
  };

  return (
    <div className="add-shift-container">
      <h2>Ajouter un Shift</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="heureDebut">Heure Debut :</label>
          <input type="text" id="heureDebut" value={heureDebut} onChange={(e) => setHeureDebut(e.target.value)} />
        </div>
        <div>
          <label htmlFor="heureFin">Heure Fin :</label>
          <input type="text" id="heureFin" value={heureFin} onChange={(e) => setHeureFin(e.target.value)} />
        </div>
        <div className="button-container">
          <button type="submit" className="add-shift-button">Ajouter</button>
          <Link to="/shifts">
            <button className="add-shift-button retour-button">Retour</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddShift;
