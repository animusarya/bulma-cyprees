import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { InputGroup } from './elements';

const Button = styled.button`
  margin-top: 2rem;
  background-color: ${props => props.theme.primaryColor};
  height: 100%;
  border-radius: 6px;
  padding: 0.5rem 5rem 0.5rem 5rem;
`;

const ResetPassword = styled.div`
  a {
    :hover {
      color: #b2d13d;
      font-size: ${props => props.theme.fontSizeSmall};
    }
  }
`;

const LoginForm = props => {
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
      <InputGroup
        border
        label="Password"
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
      <div className="field">
        <div className="control">
          <Button type="submit" className="button" disabled={isSubmitting}>
            <span className="has-text-weight-bold has-text-light is-size-4">
              Log In
            </span>
          </Button>
        </div>
      </div>
      <ResetPassword>
        <Link to="/forgot-password">Forgot Password?</Link>
      </ResetPassword>
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
    props.onSubmit(values).finally(() => {
      setSubmitting(false);
    });
  },
  displayName: 'LoginForm', // helps with React DevTools
})(LoginForm);
