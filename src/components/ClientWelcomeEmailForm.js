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
const ClientWelcomeEmailForm = (props) => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    project,
  } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup
        fullWidth
        isWidth
        border
        isHorizontal
        label="Subject of email"
        placeholder={`Welcome to ${project.name}`}
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
        placeholder="Please complete your access to this Dataroom by clicking the link below"
        name="body"
        className="textarea"
        value={values.body}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.body && touched.body ? errors.body : undefined}
      />
      <div className="button-field">
        <div className="">
          <Button disabled={isSubmitting}>Update Template</Button>
        </div>
      </div>
    </Form>
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
  mapPropsToValues: ({ initialValues }) => ({
    subject: initialValues.welcomeEmailTemplate
      ? initialValues.welcomeEmailTemplate.subject
      : '',
    body: initialValues.welcomeEmailTemplate
      ? initialValues.welcomeEmailTemplate.body
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
  displayName: 'ClientWelcomeEmailForm', // helps with React DevTools
})(ClientWelcomeEmailForm);
