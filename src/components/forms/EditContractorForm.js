import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { InputGroup, Button } from '../elements';

const EditContractorForm = (props) => {
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
        label="User Name"
        name="userName"
        type="text"
        value={values.userName}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.userName && touched.userName ? errors.userName : undefined
        }
      />
      <InputGroup
        label="Address"
        name="address"
        type="text"
        value={values.address}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.address && touched.address ? errors.address : undefined}
      />
      <div className="mt-5">
        <Button primary type="submit" disabled={isSubmitting}>
          <span className="has-text-weight-bold">Submit</span>
        </Button>
      </div>
    </form>
  );
};

EditContractorForm.propTypes = {
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
    userName: '',
    address: '',
  }),
  validationSchema: yup.object().shape({
    userName: yup.string().required('Username is required!'),
    address: yup.string().required('Address is required!'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    props.onSubmit(values).then(() => {
      setSubmitting(false);
    });
  },
  displayName: 'EditContractorForm', // helps with React DevTools
})(EditContractorForm);
