import React from 'react';
import { Modal } from '../elements';
import { AddJobCustomerForm } from '../forms';

const AddCustomerModel = ({ onClose, isActive, onSubmit }) => (
  <Modal isActive={isActive} onClose={onClose} title="Add New">
    <AddJobCustomerForm onClose={onClose} onSubmit={onSubmit} />
  </Modal>
);

export default AddCustomerModel;
