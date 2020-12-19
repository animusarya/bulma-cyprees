import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  input {
    height: 2.5rem;
    width: 2.5rem;
    margin-left: ${(props) => props.margin};
    @media only screen and (max-width: 600px) {
      margin-left: 0px;
    }
  }
  .text {
    margin-top: 5px;
  }
  .checkmark {
    background: transparent;
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
  }
`;

const CheckBox = ({ text, margin }) => (
  <Container margin={margin}>
    <div className="columns is-horizontal is-mobile">
      <div className="column is-1-desktop  has-text-left text has-text-weight-semibold">
        <label className="checkbox">{text}</label>
      </div>
      <div className="column">
        <input type="checkbox" className="checkbox" />
        <span className="checkmark" />
      </div>
    </div>
  </Container>
);

export default CheckBox;
