import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { InputGroup, Button, SelectGroup } from './elements';

const ProjectSetting = props => {
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
        fullWidth
        isWidth
        border
        isHorizontal
        label="Project Name"
        placeholder=""
        name="name"
        type="text"
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
        label="Slug"
        placeholder=""
        name="slug"
        value={values.slug}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.slug && touched.slug ? errors.slug : undefined}
      />
      <InputGroup
        fullWidth
        isWidth
        border
        isHorizontal
        label="Custom Domain"
        placeholder=""
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
      <SelectGroup
        fullWidth
        isWidth
        border
        isHorizontal
        label="Status"
        placeholder=""
        name="status"
        value={values.status}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.status && touched.status ? errors.status : undefined}
        options={[
          { value: 'pending', title: 'Pending' },
          { value: 'active', title: 'Accepted' },
          { value: 'notActive', title: 'Not Active' },
          { value: 'canceled', title: 'Cancelled' },
        ]}
      />
      <div className="button-field is-pulled-right">
        <Button disabled={isSubmitting}>Update</Button>
      </div>
    </form>
  );
};

ProjectSetting.propTypes = {
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
    status: initialValues.status || '',
    customDomain: initialValues.customDomain || '',
  }),
  validationSchema: yup.object().shape({
    name: yup.string().required('Name is required!'),
    slug: yup.string().required('slug is required!'),
    status: yup.string().required('Status is required!'),
    customDomain: yup.string().required('Custom Domain is required!'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit(values);
    setSubmitting(false);
  },
  displayName: 'ProjectSetting', // helps with React DevTools
})(ProjectSetting);
