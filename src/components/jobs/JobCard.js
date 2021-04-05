import React from 'react';
import styled from 'styled-components';

import Heading from '../elements/Heading';

const Container = styled.div`
  background-color: ${(props) => props.theme.secondaryColor};
  label {
    color: ${(props) => props.theme.textColorLight};
  }
`;

const SelectContainer = styled.div`
  select {
    background-color: ${(props) => props.theme.secondaryColor};
    border: 1px solid ${(props) => props.theme.borderColor};
    color: ${(props) => props.theme.textColorLight} !important;
    :focus,
    :hover {
      border-color: ${(props) => props.theme.borderColor};
      box-shadow: none;
    }
  }
`;

const JobCard = () => (
  <Container className="card">
    <div className="card-content">
      <Heading>Jobs</Heading>
      <div className="columns">
        <div className="column is-6">
          <label className="label">Show entries</label>
          <SelectContainer className="select is-small">
            <select>
              <option>Select dropdown</option>
              <option>With options</option>
            </select>
          </SelectContainer>
        </div>
        <div className="column is-6">hello</div>
      </div>
    </div>
  </Container>
);

export default JobCard;
