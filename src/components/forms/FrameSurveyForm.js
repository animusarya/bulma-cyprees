import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import {
  InputGroup,
  Button,
  TextArea,
  Dropzone,
  SignaturePad,
  Select,
} from '../elements';

const frameTypeList = [
  { value: 'Open' },
  { value: 'Closed' },
  { value: 'Archived' },
];

const FrameSurveyForm = (props) => {
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
        placeholder="Select..."
        label="Frame Type"
        name="frameTypes"
        options={frameTypeList}
        type="text"
        value={values.frameTypes}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.frameTypes && touched.frameTypes
            ? errors.frameTypes
            : undefined
        }
      />

      <InputGroup
        placeholder="Frame Color"
        label="Frame Colour"
        name="frameColor"
        type="text"
        value={values.frameColor}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.frameColor && touched.frameColor
            ? errors.frameColor
            : undefined
        }
      />
      <InputGroup
        placeholder="Transom Drop Information"
        label="Transom Drop"
        name="transomDrop"
        type="text"
        value={values.transomDrop}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.transomDrop && touched.transomDrop
            ? errors.transomDrop
            : undefined
        }
      />
      <InputGroup
        placeholder="Mullion Split Information"
        label="Mullion Split"
        name="mullionSplit"
        type="text"
        value={values.mullionSplit}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.mullionSplit && touched.mullionSplit
            ? errors.mullionSplit
            : undefined
        }
      />
      <InputGroup
        placeholder="Enter Midrail Height"
        label="Midrail Height"
        name="midrailHeight"
        type="text"
        value={values.midrailHeight}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.midrailHeight && touched.midrailHeight
            ? errors.midrailHeight
            : undefined
        }
      />

      <Dropzone label="Upload Picture" />
      <SignaturePad label="Signature" />
      <InputGroup
        label="Other Details"
        name="otherDetails"
        type="text"
        value={values.otherDetails}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.otherDetails && touched.otherDetails
            ? errors.otherDetails
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

      <div className="mb-3 mt-5">
        <Button primary type="submit" disabled={isSubmitting}>
          <span className="has-text-weight-bold">Submit</span>
        </Button>
      </div>
    </form>
  );
};

FrameSurveyForm.propTypes = {
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
    frameTypes: '',
    frameColor: '',
    otherDetails: '',
    transomDrop: '',
    mullionSplit: '',
    midrailHeight: '',
    internalNotes: '',
  }),
  validationSchema: yup.object().shape({
    frameTypes: yup.string().required('Frame Type is required!'),
    frameColor: yup.string().required('Frame Color is required!'),
    transomDrop: yup.string().required('Transom Drop is required!'),
    mullionSplit: yup.string().required('Mullion Split is required!'),
    midrailHeight: yup.string().required('Midrail Height is required!'),
    otherDetails: yup.string(),
    internalNotes: yup.string(),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    props.onSubmit(values).then(() => {
      setSubmitting(false);
    });
  },
  displayName: 'FrameSurveyForm', // helps with React DevTools
})(FrameSurveyForm);
