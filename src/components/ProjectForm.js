import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { InputGroup, Button, SelectGroup } from './elements';

const ProjectForm = props => {
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
        isWidth
        fullWidth
        border
        isHorizontal
        label="Project Name"
        placeholder="Colliers"
        name="slug"
        value={values.slug}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.slug && touched.slug ? errors.slug : undefined}
      />
      <SelectGroup
        isHorizontal
        fullWidth
        isWidth
        border
        label="Page Type"
        placeholder=""
        name="type"
        value={values.type}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.type && touched.type ? errors.type : undefined}
        options={[
          { value: 'dataroom', title: 'Dataroom' },
          { value: 'content', title: 'Content' },
        ]}
      />
      <InputGroup
        isWidth
        fullWidth
        border
        isHorizontal
        label="Default URL"
        placeholder="intellishare.online/colliers"
        name="slug"
        value={values.slug}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.slug && touched.slug ? errors.slug : undefined}
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

ProjectForm.propTypes = {
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
    customDomain: yup.string().required('Custom URL is required!'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit(values).finally(() => {
      setSubmitting(false);
    });
  },
  displayName: 'ProjectForm', // helps with React DevTools
})(ProjectForm);
