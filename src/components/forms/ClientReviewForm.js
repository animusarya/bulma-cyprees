import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { InputGroup, Button, TextAreaGroup } from '../elements';
import Rating from '../Rating';

const RatingTitle = styled.p`
  align-self: center;
  padding-right: 15px;
  font-weight: bold;
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
    setFieldValue,
    project,
  } = props;

  const { buttonsColor, buttonsTextColor, starsColor } = project;
  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        border
        label="Your Name:"
        name="personName"
        type="text"
        value={values.personName}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.personName && touched.personName
            ? errors.personName
            : undefined
        }
      />
      <InputGroup
        border
        label="Your Location:"
        name="location"
        type="text"
        value={values.location}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.location && touched.location ? errors.location : undefined
        }
      />
      <div className="is-flex">
        <RatingTitle>Your Rating:</RatingTitle>
        <Rating
          size={40}
          activeColor={starsColor}
          value={values.rating}
          onChange={(val) => setFieldValue('rating', val)}
        />
      </div>
      <InputGroup
        border
        label="Review Title:"
        name="reviewTitle"
        type="text"
        labelInfo="(Max 80 characters)"
        value={values.reviewTitle}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.reviewTitle && touched.reviewTitle
            ? errors.reviewTitle
            : undefined
        }
      />
      <TextAreaGroup
        border
        label="Review Description:"
        name="comment"
        labelInfo="(Max 500 characters)"
        value={values.comment}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.comment && touched.comment ? errors.comment : undefined}
      />

      <div className="field">
        <div className="control">
          <Button
            bgColor={buttonsColor}
            buttonsTextColor={buttonsTextColor}
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
    personName: '',
    location: '',
    reviewTitle: '',
    comment: '',
    rating: '',
  }),
  validationSchema: yup.object().shape({
    personName: yup.string().required('Name is required!'),
    location: yup.string().required('Location is required!'),
    reviewTitle: yup.string().required('Title is required!'),
    comment: yup.string().required('Review is required!'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit(values).finally(() => {
      setSubmitting(false);
    });
  },
  displayName: 'ClientReviewForm', // helps with React DevTools
})(ClientReviewForm);
