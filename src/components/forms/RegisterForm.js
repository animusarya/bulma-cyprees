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

const customerNameList = [
  { customerName: 'Kunal' },
  { customerName: 'Dharmveer' },
  { customerName: 'Taniya' },
  { customerName: 'Manisha' },
  { customerName: 'Saurav' },
  { customerName: 'Vishal' },
];

const siteList = [
  { id: 1, value: '--' },
  { id: 2, value: 'Norton canes' },
  { id: 3, value: 'Autosmart International Ltd  -  Lichfield' },
];

const jobAssignList = [
  { id: 1, value: '--' },
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
        label="Customer"
        name="customerName"
        value={values.customerName}
        onBlur={handleBlur}
        // onChange={(value) => setFieldValue('name', value)}
        options={
          customerNameList
            ? customerNameList.map((item) => ({
                value: item.customerName,
                label: item.customerName,
              }))
            : []
        }
        errors={
          errors.customerName && touched.customerName
            ? errors.customerName
            : undefined
        }
      />

      <Select
        label="Site"
        name="siteName"
        options={siteList}
        type="text"
        value={values.siteName}
        onChange={handleChange}
        onBlur={handleBlur}
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
    customerName: '',
    siteName: '',
    jobNumber: '',
    customerReference: '',
    description: '',
    internalNotes: '',
    jobAssignedTo: '',
  }),
  validationSchema: yup.object().shape({
    customerName: yup.string(),
    siteName: yup.string(),
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
