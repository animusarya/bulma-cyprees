import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { InputGroup, Button } from './elements';

const ProjectInfoForm = props => {
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
        label="Default URL"
        placeholder="intellishare.online/colliers"
        name="defaultDomain"
        value={values.defaultDomain}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.defaultDomain && touched.defaultDomain
            ? errors.defaultDomain
            : undefined
        }
      />
      <InputGroup
        isWidth
        fullWidth
        border
        isHorizontal
        label="Custom URL"
        placeholder="www.colliers.co.uk/arden"
        name="customDomain"
        value={values.customDomain}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.customDomain && touched.customDomain
            ? errors.customDomain
            : undefined
        }
      />
      <InputGroup
        isWidth
        fullWidth
        border
        isHorizontal
        label="Project Size"
        placeholder="5GB"
        name="projectSize"
        value={values.projectSize}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.projectSize && touched.projectSize
            ? errors.projectSize
            : undefined
        }
      />
      <div className="field">
        <div className="is-pulled-right">
          <Button disabled={isSubmitting}>Save</Button>
        </div>
      </div>
    </form>
  );
};

ProjectInfoForm.propTypes = {
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
    defaultDomain: '',
    customDomain: '',
    percentage: '',
  }),
  validationSchema: yup.object().shape({
    defaultDomain: yup.string().required('Default URL is required!'),
    customDomain: yup.string().required('Custom URL is required!'),
    projectSize: yup.string().required('This field is required!'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit(values).finally(() => {
      setSubmitting(false);
    });
  },
  displayName: 'ProjectInfoForm', // helps with React DevTools
})(ProjectInfoForm);
