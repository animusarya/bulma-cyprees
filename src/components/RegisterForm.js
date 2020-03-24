import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components';

import { InputGroup } from './elements';
import NDAScroller from './NDAScroller';
import Disclaimer from './Disclaimer';

const Button = styled.button`
  margin-top: 2rem;
  background-color: ${props => props.theme.primaryColor};
  height: 100%;
  border-radius: 6px;
`;

const MarginContainer = styled.p`
  margin-top: 2.5rem;
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
    isAdminRegister,
  } = props;
  const [ndaAccepted, setNdaAccepted] = useState(
    !(!isAdminRegister && project.nda),
  );
  console.log('ndaAccepted', ndaAccepted);

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        border
        label="Full Name:"
        name="fullName"
        type="text"
        value={values.fullName}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.fullName && touched.fullName ? errors.fullName : undefined
        }
      />
      {isAdminRegister && (
        <InputGroup
          border
          label="Company Name:"
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
      )}
      {isAdminRegister && (
        <InputGroup
          border
          label="Telephone:"
          name="telephone"
          type="text"
          value={values.telephone}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={
            errors.telephone && touched.telephone ? errors.telephone : undefined
          }
        />
      )}
      <InputGroup
        border
        label="Email:"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.email && touched.email ? errors.email : undefined}
        readOnly={!isAdminRegister}
      />
      <InputGroup
        border
        label="Password:"
        name="password"
        type="password"
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
      {!isAdminRegister && project.nda && (
        <label className="checkbox">
          <input
            type="checkbox"
            defaultChecked={ndaAccepted}
            onChange={() => setNdaAccepted(!ndaAccepted)}
          />{' '}
          <strong>I Accept the above Non Disclosure Agreement</strong>
        </label>
      )}
      {isAdminRegister && (
        <MarginContainer className="has-text-weight-semibold">
          By creating an account you agree to the website{' '}
          <a href="#">terms and conditions</a> and our{' '}
          <a href="#">privacy notice.</a>
        </MarginContainer>
      )}
      <div className="field">
        <div className="control">
          <Button
            type="submit"
            className="button"
            disabled={isSubmitting || !ndaAccepted}
          >
            <span className="has-text-weight-bold has-text-light is-size-4">
              Create Account
            </span>
          </Button>
        </div>
      </div>
      <Disclaimer
        data={
          project.disclaimer ? (
            project.disclaimer
          ) : (
            <MarginContainer>
              © 2020. IntelliShare. All Rights Reserved.
            </MarginContainer>
          )
        }
      />
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
    companyName: '',
    telephone: '',
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
