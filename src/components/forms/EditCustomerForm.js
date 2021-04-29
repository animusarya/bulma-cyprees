import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { InputGroup, Button, Select, TextArea, GoogleMap } from '../elements';

const statusType = [
  { value: 'active' },
  { value: 'notActive' },
  { value: 'archived' },
];

const EditCustomerForm = (props) => {
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
        label="Company Name"
        name="name"
        type="text"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.name && touched.name ? errors.name : undefined}
      />
      <InputGroup
        label="Account Email"
        name="accountsEmail"
        type="text"
        value={values.accountsEmail}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.accountsEmail && touched.accountsEmail
            ? errors.accountsEmail
            : undefined
        }
      />
      <InputGroup
        label="Job Email"
        name="jobsEmail"
        type="text"
        value={values.jobsEmail}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.jobsEmail && touched.jobsEmail ? errors.jobsEmail : undefined
        }
      />
      <InputGroup
        label="Payment Terms"
        name="paymentTerms"
        type="text"
        value={values.paymentTerms}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.paymentTerms && touched.paymentTerms
            ? errors.paymentTerms
            : undefined
        }
      />
      <Select
        placeholder="Select..."
        label="Status"
        name="status"
        options={statusType}
        type="text"
        value={values.status}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.status && touched.status ? errors.status : undefined}
      />
      <GoogleMap label="Location" />

      <TextArea
        label="Internal Notes"
        name="internalNotes"
        type="text"
        value={values.internalNotes}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.internalNotes && touched.internalNotes
            ? errors.internalNotes
            : undefined
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

EditCustomerForm.propTypes = {
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
    name: initialValues.name ? initialValues.name : '',
    accountsEmail: initialValues.accountsEmail
      ? initialValues.accountsEmail
      : '',

    jobsEmail: initialValues.jobsEmail ? initialValues.jobsEmail : '',
    paymentTerms: initialValues.paymentTerms ? initialValues.paymentTerms : '',
    status: initialValues.status ? initialValues.status : '',
    internalNotes: initialValues.internalNotes
      ? initialValues.internalNotes
      : '',
  }),

  validationSchema: yup.object().shape({
    name: yup.string().required('name is required!'),
    accountsEmail: yup
      .string()
      .email('Invalid email')
      .required('Account Email is required!'),
    jobsEmail: yup
      .string()
      .email('Invalid email')
      .required('Jobs Email is required!'),
    paymentTerms: yup.string().required('Payment Terms is required!'),
    status: yup.string().required('Status is required!'),
    internalNotes: yup.string(),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    props.onSubmit(values).then(() => {
      setSubmitting(false);
    });
  },
  displayName: 'EditCustomerForm', // helps with React DevTools
})(EditCustomerForm);
