import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

const ManageAdminClientForm = props => {
  const {
    values,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;

  return (
    <form onSubmit={handleSubmit} className="is-flex">
      <div className="field has-addons">
        <div className="control">
          <input
            className="input"
            type="text"
            name="email"
            label="Client Email"
            placeholder="john@doe.com"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="control">
          <button
            type="submit"
            className="button is-info"
            disabled={isSubmitting}>
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

ManageAdminClientForm.propTypes = {
  values: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default withFormik({
  mapPropsToValues: () => ({
    email: '',
  }),
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email is required!'),
  }),
  handleSubmit: (values, { setSubmitting, resetForm, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit(values).finally(() => {
      setSubmitting(false);
      resetForm();
    });
  },
  displayName: 'ManageAdminClientForm', // helps with React DevTools
})(ManageAdminClientForm);
