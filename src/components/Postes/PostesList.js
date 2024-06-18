import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Poste.css';
import DeleteModal from '../modal/Modal';
import { Link } from 'react-router-dom'; // Importez Link depuis React Router
import Header from '../Header/Header';
const PostesList = () => {

  const [postes, setPostes] = useState([]);
  const [selectedPoste, setSelectedPoste] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [idPosteToDelete, setIdPosteToDelete] = useState(null);
  
  useEffect(() => {
    const fetchPostes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/postes');
        setPostes(response.data);
      } catch (error) {
        console.error('Error fetching Postes:', error);
      }
    };

    fetchPostes();
  }, []);

  const openDeleteModal = (idPoste) => {
    setIdPosteToDelete(idPoste);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const deletePoste = async () => {
    try {
      await axios.delete(`http://localhost:8000/postes/${idPosteToDelete}`);
      // Mettre à jour la liste des postes après la suppression
      setPostes(postes.filter(poste => poste.id_poste !== idPosteToDelete));
    } catch (error) {
      console.error('Error deleting Poste:', error);
    }
    closeDeleteModal();
  };

  const handleEditPoste = (poste) => {
    setSelectedPoste(poste);
  };

  const updatePoste = async (updatedPoste) => {
    try {
      await axios.put(`http://localhost:8000/postes/${updatedPoste.id_poste}`, updatedPoste);
      // Actualiser la liste des postes après la mise à jour
      const updatedPostes = postes.map(poste => {
        if (poste.id_poste === updatedPoste.id_poste) {
          return updatedPoste;
        }
        return poste;
      });
      setPostes(updatedPostes);
      // Réinitialiser le poste sélectionné après la mise à jour
      setSelectedPoste(null);
    } catch (error) {
      console.error('Error updating Poste:', error);
    }
  };

  return (
    <div className="centered">
      <Header />
      <div className="title-and-button">
        <h2 className='industrial-title'>Liste Des Postes</h2>
        <Link to="/PostesAjout">
          <button className="add-button green-button">Ajouter une Poste</button>
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID Poste</th>
            <th>Poste</th>
          </tr>
        </thead>
        <tbody>
          {postes.map(poste => (
            <tr key={poste.id_poste}>
              <td>{poste.id_poste}</td>
              <td>{poste.nom_poste}</td>
              <td>
                <button onClick={() => openDeleteModal(poste.id_poste)}>Supprimer</button>
                <button onClick={() => handleEditPoste(poste)} className="edit-button">Modifier</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={deletePoste}
      />

      {selectedPoste && (
        <div className="modal">
          <h3>Modifier Poste</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            updatePoste(selectedPoste);
          }}>
            <div className="input-group">
              <label htmlFor="Poste">Nom de la Poste</label>
              <input id="Poste" type="text" value={selectedPoste.nom_poste} onChange={(e) => setSelectedPoste({ ...selectedPoste, nom_poste: e.target.value })} />
            </div>
            <div className="button-group">
              <button type="submit">Enregistrer</button>
              <button onClick={() => setSelectedPoste(null)}>Annuler</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

export default PostesList;
