import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { InputGroup, Button, Select } from '../elements';

const groupList = [
  { id: 1, value: 'active' },
  { id: 2, value: 'notActive' },
  { id: 3, value: 'archived' },
];

const AddContractorForm = (props) => {
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
        placeholder="Select..."
        label="Status"
        name="status"
        options={groupList}
        type="text"
        value={values.status}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.status && touched.status ? errors.status : undefined}
      />
      <InputGroup
        label="Accounts Email"
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
        label="Accounts Number"
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
        label="Accounts Telephone"
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
        label="Password"
        name="password"
        type="text"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.password && touched.password ? errors.password : undefined
        }
      />
      <div className="mb-3 mt-5">
        <Button primary type="submit" loading={isSubmitting}>
          <span className="has-text-weight-bold">Submit</span>
        </Button>
      </div>
    </form>
  );
};

AddContractorForm.propTypes = {
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
    fullName: '',
    telephone: '',
    status: '',
    accountEmail: '',
    registrationNumber: '',
    vatNumber: '',
    accountNumber: '',
    accountAddress: '',
    accountTelephone: '',
    password: '',
  }),
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email is required!'),
    status: yup.string().required('Status is required!'),
    telephone: yup.string().required('telephone is required!'),
    registrationNumber: yup
      .string()
      .required('Registration Number is required!'),
    vatNumber: yup.string().required('VAT Number is required!'),
    accountNumber: yup.string().required('Account Number is required!'),
    accountEmail: yup
      .string()
      .email('Invalid email address')
      .required('Account Email is required!'),
    accountAddress: yup.string().required('Account address is required!'),
    accountTelephone: yup.string().required('Account telephone is required!'),
    fullName: yup.string().required('Name is required!'),

    password: yup
      .string()
      .required('Password is required!')
      .min(6, 'Password is too short - should be 6 chars minimum'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    props
      .onSubmit({
        email: values.email,
        password: values.password,
        telephone: values.telephone,
        status: values.status,
        account: {
          accountEmail: values.accountEmail,
          registrationNumber: values.registrationNumber,
          vatNumber: values.vatNumber,
          accountNumber: values.accountNumber,
          accountAddress: values.accountAddress,
          accountTelephone: values.accountTelephone,
        },
        profile: {
          fullName: values.fullName,
        },
      })
      .then(() => {
        setSubmitting(false);
      });
  },
  displayName: 'AddContractorForm',
})(AddContractorForm);
