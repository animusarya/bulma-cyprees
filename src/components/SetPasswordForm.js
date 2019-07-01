import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { InputGroup, Button } from './elements';

const SetPasswordForm = props => {
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
        label="Password:"
        name="password"
        type="password"
        placeholder="*********"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.password && touched.password ? errors.password : undefined
        }
      />
      <InputGroup
        label="Repeat Password:"
        name="confirmPassword"
        type="password"
        placeholder="*********"
        value={values.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.confirmPassword && touched.confirmPassword
            ? errors.confirmPassword
            : undefined
        }
      />
      <div className="field">
        <div className="control">
          <Button disabled={isSubmitting}>Set Password</Button>
        </div>
      </div>
    </form>
  );
};

SetPasswordForm.propTypes = {
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
    password: '',
    confirmPassword: '',
  }),
  validationSchema: yup.object().shape({
    password: yup
      .string()
      .required('Password is required!')
      .min(2, 'Seems a bit short...'),
    confirmPassword: yup
      .string()
      .required('This filed is required!')
      .label('Confirm password')
      .test('passwords-match', 'Passwords not matched!', function (values) {
        return this.parent.password === values;
      }),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit(values).finally(() => {
      setSubmitting(false);
    });
  },
  displayName: 'SetPasswordForm', // helps with React DevTools
})(SetPasswordForm);
