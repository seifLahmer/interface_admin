import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './employe.css';
import DeleteModal from '../modal/Modal';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

const EmployeList = () => {
  const [employes, setEmployes] = useState([]);
  const [selectedEmploye, setSelectedEmploye] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [matriculeToDelete, setMatriculeToDelete] = useState(null);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
const [matriculeToAdmin, setMatriculeToAdmin] = useState(null);
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');




  useEffect(() => {
    const fetchEmployes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/employees');
        setEmployes(response.data);
      } catch (error) {
        console.error('Error fetching employes:', error);
      }
    };

    fetchEmployes();
  }, []);

  const openDeleteModal = (matricule) => {
    setMatriculeToDelete(matricule);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const deleteEmploye = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/employees/${matriculeToDelete}`);
      setEmployes(employes.filter(employe => employe.matricule !== matriculeToDelete));
    } catch (error) {
      console.error('Error deleting employe:', error);
    }
    closeDeleteModal();
  };

  const handleEditEmploye = (employe) => {
    setSelectedEmploye(employe);
  };

  const updateEmploye = async (updatedEmploye) => {
    try {
      await axios.put(`http://127.0.0.1:8000/employees/${updatedEmploye.matricule}`, updatedEmploye);
      const updatedEmployes = employes.map(employe => (employe.matricule === updatedEmploye.matricule ? updatedEmploye : employe));
      setEmployes(updatedEmployes);
      setSelectedEmploye(null);
    } catch (error) {
      console.error('Error updating employe:', error);
    }
  };
  const openAdminModal = (matricule) => {
    console.log(matricule)
    setMatriculeToAdmin(matricule);
    setAdminModalOpen(true);
  };
  
  const closeAdminModal = () => {
    setAdminModalOpen(false);
    setUsername('');
    setPassword('');
  };
  
  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post(`http://127.0.0.1:8000/admins`, {
            username,
            mdp: password,
            matricule: matriculeToAdmin,
        });
        closeAdminModal();
    } catch (error) {
        console.error('Error creating admin:', error);
    }
};


  return (
    <>
      <Header />
      <div className="centered">
        <div className="title-and-button">
          <h2 className="industrial-title">Liste Des Agents</h2>
          <Link to="/employeesAjout">
            <button className="add-button green-button">Ajouter un agent</button>
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Matricule</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Sexe</th>
              <th>Fonction</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Competance</th>
              <th>Shift</th>
            </tr>
          </thead>
          <tbody>
            {employes.map(employe => (
              <tr key={employe.matricule}>
                <td>{employe.matricule}</td>
                <td>{employe.nom}</td>
                <td>{employe.prenom}</td>
                <td>{employe.Sexe}</td>
                <td>{employe.fonction}</td>
                <td>{employe.email}</td>
                <td>{employe.téléphone}</td>
                <td>{employe.competance}</td>
                <td>{employe.id_shift}</td>
                <td>
                  <button onClick={() => openDeleteModal(employe.matricule)}>Supprimer</button>
                  <DeleteModal isOpen={deleteModalOpen} onClose={closeDeleteModal} onDelete={deleteEmploye} />
                  <button onClick={() => handleEditEmploye(employe)} className="edit-button">Modifier</button>
                  <button onClick={() => openAdminModal(employe.matricule)} className="admin-button">Rendre Admin</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {adminModalOpen && (
  <div className="modal">
    <h3>Rendre Admin</h3>
    <form onSubmit={handleAdminSubmit}>
      <div className="input-group">
        <label htmlFor="username">Nom d'utilisateur</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="mdp">Mot de passe</label>
        <input
          id="mdp"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="button-group">
        <button type="submit">Confirmer</button>
        <button type="button" onClick={closeAdminModal}>Annuler</button>
      </div>
    </form>
  </div>
)}

      {selectedEmploye && (
        <div className="modal">
          <h3>Modifier Agent</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateEmploye(selectedEmploye);
            }}
          >
            <div className="input-group">
              <label htmlFor="nom">Nom</label>
              <input id="nom" type="text" value={selectedEmploye.nom} onChange={(e) => setSelectedEmploye({ ...selectedEmploye, nom: e.target.value })} />
            </div>
            <div className="input-group">
              <label htmlFor="prenom">Prenom</label>
              <input id="prenom" type="text" value={selectedEmploye.prenom} onChange={(e) => setSelectedEmploye({ ...selectedEmploye, prenom: e.target.value })} />
            </div>
            <div className="input-group">
              <label htmlFor="sexe">Sexe</label>
              <input id="sexe" type="text" value={selectedEmploye.Sexe} onChange={(e) => setSelectedEmploye({ ...selectedEmploye, Sexe: e.target.value })} />
            </div>

            <div className="input-group">
              <label htmlFor="fonction">Fonction</label>
              <input id="fonction" type="text" value={selectedEmploye.fonction} onChange={(e) => setSelectedEmploye({ ...selectedEmploye, fonction: e.target.value })} />
            </div>

            <div className="input-group">
              <label htmlFor="Email">Email</label>
              <input id="Email" type="text" value={selectedEmploye.email} onChange={(e) => setSelectedEmploye({ ...selectedEmploye, email: e.target.value })} />
            </div>
            <div className="input-group">
              <label htmlFor="téléphone">téléphone</label>
              <input id="téléphone" type="text" value={selectedEmploye.téléphone} onChange={(e) => setSelectedEmploye({ ...selectedEmploye, téléphone: e.target.value })} />
            </div>
            <div className="input-group">
              <label htmlFor="competance">competance</label>
              <input id="competance" type="text" value={selectedEmploye.competance} onChange={(e) => setSelectedEmploye({ ...selectedEmploye, competance: e.target.value })} />
            </div>
            <div className="input-group">
              <label htmlFor="shift">shift</label>
              <input id="shift" type="text" value={selectedEmploye.id_shift} onChange={(e) => setSelectedEmploye({ ...selectedEmploye, id_shift: e.target.value })} />
            </div>





            {/* Ajoutez ici d'autres champs pour la modification de l'employé */}
            <div className="button-group">
              <button type="submit">Enregistrer</button>
              <button onClick={() => setSelectedEmploye(null)}>Annuler</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EmployeList;
