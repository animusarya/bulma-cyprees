import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { InputGroup, Button, TextAreaGroup } from './elements';
import Rating from './Rating';

const RatingTitle = styled.p`
  align-self: center;
  padding-right: 15px;
`;

const ClientReviewForm = (props) => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        border
        label="Your Name:"
        name="fullName"
        type="text"
        value={values.fullName}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.fullName && touched.fullName ? errors.fullName : undefined
        }
      />
      <InputGroup
        border
        label="Your Location:"
        name="companyName"
        type="text"
        value={values.companyName}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.companyName && touched.companyName
            ? errors.companyName
            : undefined
        }
      />
      <div className="is-flex">
        <RatingTitle>Your Rating:</RatingTitle>
        <Rating
          size={40}
          disabled
          onChange={handleChange}
          value={values.ratings}
          count={5}
        />
      </div>
      <InputGroup
        border
        label="Review Title:"
        name="telephone"
        type="text"
        labelInfo="(Max 80 characters)"
        value={values.telephone}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.telephone && touched.telephone ? errors.telephone : undefined
        }
      />
      <TextAreaGroup
        border
        label="Review Description:"
        name="email"
        labelInfo="(Max 500 characters)"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.email && touched.email ? errors.email : undefined}
      />

      <div className="field">
        <div className="control">
          <Button
            marginTop
            marginBottomNone
            type="submit"
            disabled={isSubmitting}>
            <span className="has-text-weight-bold is-size-4">
              Submit Review
            </span>
          </Button>
        </div>
      </div>
    </form>
  );
};

ClientReviewForm.propTypes = {
  values: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default withFormik({
  mapPropsToValues: () => ({
    fullName: '',
  }),
  validationSchema: yup.object().shape({
    fullName: yup.string().required('name is required!'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit(values).finally(() => {
      setSubmitting(false);
    });
  },
  displayName: 'ClientReviewForm', // helps with React DevTools
})(ClientReviewForm);
