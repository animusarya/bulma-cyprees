import React, { useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';

import { InputGroup, Button, TextAreaGroup } from '../elements';
import Rating from '../Rating';

const RatingTitle = styled.p`
  align-self: center;
  padding-right: 15px;
  font-weight: bold;
`;

const LocationContainer = styled.div`
  .label:not(:last-child) {
    margin-bottom: 0em;
  }
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

  const { starsColor } = project;
  const recaptchaRef = useRef();
  // console.log(project, 'project');

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
      <LocationContainer className="columns">
        <div className="column">
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
        </div>
        <div className="column">
          <InputGroup
            border
            label="Company Name:"
            labelInfo="(if applicable)"
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
        </div>
      </LocationContainer>
      <div className="is-flex">
        <RatingTitle>Your Rating:</RatingTitle>
        {project.starsColor && (
          <Rating
            size={40}
            activeColor={starsColor}
            value={values.rating}
            onChange={(val) => setFieldValue('rating', val)}
          />
        )}
      </div>
      <p className="help is-danger">
        {errors.rating && touched.rating ? errors.rating : undefined}
      </p>
      <InputGroup
        border
        label="Review Title:"
        name="reviewTitle"
        type="text"
        labelInfo="(Max 80 characters)"
        maxLength={80}
        placeholder="EXAMPLE: Great service at an affordable price"
        counter={values.reviewTitle.length}
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
        labelInfo="(Max 500 characters)"
        maxLength={500}
        name="comment"
        counter={values.comment.length}
        value={values.comment}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.comment && touched.comment ? errors.comment : undefined}
      />
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey="6Le4cHIaAAAAAOIdPjobB3d82VEGegRAT3Y-fmDS"
        onChange={(response) => {
          setFieldValue('recaptcha', response);
        }}
      />
      {errors.recaptcha && touched.recaptcha && (
        <p className="help is-danger">{errors.recaptcha}</p>
      )}
      <div className="field">
        <div className="control">
          <Button
            marginTop
            marginBottomNone
            hasBgColor={project.buttonsColor}
            buttonsTextColor={
              project.buttonsTextColor ? project.buttonsTextColor : '#ffffff'
            }
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
    companyName: '',
    reviewTitle: '',
    comment: '',
    rating: '',
    recaptcha: '',
  }),
  validationSchema: yup.object().shape({
    personName: yup.string().required('Name is required!'),
    location: yup.string().required('Location is required!'),
    reviewTitle: yup.string().required('Title is required!'),
    comment: yup.string().required('Review is required!'),
    rating: yup.number().required('Rating is required!'),
    recaptcha: yup.string().required('recaptcha is required!'),
  }),

  handleSubmit: (values, { setSubmitting, resetForm, props }) => {
    // console.log('handle submit', values, props);
    props
      .onSubmit(values)
      .then(() => {
        setSubmitting(false);
        resetForm();
      })
      .catch(() => {
        setSubmitting(false);
      });
  },
  displayName: 'ClientReviewForm', // helps with React DevTools
})(ClientReviewForm);
