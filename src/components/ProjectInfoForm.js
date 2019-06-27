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
      {/* <InputGroup
        isHorizontal
        label="Default URL"
        placeholder="intellishare.online/colliers"
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.name && touched.name ? errors.name : undefined} /> */}
      <InputGroup
        isHorizontal
        label="Custom URL"
        placeholder="www.colliers.co.uk/arden"
        name="code"
        value={values.code}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.code && touched.code ? errors.code : undefined} />
      {/* <InputGroup
        isHorizontal
        label="Project Size"
        placeholder="5GB"
        name="percentage"
        value={values.percentage}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.percentage && touched.percentage ? errors.percentage : undefined} /> */}
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
    name: '',
    code: '',
    percentage: '',
  }),
  validationSchema: yup.object().shape({
    name: yup.string().required('Name is required!'),
    code: yup.string().required('Custom Domain is required!'),
    percentage: yup.string().required('Percentage is required!'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit(values).finally(() => {
      setSubmitting(false);
    });
  },
  displayName: 'ProjectInfoForm', // helps with React DevTools
})(ProjectInfoForm);
