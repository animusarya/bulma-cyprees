import React from 'react';
import { Modal } from '../elements';
import { AddressForm } from '../forms';

const AddLocationModal = ({ onClose, isActive, onSubmit }) => (
  <Modal isActive={isActive} onClose={onClose} title="Add Location">
    <AddressForm onClose={onClose} onSubmit={onSubmit} />
  </Modal>
);

export default AddLocationModal;
