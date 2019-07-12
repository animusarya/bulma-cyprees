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
        label="Email ID"
        placeholder=""
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.email && touched.email ? errors.email : undefined}
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
          { value: 'accepted', title: 'Accepted' },
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
  mapPropsToValues: () => ({
    name: '',
    email: '',
    status: '',
  }),
  validationSchema: yup.object().shape({
    name: yup.string().required('Name is required!'),
    email: yup.string().required('Email id is required!'),
    status: yup.string().required('Status is required!'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit(values);
    setSubmitting(false);
  },
  displayName: 'ProjectSetting', // helps with React DevTools
})(ProjectSetting);
