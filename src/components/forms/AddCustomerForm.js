import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { InputGroup, Button, TextArea } from '../elements';
import AddressForm from './AddressForm';

const AddCustomerForm = (props) => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
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
        label="Jobs Email"
        name="jobsEmail"
        type="text"
        value={values.jobsEmail}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.jobsEmail && touched.jobsEmail ? errors.jobsEmail : undefined
        }
      />
      <h1>Address Info</h1>
      <InputGroup
        label="Name"
        name="location.name"
        type="text"
        value={values.location.name}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.name && touched.name ? errors.name : undefined}
      />
      <InputGroup
        label="Store Number:"
        name="location.storeNumber"
        type="text"
        value={values.location.storeNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.storeNumber && touched.storeNumber
            ? errors.storeNumber
            : undefined
        }
      />
      <AddressForm
        onChange={(value) => setFieldValue('location.address', value)}
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
      <div className="mb-3 mt-4">
        <Button primary type="submit" loading={isSubmitting}>
          <span className="has-text-weight-bold">Submit</span>
        </Button>
      </div>
    </form>
  );
};

AddCustomerForm.propTypes = {
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
    companyName: '',
    accountsEmail: '',
    jobsEmail: '',
    siteName: '',
    storeNumber: '',
    location: {
      name: '',
      storeNumber: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        postcode: '',
      },
    },
    paymentTerms: '',
    internalNotes: '',
  }),
  validationSchema: yup.object().shape({
    companyName: yup.string().required('Company Name is required!'),
    accountsEmail: yup
      .string()
      .email('Invalid email address')
      .required('Account Email is required!'),
    jobsEmail: yup
      .string()
      .email('Invalid email address')
      .required('Jobs Email is required!'),
    // siteName: yup.string().required('Site Name is required!'),

    paymentTerms: yup.string().required('Payment Terms is required!'),
    internalNotes: yup.string(),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    console.log(values);
    props.onSubmit(values).then(() => {
      setSubmitting(false);
    });
  },
  displayName: 'AddCustomerForm', // helps with React DevTools
})(AddCustomerForm);
