import React from 'react';
import styled from 'styled-components';

import { Heading, InputGroup } from '../elements';
import Pagination from './Pagination';

const Container = styled.div`
  background-color: ${(props) => props.theme.primaryBackground};
`;
const SelectContainer = styled.div`
  option {
    background: ${(props) => props.theme.mainBrandColor};
    color: ${(props) => props.theme.textColorWhite};
  }
  select {
    background-color: ${(props) => props.theme.secondaryColor};
    border: 1px solid ${(props) => props.theme.borderColor};
    color: ${(props) => props.theme.fontDark} !important;

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
            <label className="label has-text-black">Show entries</label>
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
    <Pagination />
  </Container>
);

export default DashboardMenu;
