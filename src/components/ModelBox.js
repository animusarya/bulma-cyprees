import React from 'react';
import ReactModal from 'react-modal';
import { useModal } from 'react-modal-hook';

const ModelBox = () => {
  const [showModal, hideModal] = useModal(() => (
    <ReactModal isOpen>
      <p>Modal content</p>
      <button onClick={hideModal}>Hide modal</button>
    </ReactModal>
  ));

  return <button onClick={showModal}>Show modal</button>;
};

export default ModelBox;
