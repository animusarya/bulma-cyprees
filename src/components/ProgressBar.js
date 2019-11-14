import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Progress = styled.div`
  border-top: 1px solid #979797;
  margin: 3rem 3.5rem;
  .active {
    font-weight: bold;
    .progress {
      background-color: #bccf02 !important;
      width: 100%;
    }
  }
  .step {
    float: left;
    width: 33.3%;
    .progress {
      width: 100%;
      height: 10px;
      background-color: #797979;
      margin: -9px auto 0 auto;
    }
  }
  .step.one {
    text-align: center;
    .progress {
      margin: -9px 0 0 0;
    }
  }
  .step.two {
    text-align: center;
  }
  .step.three {
    text-align: center;
    .progress {
      margin: -9px 0 0 0;
    }
  }
`;

const ProgressBar = ({ activeStep }) => (
  <Progress>
    <div className={`step one ${activeStep === 1 ? 'active' : ''}`}>
      <div className="progress" />
      <span className="has-text-weight-bold">01. Project Setup</span>
    </div>
    <div className={`step two ${activeStep === 2 ? 'active' : ''}`}>
      <div className="progress" />
      <span className="has-text-weight-bold">02. Payment</span>
    </div>
    <div className={`step three ${activeStep === 3 ? 'active' : ''}`}>
      <div className="progress" />
      <span className="has-text-weight-bold">03. Confirmation</span>
    </div>
  </Progress>
);

ProgressBar.defaultProps = {
  activeStep: 1,
};

ProgressBar.propTypes = {
  activeStep: PropTypes.number,
};

export default ProgressBar;
