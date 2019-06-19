import React from 'react';
import styled from 'styled-components';

const Heading = styled.div`
padding: 4% 0%;
`;

const PageHeading = ({ title }) => (
    <Heading className="has-text-centered has-text-weight-bold is-size-1">
    {title}
    </Heading>
);

export default PageHeading;