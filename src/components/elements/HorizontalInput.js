import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
input {
    border-radius : 0px!important;
  }
  label {
    color:  ${props => props.theme.secondaryColor};
  }
`;

const HorizontalInput = ({label, placeholder}) => (
    <Container className="field is-horizontal">
        <div className="field-label is-normal">
        <label className="label has-text-left has-text-weight-semibold	">{label}</label>
        </div>
        <div className="field-body">
        <div className="field">
            <p className="control">
            <input className="input" type="email" placeholder={placeholder}/>
            </p>
        </div>
        </div>
    </Container>
);

export default HorizontalInput;
