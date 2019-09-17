import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';
import Cleave from 'cleave.js/react';

import { InputGroup, Button, TextAreaGroup } from './elements';

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
        label="Project URL Slug"
        errors={errors.slug && touched.slug ? errors.slug : undefined}>
        <Cleave
          placeholder="colliers"
          name="slug"
          id="slug"
          value={values.slug}
          onChange={handleChange}
          onBlur={handleBlur}
          options={{ prefix: 'intellishare.com/' }}
          className="input is-shadowless"
        />
      </InputGroup>
      <InputGroup
        fullWidth
        isWidth
        border
        isHorizontal
        label="Custom Domain"
        placeholder="www.projectname.co.uk"
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
      <TextAreaGroup
        fullWidth
        isWidth
        border
        isHorizontal
        label="Disclaimer"
        name="disclaimer"
        className="textarea"
        value={values.disclaimer}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.disclaimer && touched.disclaimer
            ? errors.disclaimer
            : undefined
        }
      />
      <TextAreaGroup
        fullWidth
        isWidth
        border
        isHorizontal
        label="Non-Disclosure Agreement"
        name="nda"
        className="textarea"
        value={values.nda}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.nda && touched.nda ? errors.nda : undefined}
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
    customDomain: initialValues.customDomain || '',
    disclaimer: initialValues.disclaimer || '',
    nda: initialValues.nda || '',
  }),
  validationSchema: yup.object().shape({
    name: yup.string().required('Name is required!'),
    slug: yup.string().required('slug is required!'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit(values);
    setSubmitting(false);
  },
  displayName: 'ProjectSetting', // helps with React DevTools
})(ProjectSetting);
