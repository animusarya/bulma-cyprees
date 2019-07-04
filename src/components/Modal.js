import React from 'react';
import styled from 'styled-components';

import Subtitle from './elements/Subtitle';
import { Button } from './elements';

const Container = styled.div`
  background-color: #25313f;
`;

const Modal = ({ isShowing, hide }) => {
  return isShowing ? (
    <Container>
      <div className="modal-background" />
      <div className="modal-content">
        <Subtitle>Apply Branding</Subtitle>
        <div className="box">
          <Button type="submit" onClick={() => isShowing}>
            OK
          </Button>
        </div>
      </div>
      <button
        type="submit"
        className="modal-close is-large"
        aria-label="close"
        onClick={() => hide}
      />
    </Container>
  ) : null;
};

export default Modal;
