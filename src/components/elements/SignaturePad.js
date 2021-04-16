import React from 'react';
import SignatureCanvas from 'react-signature-canvas';

import styled from 'styled-components';

const CanvasWrapper = styled.div`
  .sigCanvas {
    width: 100%;
  }
  label {
    font-size: ${(props) => props.theme.fontSizeSmall};
  }
`;

const SignaturePad = ({ label }) => (
  <CanvasWrapper>
    {label && (
      <label className="label has-text-weight-semibold has-text-black">
        {label}
      </label>
    )}{' '}
    <SignatureCanvas
      penColor="green"
      canvasProps={{ className: 'sigCanvas has-background-white-ter' }}
    />
  </CanvasWrapper>
);

export default SignaturePad;
