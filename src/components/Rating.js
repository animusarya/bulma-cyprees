import React from 'react';
import styled from 'styled-components';
import ReactStars from 'react-rating-stars-component';

const Container = styled.div`
  text-align: center;
  :focus {
    outline-width: 0;
  }
  .react-stars {
    :focus {
      outline-width: 0;
    }
  }
`;

const Rating = ({ size, value, disabled, count, onChange }) => (
  <Container>
    {disabled ? (
      <ReactStars
        size={size}
        count={count || 1}
        half={false}
        activeColor="#ffd700"
        emptyIcon={<i className="far fa-star" />}
        fullIcon={<i className="fa fa-star" />}
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
