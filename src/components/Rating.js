import React from 'react';
import styled from 'styled-components';
import ReactStars from 'react-rating-stars-component';

const Container = styled.div`
  text-align: center;
`;

const Rating = ({ size, value, disabled, count, onChange }) => (
  <Container>
    {disabled ? (
      <ReactStars
        size={size}
        count={count || 1}
        half={false}
        color2="#FED900"
        value={value === 0 ? 0 : 5}
      />
    ) : (
      <ReactStars
        count={5}
        size={size}
        half={false}
        color2="#FED900"
        value={value}
        onChange={(val) => onChange(val)}
      />
    )}
  </Container>
);
export default Rating;
