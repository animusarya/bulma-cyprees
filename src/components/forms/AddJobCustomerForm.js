import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { InputGroup, Button, Select, TextArea } from '../elements';

const customerList = [
  { id: 1, value: 'Select...' },
  { id: 2, value: 'Able' },
  { id: 3, value: 'Autosmart International Ltd' },
  { id: 4, value: 'BandM' },
  { id: 5, value: 'Belvoir' },
  { id: 6, value: 'Cambian' },
];

const AddJobCustomerForm = (props) => {
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
      <Select
        label="Customer"
        name="customerName"
        options={customerList}
        type="text"
        value={values.customerName}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.customerName && touched.customerName
            ? errors.customerName
            : undefined
        }
      />

      <InputGroup
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
        label="Address"
        name="address"
        type="text"
        value={values.address}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.address && touched.address ? errors.address : undefined}
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

      <div className="mt-5">
        <Button primary type="submit" disabled={isSubmitting}>
          <span className="has-text-weight-bold">Submit</span>
        </Button>
      </div>
    </form>
  );
};

AddJobCustomerForm.propTypes = {
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
    customerName: '',
    siteName: '',
    address: '',
    internalNotes: '',
  }),
  validationSchema: yup.object().shape({
    customerName: yup.string().required('Customer Name is required!'),
    siteName: yup.string().required('Site Name is required!'),
    address: yup.string().required('Address is required!'),
    internalNotes: yup.string(),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    props.onSubmit(values).then(() => {
      setSubmitting(false);
    });
  },
  displayName: 'AddJobCustomerForm', // helps with React DevTools
})(AddJobCustomerForm);
