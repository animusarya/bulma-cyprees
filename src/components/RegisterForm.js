import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { InputGroup, Button } from './elements';

const RegisterForm = props => {
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
        label="Name:"
        name="name"
        placeholder="John Doe"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.name && touched.name ? errors.name : undefined}
      />
      <InputGroup
        label="Email:"
        name="email"
        placeholder="john@doe.com"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.email && touched.email ? errors.email : undefined}
      />
      <InputGroup
        label="Password:"
        name="password"
        type="password"
        placeholder="*********"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.password && touched.password ? errors.password : undefined
        }
      />
      <InputGroup
        label="Confirm Password:"
        name="confirmPassword"
        type="password"
        placeholder="*********"
        value={values.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.confirmPassword && touched.confirmPassword
            ? errors.confirmPassword
            : undefined
        }
      />
      <div className="field">
        <div className="control">
          <Button disabled={isSubmitting}>Register</Button>
        </div>
      </div>
    </form>
  );
};

RegisterForm.propTypes = {
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
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  }),
  validationSchema: yup.object().shape({
    name: yup
      .string()
      .name('Invalid Name')
      .required('name is required!'),
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email is required!'),
    password: yup.string().required('Password is required!'),
    confirmPassword: yup.string().required('This filed is required!'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit(values).finally(() => {
      setSubmitting(false);
    });
  },
  displayName: 'RegisterForm', // helps with React DevTools
})(RegisterForm);
