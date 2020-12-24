import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';
// import styled from 'styled-components';

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
    <form onSubmit={handleSubmit}>
      <InputGroup
        border
        label="Email"
        name="email"
        placeholder="john@doe.com"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.email && touched.email ? errors.email : undefined}
      />
      <div className="field">
        <div className="control">
          <Button
            type="submit"
            marginTop
            marginBottomNone
            disabled={isSubmitting}>
            <span className="has-text-weight-bold has-text-light is-size-4">
              Reset Password
            </span>
          </Button>
        </div>
      </div>
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
    props.onSubmit(values).finally(() => {
      setSubmitting(false);
    });
  },
  displayName: 'ForgotPasswordForm', // helps with React DevTools
})(ForgotPasswordForm);
