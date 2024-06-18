import React, { useState  } from 'react';
import axios from 'axios';
import './PosteForm.css'
import { Link } from 'react-router-dom';

 // URL de votre serveur MQTT


const AddEmployee = () => {
  
  const [idPoste, setIdPoste] = useState('');
  const [nomPoste, setNomPoste] = useState('');
   // État pour suivre si la carte RFID est prête

  
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Effectuer une requête POST pour ajouter l'employé à la base de données
      await axios.post('http://localhost:8000/postes', {
        id_poste:idPoste,
        nom_poste:nomPoste
        
      });
      // Réinitialiser les champs après l'ajout réussi
      setIdPoste('');
      setNomPoste('');
      
      alert('La poste a été ajouté avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la poste :', error);
      alert('Une erreur est survenue lors de l\'ajout de la poste.');
    }
  };

  
  return (
    <div className="add-employee-container">
      <h2>Ajouter une Poste</h2>
      <form onSubmit={handleSubmit}>
        
        <div>
          <label htmlFor="idPoste">Id de la poste :</label>
          <input type="text" id="idPoste" value={idPoste} onChange={(e) => setIdPoste(e.target.value)} />
        </div>
        <div>
          <label htmlFor="nomPoste">nom de la poste  :</label>
          <input type="text" id="nomPoste" value={nomPoste} onChange={(e) => setNomPoste(e.target.value)} />
        </div>
        
        
        <div className="button-container">
          
            <button type="submit" className="add-employee-button">Ajouter</button>
          
          <Link to="/postes">
            <button className="add-employee-button retour-button">Retour</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
