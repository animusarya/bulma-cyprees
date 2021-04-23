import React from 'react';
import styled from 'styled-components';

import Heading from './Heading';

const Container = styled.div`
  .inner-wrapper {
    border-radius: 10px;
    margin: 10px;
  }
  @media only screen and (max-width: 768px) {
    .modal-content {
      max-height: 95vh;
    }
  }
`;

const Modal = ({ isActive, onClose, title, children }) => (
  <Container>
    <div className={`modal ${isActive ? 'is-active' : ''}`}>
      <div className="modal-background" />
      <div className="modal-content">
        <div className="has-background-white inner-wrapper px-5 pt-5 pb-6">
          <div className="has-text-right">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="button is-white is-small"
                aria-label="close">
                <i className="fas fa-times" />
              </button>
            )}
          </div>
          {title && <Heading>{title}</Heading>}
          {children}
        </div>
      </div>
    </div>
  </Container>
);

export default Modal;
