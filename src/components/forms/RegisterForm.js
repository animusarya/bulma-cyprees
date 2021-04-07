import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';
// import styled from 'styled-components';

import { InputGroup, Button } from '../elements';

const RegisterForm = (props) => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    isAdminRegister,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        fullWidth
        label="Customer"
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
          label="Domain Name:"
          name="websiteAddress"
          type="text"
          value={values.websiteAddress}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={
            errors.websiteAddress && touched.websiteAddress
              ? errors.websiteAddress
              : undefined
          }
        />
      )}
      {isAdminRegister && (
        <InputGroup
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
      <div className="mt-3 mb-3">
        <Button primary type="submit" disabled={isSubmitting}>
          <span className="has-text-weight-bold">Submit</span>
        </Button>
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
  mapPropsToValues: ({ initialValues }) => ({
    fullName: initialValues.fullName ? initialValues.fullName : '',
    email: initialValues.email ? initialValues.email : '',
    password: initialValues.password ? initialValues.password : '',
    confirmPassword: initialValues.confirmPassword
      ? initialValues.confirmPassword
      : '',
    companyName: initialValues.companyName ? initialValues.companyName : '',
    websiteAddress: initialValues.websiteAddress
      ? initialValues.websiteAddress
      : '',
    telephone: initialValues.telephone ? initialValues.telephone : '',
  }),
  validationSchema: yup.object().shape({
    fullName: yup.string().required('name is required!'),
    websiteAddress: yup.string().required('Website Address is required!'),
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
      .test('passwords-match', 'Passwords not matched!', function (values) {
        return this.parent.password === values;
      }),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    props.onSubmit(values).then(() => {
      setSubmitting(false);
    });
  },
  displayName: 'RegisterForm', // helps with React DevTools
})(RegisterForm);
