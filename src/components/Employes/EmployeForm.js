import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeForm.css';
import { Link } from 'react-router-dom';

const AddEmployee = () => {
  const [matricule, setMatricule] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [fonction, setFonction] = useState('');
  const [competence, setCompetence] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [sexe, setSexe] = useState('homme'); // Default value for sexe

  const [shift, setShift] = useState('');
  const [isRfid, setIsRfid] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get('http://127.0.0.1:8000/rfid')
        .then(response => {
          setMatricule(response.data.rfid_data.split(',')[0]);
          setIsRfid(true); // Set isRfid to true when RFID data is fetched
        })
        .catch(error => {
          console.error('Error fetching RFID data:', error);
        });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/employees', {
        matricule,
        nom,
        prenom,
        id_shift: shift,
        fonction,
        competance:competence,
        email,
        téléphone: telephone,
        Sexe: sexe,
      });
      setMatricule('');
      setNom('');
      setPrenom('');
      setFonction('');
      setCompetence('');
      setEmail('');
      setTelephone('');
      setSexe('homme'); // Reset sexe to default value
      setShift('');
      alert("L'employé a été ajouté avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'employé :", error);
      alert("Une erreur est survenue lors de l'ajout de l'employé.");
    }
  };

  return (
    <div className="add-employee-container">
      <h2>Ajouter un Agent</h2>
      <form onSubmit={handleSubmit}>
        <div>
          {isRfid ? (
            <div>
              <p>RFID Matricule: {matricule}</p>
            </div>
          ) : (
            <p>Loading RFID data...</p>
          )}
        </div>
        <div>
          <label htmlFor="nom">Nom :</label>
          <input type="text" id="nom" value={nom} onChange={(e) => setNom(e.target.value)} />
        </div>
        <div>
          <label htmlFor="prenom">Prénom :</label>
          <input type="text" id="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
        </div>
        <div>
          <label htmlFor="fonction">Fonction :</label>
          <input type="text" id="fonction" value={fonction} onChange={(e) => setFonction(e.target.value)} />
        </div>
        <div>
          <label htmlFor="competence">Compétence :</label>
          <input type="text" id="competence" value={competence} onChange={(e) => setCompetence(e.target.value)} />
        </div>
        <div>
          <label htmlFor="email">Email :</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="telephone">Téléphone :</label>
          <input type="tel" id="telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
        </div>
        <div>
          <label>Sexe :</label>
          <label htmlFor="homme">
            <input
              type="radio"
              id="homme"
              name="sexe"
              value="homme"
              checked={sexe === 'homme'}
              onChange={() => setSexe('homme')}
            /> Homme
          </label>
          <label htmlFor="femme">
            <input
              type="radio"
              id="femme"
              name="sexe"
              value="femme"
              checked={sexe === 'femme'}
              onChange={() => setSexe('femme')}
            /> Femme
          </label>
        </div>
        <div>
          <label htmlFor="shift">Shift :</label>
          <input type="text" id="shift" value={shift} onChange={(e) => setShift(e.target.value)} />
        </div>
        <div className="button-container">
          <button type="submit" className="add-employee-button">Ajouter</button>
          <Link to="/employees">
            <button className="add-employee-button retour-button">Retour</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
