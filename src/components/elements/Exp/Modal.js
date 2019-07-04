import React from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: '',
    };
  }

  onChange = e => {
    this.setState({ eventName: e.target.value });
  };

  render() {
    const { eventName } = this.state;
    const { active, handelClose, onLoading, handleSubmit } = this.props;
    return (
      <div className={`modal ${active && 'is-active'}`}>
        <div className="modal-background" />
        <div className="modal-content">
          <div className="box">
            <button
              type="submit"
              className={`button is-medium ${onLoading && 'is-loading'}`}
              disabled={eventName.length === 0 && true}
              onClick={() => handleSubmit({ name: eventName })}>
              Create
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="modal-close is-large"
          aria-label="close"
          onClick={() => handelClose()}
        />
      </div>
    );
  }
}

export default Modal;
