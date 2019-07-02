import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { InputGroup, Button } from './elements';

const ClientWelcomeEmailForm = props => {
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
        label="Discount Name"
        placeholder="Welcome to Project Arden"
        name="subject"
        value={values.subject}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.subject && touched.subject ? errors.subject : undefined}
      />
      <InputGroup
        fullWidth
        isWidth
        border
        isHorizontal
        label="Email message"
        placeholder="Please complete your access to this Dataroom by clicking the link below"
        name="message"
        className="textarea"
        value={values.message}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.message && touched.message ? errors.message : undefined}
      />
      <div className="field">
        <div className="is-pulled-right">
          <Button disabled={isSubmitting}>Update Template</Button>
        </div>
      </div>
    </form>
  );
};

ClientWelcomeEmailForm.propTypes = {
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
    subject: '',
    message: '',
  }),
  validationSchema: yup.object().shape({
    subject: yup.string().required('Subject is required!'),
    message: yup.string().required('Message is required!'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit(values).finally(() => {
      setSubmitting(false);
    });
  },
  displayName: 'ClientWelcomeEmailForm', // helps with React DevTools
})(ClientWelcomeEmailForm);
