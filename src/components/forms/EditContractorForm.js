import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { InputGroup, Button, Select } from '../elements';

const statusType = [
  { value: 'active' },
  { value: 'notActive' },
  { value: 'archived' },
];
const userType = [{ value: 'contractor' }, { value: 'admin' }];

const EditContractorForm = (props) => {
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
        label="Email"
        name="email"
        type="text"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.email && touched.email ? errors.email : undefined}
      />
      <InputGroup
        label="Profile Name"
        name="fullName"
        type="text"
        value={values.fullName}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.fullName && touched.fullName ? errors.fullName : undefined
        }
      />
      <InputGroup
        label="Telephone"
        name="telephone"
        type="text"
        value={values.telephone}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.telephone && touched.telephone ? errors.telephone : undefined
        }
      />
      <Select
        label="Status"
        name="status"
        options={statusType}
        type="text"
        value={values.status}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.status && touched.status ? errors.status : undefined}
      />
      <Select
        label="Type"
        name="type"
        options={userType}
        type="text"
        value={values.type}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.type && touched.type ? errors.type : undefined}
      />
      <InputGroup
        label="Registration Number"
        name="registrationNumber"
        type="text"
        value={values.registrationNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.registrationNumber && touched.registrationNumber
            ? errors.registrationNumber
            : undefined
        }
      />
      <InputGroup
        label="VAT Number"
        name="vatNumber"
        type="text"
        value={values.vatNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.vatNumber && touched.vatNumber ? errors.vatNumber : undefined
        }
      />

      <InputGroup
        label="Account Number"
        name="accountNumber"
        type="text"
        value={values.accountNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.accountNumber && touched.accountNumber
            ? errors.accountNumber
            : undefined
        }
      />
      <InputGroup
        label="Account Email"
        name="accountEmail"
        type="text"
        value={values.accountEmail}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.accountEmail && touched.accountEmail
            ? errors.accountEmail
            : undefined
        }
      />
      <InputGroup
        label="Account Address"
        name="accountAddress"
        type="text"
        value={values.accountAddress}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.accountAddress && touched.accountAddress
            ? errors.accountAddress
            : undefined
        }
      />
      <InputGroup
        label="Account Telephone"
        name="accountTelephone"
        type="text"
        value={values.accountTelephone}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.accountTelephone && touched.accountTelephone
            ? errors.accountTelephone
            : undefined
        }
      />

      <div className="mt-5">
        <Button primary type="submit" loading={isSubmitting}>
          <span className="has-text-weight-bold">Submit</span>
        </Button>
      </div>
    </form>
  );
};

EditContractorForm.propTypes = {
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
    email: initialValues.email || '',
    fullName: initialValues.profile ? initialValues.profile.fullName : '',
    telephone: initialValues.telephone || '',
    status: initialValues.status || '',
    registrationNumber: initialValues.account
      ? initialValues.account.registrationNumber
      : '',
    vatNumber: initialValues.account ? initialValues.account.vatNumber : '',
    accountNumber: initialValues.account
      ? initialValues.account.accountNumber
      : '',
    accountEmail: initialValues.account
      ? initialValues.account.accountEmail
      : '',
    accountAddress: initialValues.account
      ? initialValues.account.accountAddress
      : '',
    accountTelephone: initialValues.account
      ? initialValues.account.accountTelephone
      : '',
  }),

  validationSchema: yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required!'),
    fullName: yup.string().required('FullName is required!'),
    telephone: yup.string().required('Telephone is required!'),
    status: yup.string().required('Status is required!'),
    registrationNumber: yup
      .string()
      .required('Registration Number is required!'),
    vatNumber: yup.string().required('VAT number is required!'),
    accountNumber: yup.string().required('Account Number Number is required!'),
    accountEmail: yup.string().required('Account Email is required!'),
    accountAddress: yup.string().required('Account Address is required!'),
    accountTelephone: yup.string().required('Account Telephone is required!'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    props.onSubmit({
      email: values.email,
      telephone: values.telephone,
      status: values.status,
      profile: {
        fullName: values.fullName,
      },
      account: {
        registrationNumber: values.registrationNumber,
        vatNumber: values.vatNumber,
        accountNumber: values.accountNumber,
        accountEmail: values.accountEmail,
        accountAddress: values.accountAddress,
        accountTelephone: values.accountTelephone,
      },
    });
    setSubmitting(false);
  },
  displayName: 'EditContractorForm', // helps with React DevTools
})(EditContractorForm);
