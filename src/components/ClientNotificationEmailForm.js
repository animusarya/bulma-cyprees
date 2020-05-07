import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { InputGroup, Button, TextAreaGroup } from './elements';

const Form = styled.form`
  .button-field {
    display: flex;
    justify-content: flex-end;
  }
`;
const ClientNotificationEmailForm = props => {
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
    <Form onSubmit={handleSubmit}>
      <InputGroup
        fullWidth
        isWidth
        border
        isHorizontal
        label="Subject of email"
        placeholder="Project Arden Notification"
        name="subject"
        value={values.subject}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.subject && touched.subject ? errors.subject : undefined}
      />
      <TextAreaGroup
        fullWidth
        isWidth
        border
        isHorizontal
        label="Email message"
        name="body"
        className="textarea"
        value={values.body}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.body && touched.body ? errors.body : undefined}
      />
      <div className="button-field">
        <div className="">
          <Button disabled={isSubmitting}>Notify All Clients</Button>
        </div>
      </div>
    </Form>
  );
};

ClientNotificationEmailForm.propTypes = {
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
    subject: initialValues.clientEmailTemplate
      ? initialValues.clientEmailTemplate.subject
      : '',
    body: initialValues.clientEmailTemplate
      ? initialValues.clientEmailTemplate.body
      : '',
  }),
  validationSchema: yup.object().shape({
    subject: yup.string().required('Subject is required!'),
    body: yup.string().required('Message is required!'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit(values).finally(() => {
      setSubmitting(false);
    });
  },
  displayName: 'ClientNotificationEmailForm', // helps with React DevTools
})(ClientNotificationEmailForm);
