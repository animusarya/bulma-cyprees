import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { InputGroup, Button, TextArea, NameSelectInput } from '../elements';

const customerName = [
  { name: 'Kunal' },
  { name: 'Dharmveer' },
  { name: 'Taniya' },
  { name: 'Saurav' },
  { name: 'Manisha' },
  { name: 'Vishal' },
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
      <NameSelectInput
        name="name"
        value={values.name}
        onBlur={handleBlur}
        // onChange={(value) => setFieldValue('name', value)}
        label="Customer"
        options={
          customerName
            ? customerName.map((item) => ({
                value: item.name,
                label: item.name,
              }))
            : []
        }
        errors={errors.name && touched.name ? errors.name : undefined}
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
