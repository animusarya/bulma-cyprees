import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components';
import { InputGroup, Button } from './elements';

const Buttonstyled = styled(Button)`
  margin-top: 24px;
  margin-left: 10px;
`;

const ManageAdminClientForm = props => {
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
    <form onSubmit={handleSubmit} className="is-flex">
      <div className="field">
        <div className="control">
          <InputGroup
            border
            className="input"
            name="email"
            label="Client Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email && (
            <p className="help is-danger">{errors.email}</p>
          )}
        </div>
      </div>
      <div className="field">
        <div className="control">
          <Buttonstyled type="submit" className="button" disabled={isSubmitting}>
            <i className="fas fa-plus"></i>
          </Buttonstyled>
        </div>
      </div>
    </form>
  );
};

ManageAdminClientForm.propTypes = {
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
    email: '',
  }),
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email is required!'),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.addContact(values);
    setSubmitting(false);
  },
  displayName: 'ManageAdminClientForm', // helps with React DevTools
})(ManageAdminClientForm);
