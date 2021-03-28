import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

import { InputGroup, Button } from '../elements';

const LoginForm = (props) => {
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
        label="Username"
        name="email"
        placeholder="Enter your username"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.email && touched.email ? errors.email : undefined}
      />
      <InputGroup
        border
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.password && touched.password ? errors.password : undefined
        }
      />
      <Link
        className="has-text-grey-lighter is-pulled-right is-size-7 mb-4"
        to="/forgot-password">
        Forgot your password?
      </Link>
      <div className="field">
        <div className="control">
          <Button
            fullWidth
            marginTop
            marginBottomNone
            type="submit"
            disabled={isSubmitting}>
            <span className="has-text-weight-bold is-size-4">Log In</span>
          </Button>
        </div>
      </div>
    </form>
  );
};

LoginForm.propTypes = {
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
    password: '',
  }),
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email is required!'),
    password: yup.string().required('Password is required!'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit(values).then(() => {
      setSubmitting(false);
    });
  },
  displayName: 'LoginForm', // helps with React DevTools
})(LoginForm);
