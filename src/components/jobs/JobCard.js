import React from 'react';
import styled from 'styled-components';

import { Heading, InputGroup } from '../elements';
import JobTable from './JobTable';

const Container = styled.div`
  background-color: ${(props) => props.theme.mainBrandColor};
  label {
    color: ${(props) => props.theme.textColorLight};
    font-size: ${(props) => props.theme.fontSizeSmall};
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
        <div className="column is-half-mobile is-2-widescreen">
          <div className="field">
            <InputGroup smallInput label="Search:" type="text" />
          </div>
        </div>
      </div>
      <JobTable />
    </div>
  </Container>
);

export default JobCard;
