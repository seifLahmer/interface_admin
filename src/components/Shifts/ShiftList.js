import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './shift.css';
import DeleteModal from '../modal/Modal';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
const ShiftsList = () => {
  const [shifts, setShifts] = useState([]);
  const [selectedShift, setSelectedShift] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [idShiftToDelete, setIdShiftToDelete] = useState(null);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/shifts');
        setShifts(response.data);
      } catch (error) {
        console.error('Error fetching shifts:', error);
      }
    };

    fetchShifts();
  }, []);

  const openDeleteModal = (idShift) => {
    setIdShiftToDelete(idShift);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const deleteShift = async () => {
    try {
      await axios.delete(`http://localhost:8000/shifts/${idShiftToDelete}`);
      // Mettre à jour la liste des shifts après la suppression
      setShifts(shifts.filter(shift => shift.id_shift !== idShiftToDelete));
    } catch (error) {
      console.error('Error deleting shift:', error);
    }
    closeDeleteModal();
  };

  const handleEditShift = (shift) => {
    setSelectedShift(shift);
  };

  const updateShift = async (updatedShift) => {
    try {
      await axios.put(`http://localhost:8000/shifts/${updatedShift.id_shift}`, updatedShift);
      // Actualiser la liste des shifts après la mise à jour
      const updatedShifts = shifts.map((shift) => {
        if (shift.id_shift === updatedShift.id_shift) {
          return updatedShift;
        }
        return shift;
      });
      setShifts(updatedShifts);
      // Réinitialiser la shift sélectionnée après la mise à jour
      setSelectedShift(null);
    } catch (error) {
      console.error('Error updating shift:', error);
    }
  };

  return (
    <div className="centered">
      <Header />
      <div className="title-and-button">
        <h2 className="industrial-title">Liste Des shifts</h2>
        <Link to="/shiftsAjout">
          <button className="add-button green-button">Ajouter une shift</button>
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID shift</th>
            <th>Heure Début</th>
            <th>Heure Fin</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift) => (
            <tr key={shift.id_shift}>
              <td>{shift.id_shift}</td>
              <td>{shift.heure_debut}</td>
              <td>{shift.heure_fin}</td>
              <td>
                <button onClick={() => openDeleteModal(shift.id_shift)}>Supprimer</button>
                <DeleteModal isOpen={deleteModalOpen} onClose={closeDeleteModal} onDelete={deleteShift} />
                <button onClick={() => handleEditShift(shift)} className="edit-button">Modifier</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedShift && (
        <div className="modal">
          <h3>Modifier shift</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateShift(selectedShift);
            }}
          >
            <div className="input-group">
              <label htmlFor="heureDebut">Heure Début</label>
              <input
                id="heureDebut"
                type="text"
                value={selectedShift.heure_debut}
                onChange={(e) => setSelectedShift({ ...selectedShift, heure_debut: e.target.value })}
              />
              <label htmlFor="heureFin">Heure Fin</label>
              <input
                id="heureFin"
                type="text"
                value={selectedShift.heure_fin}
                onChange={(e) => setSelectedShift({ ...selectedShift, heure_fin: e.target.value })}
              />
            </div>
            <div className="button-group">
              <button type="submit">Enregistrer</button>
              <button onClick={() => setSelectedShift(null)}>Annuler</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ShiftsList;
