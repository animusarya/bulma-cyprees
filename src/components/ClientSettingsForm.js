import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { InputGroup, Button } from './elements';

const ClientSettingsForm = props => {
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
        label="Email:"
        name="email"
        placeholder="john@doe.com"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.email && touched.email ? errors.email : undefined}
      />
      <InputGroup
        fullWidth
        isWidth
        border
        isHorizontal
        label="Full Name:"
        name="fullName"
        type="text"
        placeholder=""
        value={values.fullName}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.fullName && touched.fullName ? errors.fullName : undefined
        }
      />
      <InputGroup
        fullWidth
        isWidth
        border
        isHorizontal
        label="Telephone:"
        name="telephone"
        placeholder=""
        value={values.telephone}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.telephone && touched.telephone ? errors.telephone : undefined
        }
      />
      <div className="field">
        <div className="control is-pulled-right">
          <Button disabled={isSubmitting}>Update</Button>
        </div>
      </div>
    </form>
  );
};

ClientSettingsForm.propTypes = {
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
    email: initialValues.email || '',
    fullName: initialValues.profile ? initialValues.profile.fullName : '',
    telephone: initialValues.profile ? initialValues.profile.telephone : '',
  }),
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email is required!'),
    fullName: yup.string().required('Full Name is required!'),
    telephone: yup.string().required('Telephone is required!'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit(values);
    setSubmitting(false);
  },
  displayName: 'ClientSettingsForm', // helps with React DevTools
})(ClientSettingsForm);