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

const Rating = ({
  size,
  value,
  disabled,
  count,
  onChange,
  activeColor,
  errors,
}) => (
  <Container>
    {disabled ? (
      <ReactStars
        size={size}
        count={count || 1}
        half={false}
        activeColor={activeColor || '#ffd700'}
        emptyIcon={<i className="far fa-star" />}
        fullIcon={<i className="fa fa-star" />}
        value={value === 0 ? 0 : value}
      />
    ) : (
      <ReactStars
        count={5}
        size={size}
        half={false}
        activeColor={activeColor || '#ffd700'}
        emptyIcon={<i className="far fa-star" />}
        fullIcon={<i className="fa fa-star" />}
        value={value}
        onChange={(val) => onChange(val)}
      />
    )}

    <div>{errors && <p className="help is-danger">{errors}</p>}</div>
  </Container>
);

export default Rating;
