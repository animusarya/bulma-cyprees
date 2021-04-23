import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { InputGroup, Button, TextArea, NameSelectInput } from '../elements';

const allCustomerNames = [
  { name: 'Dharmveer' },
  { name: 'Karanbir' },
  { name: 'Kunal' },
  { name: 'Vishal' },
  { name: 'Taniya' },
];

const siteList = [
  { siteName: 'Norton canes' },
  { siteName: 'Autosmart International Ltd  -  Lichfield' },
];

const jobAssignList = [
  { jobAssignedTo: 'Obama' },
  { jobAssignedTo: 'Dan' },
  { jobAssignedTo: 'Julia' },
  { jobAssignedTo: 'Richard' },
  { jobAssignedTo: 'Mark' },
];

const RegisterForm = (props) => {
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
      <NameSelectInput
        label="Customer"
        name="name"
        value={values.name}
        onBlur={handleBlur}
        onChange={(value) => setFieldValue('name', value)}
        options={
          allCustomerNames
            ? allCustomerNames.map((item) => ({
                value: item.name,
                label: item.name,
              }))
            : []
        }
        errors={errors.name && touched.name ? errors.name : undefined}
      />
      <NameSelectInput
        name="siteName"
        value={values.siteName}
        onBlur={handleBlur}
        // onChange={(value) => setFieldValue('name', value)}
        label="Site"
        options={
          siteList
            ? siteList.map((item) => ({
                value: item.siteName,
                label: item.siteName,
              }))
            : []
        }
        errors={
          errors.siteName && touched.siteName ? errors.siteName : undefined
        }
      />

      <InputGroup
        label="Job Number"
        name="jobNumber"
        type="text"
        value={values.jobNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.jobNumber && touched.jobNumber ? errors.jobNumber : undefined
        }
      />
      <InputGroup
        label="Customer Reference"
        name="customerReference"
        type="text"
        value={values.customerReference}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.customerReference && touched.customerReference
            ? errors.customerReference
            : undefined
        }
      />
      <TextArea
        label="Description"
        name="description"
        type="text"
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.description && touched.description
            ? errors.description
            : undefined
        }
      />
      <NameSelectInput
        name="jobAssignedTo"
        value={values.jobAssignedTo}
        onBlur={handleBlur}
        // onChange={(value) => setFieldValue('name', value)}
        label="Job Assigned to:"
        options={
          jobAssignList
            ? jobAssignList.map((item) => ({
                value: item.jobAssignedTo,
                label: item.jobAssignedTo,
              }))
            : []
        }
        errors={
          errors.jobAssignedTo && touched.jobAssignedTo
            ? errors.jobAssignedTo
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
  mapPropsToValues: () => ({
    name: '',
    jobNumber: '',
    customerReference: '',
    description: '',
    internalNotes: '',
  }),
  validationSchema: yup.object().shape({
    name: yup.object().required('Name is required!'),
    jobNumber: yup.string().required('Job Number is required!'),
    customerReference: yup.string().required('Customer Reference is required!'),
    description: yup.string(),
    internalNotes: yup.string(),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    props.onSubmit(values).then(() => {
      setSubmitting(false);
    });
  },
  displayName: 'RegisterForm', // helps with React DevTools
})(RegisterForm);
