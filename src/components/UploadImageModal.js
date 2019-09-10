import React from 'react';
import { Heading, Dropzone } from './elements';

const UploadImageModal = ({ heading, isActive, onClose, onResponse }) => (
  <div className={`modal ${isActive && 'is-active'}`}>
    <div className="modal-background"></div>
    <div className="modal-content">
      <div className="box">
        <Heading>{heading}</Heading>
        <Dropzone onUpload={value => onResponse(value)} />
      </div>
    </div>
    <button
      type="button"
      className="modal-close is-large"
      aria-label="close"
      onClick={onClose}
    />
  </div>
);

export default UploadImageModal;
