import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { InputGroup, Button, TextArea, Select } from '../elements';

const companyList = [
  { id: 1, value: 'Company One' },
  { id: 2, value: 'Company Two' },
  { id: 3, value: 'Company Three' },
  { id: 4, value: 'Company Four' },
];

const AddSiteForm = (props) => {
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
        label="Company Name:"
        name="companyName"
        options={companyList}
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
        label="Store Number:"
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
      <TextArea
        label="Address"
        name="address"
        type="text"
        value={values.address}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.address && touched.address ? errors.address : undefined}
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
      <div className="mb-3 is-flex is-justify-content-flex-end	">
        <Button primary type="submit" disabled={isSubmitting}>
          <span className="has-text-weight-bold">Submit</span>
        </Button>
      </div>
    </form>
  );
};

AddSiteForm.propTypes = {
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
    siteName: '',
    storeNumber: '',
    address: '',
    paymentTerms: '',
    internalNotes: '',
  }),
  validationSchema: yup.object().shape({
    companyName: yup.string().required('Company Name is required!'),
    siteName: yup.string().required('Site Name is required!'),
    storeNumber: yup.string().required('Store Number is required!'),
    address: yup.string().required('Address is required!'),
    paymentTerms: yup.string().required('Payment Terms is required!'),
    internalNotes: yup.string().required('Note is required!'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    props.onSubmit(values).then(() => {
      setSubmitting(false);
    });
  },
  displayName: 'AddSiteForm', // helps with React DevTools
})(AddSiteForm);
