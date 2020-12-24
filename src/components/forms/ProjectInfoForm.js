import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';
import Cleave from 'cleave.js/react';

import { InputGroup, Button } from '../elements';

const ProjectInfoForm = (props) => {
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
        label="Project Name"
        placeholder="Colliers"
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.name && touched.name ? errors.name : undefined}
      />
      <InputGroup
        fullWidth
        isWidth
        border
        isHorizontal
        label="Website URL Slug"
        errors={errors.slug && touched.slug ? errors.slug : undefined}>
        <Cleave
          placeholder="colliers"
          name="slug"
          id="slug"
          value={values.slug}
          onChange={handleChange}
          onBlur={handleBlur}
          options={{ prefix: 'website-reviews.online/' }}
          className="input is-shadowless"
        />
      </InputGroup>
      <InputGroup
        isWidth
        fullWidth
        border
        isHorizontal
        label="Custom Domain Name"
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
        readOnly
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
  mapPropsToValues: ({ initialValues }) => ({
    name: initialValues.name || '',
    slug: initialValues.slug || '',
    customDomain: initialValues.customDomain || '',
    percentage: initialValues.percentage || '',
  }),
  validationSchema: yup.object().shape({
    name: yup.string().required('Name is required!'),
    slug: yup.string().required('Default URL is required!'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit(values).finally(() => {
      setSubmitting(false);
    });
  },
  displayName: 'ProjectInfoForm', // helps with React DevTools
})(ProjectInfoForm);
