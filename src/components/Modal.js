import React from 'react';

const Modal = ({ isShowing, hide }) => {
  return isShowing ? (
    <React.Fragment>
      <div className="modal-overlay" />
      <div
        className="modal-wrapper"
        aria-modal
        aria-hidden
        tabIndex={-1}
        role="dialog">
        <div className="modal">
          <div className="modal-header">
            <button
              type="button"
              className="modal-close-button"
              data-dismiss="modal"
              aria-label="Close"
              onClick={hide}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <p>Hi this is modal</p>
        </div>
      </div>
    </React.Fragment>
  ) : null;
};

export default Modal;
