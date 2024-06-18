import React from 'react';
import Modal from 'react-modal';
import './Modal.css'; // Assurez-vous d'importer votre fichier CSS

const DeleteModal = ({ isOpen, onClose, onDelete }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Supprimer"
      ariaHideApp={false}
      className="delete-modal" // Ajoutez la classe pour appliquer les styles
    >
      <h2>Êtes-vous sûr de vouloir supprimer ces données?</h2>
      <p>Cette action est irréversible et toutes les données associées seront perdues.</p>
      <button className="delete-button" onClick={onDelete}>Supprimer</button>
      <button className="cancel-button" onClick={onClose}>Annuler</button>
    </Modal>
  );
};

export default DeleteModal;
