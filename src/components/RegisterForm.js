import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components';

import { InputGroup } from './elements';
import NDAScroller from './NDAScroller';
import Disclaimer from './Disclaimer';

const Button = styled.button`
  margin-top: 2rem;
`;
const RegisterForm = props => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    project,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        border
        label="Full Name:"
        name="fullName"
        type="text"
        placeholder="John Doe"
        value={values.fullName}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.fullName && touched.fullName ? errors.fullName : undefined
        }
      />
      <InputGroup
        border
        label="Email:"
        name="email"
        placeholder="john@doe.com"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.email && touched.email ? errors.email : undefined}
      />
      <InputGroup
        border
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
        border
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
      {project.nda && <NDAScroller data={project.nda} />}
      <label className="checkbox">
        <input type="checkbox" />{' '}
        <strong>I Accept the above Non Disclosure Agreement</strong>
      </label>
      <div className="field">
        <div className="control">
          <Button
            type="submit"
            className="button is-info is-normal is-fullwidth"
            disabled={isSubmitting}>
            Register
          </Button>
        </div>
      </div>
      <Disclaimer data={project.disclaimer ? project.disclaimer : undefined} />
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
  mapPropsToValues: ({ initialValues }) => ({
    fullName: '',
    email: initialValues.email,
    password: '',
    confirmPassword: '',
  }),
  validationSchema: yup.object().shape({
    fullName: yup.string().required('name is required!'),
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email is required!'),
    password: yup
      .string()
      .required('Password is required!')
      .min(6, 'Seems a bit short...'),
    confirmPassword: yup
      .string()
      .required('This filed is required!')
      .label('Confirm password')
      .test('passwords-match', 'Passwords not matched!', function(values) {
        return this.parent.password === values;
      }),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit(values).finally(() => {
      setSubmitting(false);
    });
  },
  displayName: 'RegisterForm', // helps with React DevTools
})(RegisterForm);
