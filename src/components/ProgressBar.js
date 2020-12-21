import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const Progress = styled.div`
  border-top: 1px solid #979797;
  margin: 3rem 3.5rem;
  .active {
    font-weight: bold;
    .progress {
      background-color: #ffc33c !important;
      width: 100%;
    }
  }
  .step {
    float: left;
    width: 33.3%;
    .progress {
      width: 100%;
      height: 10px;
      background-color: #eeeeee;
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
    <div className={`step one ${activeStep.stepOne ? 'active' : ''}`}>
      <div className="progress" />
      <span className="has-text-weight-bold">01. Website Details</span>
    </div>

    <div className={`step two ${activeStep.stepTwo ? 'active' : ''}`}>
      <div className="progress" />
      <span className="has-text-weight-bold">02. Make Payment</span>
    </div>
    <div className={`step three ${activeStep.stepThree ? 'active' : ''}`}>
      <div className="progress" />
      <span className="has-text-weight-bold">03. Confirmation</span>
    </div>
  </Progress>
);

export default ProgressBar;
