import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div``;

const EmptyState = ({ icon, title }) => (
  <Container className="has-text-centered mt-6">
    <span className="icon is-large has-text-warning is-size-2 ">
      <i className={icon} />
    </span>
    <h3 className="subtitle is-4">{title}</h3>
  </Container>
);

EmptyState.defaultProps = {
  icon: 'fas fa-exclamation-triangle',
  title: 'No data available',
};

EmptyState.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
};

export default EmptyState;
