import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

// import { InputGroup, Button, TextArea, GoogleMap } from '../elements';
import { InputGroup, Button } from '../elements';

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
      {/* <InputGroup
        label="Site Name"
        name="siteName"
        type="text"
        value={values.siteName}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.siteName && touched.siteName ? errors.siteName : undefined
        }
      />
      <InputGroup
        label="Store Number"
        name="storeNumber"
        type="text"
        value={values.storeNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.storeNumber && touched.storeNumber
            ? errors.storeNumber
            : undefined
        }
      />
      <InputGroup
        label="Address"
        name="address"
        type="text"
        value={values.address}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.address && touched.address ? errors.address : undefined}
      />

      <InputGroup
        label="Contact Email"
        name="contactEmail"
        type="text"
        value={values.contactEmail}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.contactEmail && touched.contactEmail
            ? errors.contactEmail
            : undefined
        }
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
      /> */}
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

    // paymentTerms: '',
    // address: '',
    // location: '',
    // contactEmail: '',
    // internalNotes: '',
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
    paymentTerms: yup.string().required('Jobs Email is required!'),

    // storeNumber: yup.string().required('Store Number is required!'),
    // address: yup.string().required('Address is required!'),
    // location: yup.string().required('Location is required!'),
    // contactEmail: yup.string().required('Contact Email is required!'),
    // internalNotes: yup.string(),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    props.onSubmit(values).then(() => {
      setSubmitting(false);
    });
  },
  displayName: 'EditCustomerForm', // helps with React DevTools
})(EditCustomerForm);
