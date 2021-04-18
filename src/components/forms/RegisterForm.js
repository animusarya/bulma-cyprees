import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import {
  InputGroup,
  Button,
  Select,
  TextArea,
  NameSelectInput,
} from '../elements';

const allNames = [
  { name: 'Dharmveer' },
  { name: 'Karanbir' },
  { name: 'Kunal' },
  { name: 'Vishal' },
  { name: 'Taniya' },
];

const siteList = [
  { id: 2, siteName: 'Norton canes' },
  { id: 3, siteName: 'Autosmart International Ltd  -  Lichfield' },
];

const jobAssignList = [
  { id: 2, value: 'AaronBowli' },
  { id: 3, value: 'AaronDrury' },
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
          allNames
            ? allNames.map((item) => ({
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
      <Select
        placeholder="Select..."
        label="Job Assigned to"
        name="jobAssignedTo"
        options={jobAssignList}
        type="text"
        value={values.jobAssignedTo}
        onChange={handleChange}
        onBlur={handleBlur}
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
    jobNumber: '',
    customerReference: '',
    description: '',
    internalNotes: '',
    jobAssignedTo: '',
  }),
  validationSchema: yup.object().shape({
    jobNumber: yup.string().required('Job Number is required!'),
    customerReference: yup.string().required('Customer Reference is required!'),
    description: yup.string(),
    internalNotes: yup.string(),
    jobAssignedTo: yup.string(),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    props.onSubmit(values).then(() => {
      setSubmitting(false);
    });
  },
  displayName: 'RegisterForm', // helps with React DevTools
})(RegisterForm);
