import React from 'react';
import Modal from '../components/Modal';
import useModal from '../components/UseModal';

const Test2 = () => {
  const { isShowing, toggle } = useModal();
  return (
    <div className="App">
      <button onClick={toggle}>
        Show Modal
      </button>
      <Modal isShowing={isShowing} hide={toggle} />
    </div>
  );
};

export default Test2;
