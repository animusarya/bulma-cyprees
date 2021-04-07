import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { InputGroup, Button } from '../elements';

const ForgotPasswordForm = (props) => {
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
    <form className="mb-4" onSubmit={handleSubmit}>
      <InputGroup
        darkLabel
        border
        label="Your Email Address"
        name="email"
        placeholder="john@doe.com"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.email && touched.email ? errors.email : undefined}
      />

      <Button primary type="submit" disabled={isSubmitting}>
        <span>Submit</span>
      </Button>
    </form>
  );
};

ForgotPasswordForm.propTypes = {
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
    email: '',
  }),
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email is required!'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit(values).then(() => {
      setSubmitting(false);
    });
  },
  displayName: 'ForgotPasswordForm', // helps with React DevTools
})(ForgotPasswordForm);
