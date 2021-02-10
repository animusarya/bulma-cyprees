import React from 'react';
import styled from 'styled-components';

const Container = styled.label`
  margin: 14px 0px 32px 0px;
  input {
    height: 1.5rem;
    width: 1.5rem;
    margin-left: ${(props) => props.margin};
    @media only screen and (max-width: 768px) {
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
  label {
    margin-left: 7px;
    align-self: center;
  }
`;

const CheckBox = ({ text, margin, checked, onClick, disabled }) => (
  <Container margin={margin} className="is-flex">
    <input
      type="checkbox"
      className="checkbox"
      checked={checked}
      onClick={onClick}
      disabled={disabled}
    />
    <span className="checkmark" />
    <label className="checkbox">{text}</label>
  </Container>
);

export default CheckBox;
