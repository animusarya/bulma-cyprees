import React from 'react';
import styled from 'styled-components';

import { Heading, InputGroup } from '../elements';

const Container = styled.div`
  background-color: #fff;
`;
const SelectContainer = styled.div`
  option {
    background: #4896fc;
    color: #fff !important;
  }
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

const DashboardMenu = ({ heading, children, hasSearchMenu }) => (
  <Container className="card">
    <div className="card-content">
      <Heading>{heading}</Heading>{' '}
      {hasSearchMenu && (
        <div className="columns">
          <div className="column is-half">
            <label className="label">Show entries</label>
            <SelectContainer className="select is-small">
              <select>
                <option>Select dropdown</option>
                <option>10</option>
                <option>25</option>
                <option>100</option>
              </select>
            </SelectContainer>
          </div>
          <div className="column is-half-mobile is-2-desktop is-3-tablet">
            <div className="field">
              <InputGroup
                placeholder="Search..."
                smallInput
                label="Search:"
                type="text"
              />
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  </Container>
);

export default DashboardMenu;
