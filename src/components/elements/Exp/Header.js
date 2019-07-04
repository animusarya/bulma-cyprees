import React from 'react';

import Modal from './Modal';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeModal: false,
    };
  }

  toggleModal = () => {
    const { activeModal } = this.state;
    this.setState({ activeModal: !activeModal });
  };

  render() {
    const { activeModal } = this.state;

    return (
      <div className="columns">
        <div className="column is-four-fifths"></div>
        <div className="column">
          <a className="button is-medium" onClick={this.toggleModal}>
            Add
          </a>
        </div>
        <Modal active={activeModal} handelClose={this.toggleModal} />
      </div>
    );
  }
}

export default Header;
