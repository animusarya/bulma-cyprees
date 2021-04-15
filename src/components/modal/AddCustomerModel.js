import React from 'react';
import { Modal } from '../elements';
import { AddNewCustomerForm } from '../forms';

const AddCustomerModel = ({ onClose, isActive, onSubmit }) => (
  <Modal isActive={isActive} onClose={onClose} title="Add New">
    <AddNewCustomerForm onClose={onClose} onSubmit={onSubmit} />
  </Modal>
);

export default AddCustomerModel;
