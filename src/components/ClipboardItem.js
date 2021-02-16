import React, { useState } from 'react';
import styled from 'styled-components';
import Clipboard from 'react-clipboard.js';

const Container = styled.div`
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  body,
  button,
  input,
  select,
  textarea {
    font-family: 'Poppins', sans-serif;
    background: transparent;
    border: none;
    font-size: 1.4rem;
    text-align: inherit;
    color: #3a0256;
    display: flex;
    padding: 0;
  }
`;

const ClipboardNotification = styled.div`
  position: absolute;
  right: 0;
  width: 4rem;
  @media only screen and (max-width: 768px) {
    position: relative;
  }
`;

const ClipboardItem = ({ title, size }) => {
  const [active, setActive] = useState(false);

  const getText = () => `${title}`;

  setTimeout(() => {
    if (active) {
      setActive(false);
    }
  }, 2000);

  return (
    <Container>
      <Clipboard option-text={getText} onClick={() => setActive(true)}>
        <span className={`is-size-${size} has-text-weight-bold`}>{title}</span>
        <ClipboardNotification>
          <i className="far fa-clipboard" />
          {active && <div className="has-text-success is-size-6">copied!</div>}
        </ClipboardNotification>
      </Clipboard>
    </Container>
  );
};

export default ClipboardItem;
