import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { InputGroup, Button } from './elements';

const HelpForm = props => {
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
        isWidth
        fullWidth
        border
        isHorizontal
        name="name"
        label="Title"
        placeholder="Monthly/Bi-Annually/Annually"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.name && touched.name ? errors.name : undefined}
      />
      <InputGroup
        isWidth
        fullWidth
        border
        isHorizontal
        name="embedCode"
        label="Embed Code"
        placeholder="Paste YouTube Video Link Here"
        value={values.embedCode}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.embedCode && touched.embedCode ? errors.embedCode : undefined
        }
      />
      <div className="field">
        <div className="is-pulled-right">
          <Button disabled={isSubmitting}>Submit</Button>
        </div>
      </div>
    </form>
  );
};

HelpForm.propTypes = {
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
    embedCode: '',
  }),
  validationSchema: yup.object().shape({
    name: yup.string().required('Duration is required!'),
    embedCode: yup.string().required('Embed Code is required!'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit(values);
    setSubmitting(false);
  },
  displayName: 'HelpForm', // helps with React DevTools
})(HelpForm);
