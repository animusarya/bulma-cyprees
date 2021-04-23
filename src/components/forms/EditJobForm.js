import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import {
  InputGroup,
  Button,
  TextArea,
  Select,
  Dropzone,
  NameSelectInput,
  SignaturePad,
} from '../elements';
import RiskAssessment from './RiskAssessment';
import { DueDateBox } from '../jobs';

const companyList = [
  { value: 'Company One' },
  { value: 'Company Two' },
  { value: 'Company Three' },
  { value: 'Company Four' },
];

const allNames = [
  { name: 'Dharmveer' },
  { name: 'Karanbir' },
  { name: 'Kunal' },
  { name: 'Vishal' },
  { name: 'Taniya' },
];

const statusType = [
  { value: 'Open' },
  { value: 'Closed' },
  { value: 'Archived' },
];

const EditJobForm = (props) => {
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

      <Dropzone label="Before Picture" />
      <RiskAssessment onChange={(val) => console.log(val)} />
      <Dropzone label="Job File Upload" />

      <NameSelectInput
        name="name"
        value={values.name}
        onBlur={handleBlur}
        // onChange={(value) => setFieldValue('name', value)}
        label="Job Assigned to"
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

      <Dropzone label="After Pictures" />

      <SignaturePad label="Signature" />
      <InputGroup
        label="Signed By"
        name="signedBy"
        type="text"
        value={values.signedBy}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.signedBy && touched.signedBy ? errors.signedBy : undefined
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
      <label className="label">Revisit Required</label>
      <div className="control">
        <label className="radio has-text-black">
          <input
            className="mr-2"
            type="radio"
            name="required"
            value="yes"
            checked={values.revisitRequired === 'yes'}
            onChange={handleChange}
          />
          Yes
        </label>
        <label className="radio has-text-black">
          <input
            className="mr-2"
            type="radio"
            name="required"
            value="no"
            checked={values.revisitRequired === 'no'}
            onChange={handleChange}
          />
          No
        </label>
      </div>
      <Select
        label="Status"
        name="status"
        options={statusType}
        type="text"
        value={values.status}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.status && touched.status ? errors.status : undefined}
      />
      <DueDateBox />

      <div className="mb-3 mt-5">
        <Button primary type="submit" disabled={isSubmitting}>
          <span className="has-text-weight-bold">Submit</span>
        </Button>
      </div>
    </form>
  );
};

EditJobForm.propTypes = {
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
    address: '',
    paymentTerms: '',
    signedBy: '',
    revisitRequired: 'no',
  }),
  validationSchema: yup.object().shape({
    jobNumber: yup.string().required('Job Number is required!'),
    customerReference: yup.string(),
    description: yup.string(),
    address: yup.string().required('Address is required!'),
    paymentTerms: yup.string().required('Payment Terms is required!'),
    signedBy: yup.string().required('Signed By is required!'),
    internalNotes: yup.string(),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    props.onSubmit(values).then(() => {
      setSubmitting(false);
    });
  },
  displayName: 'EditJobForm', // helps with React DevTools
})(EditJobForm);
