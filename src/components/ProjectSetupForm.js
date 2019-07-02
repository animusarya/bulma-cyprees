import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components';

import { InputGroup, Button } from './elements';
import Subtitle from './elements/Subtitle';

const ProjectSetupForm = props => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;

  const Form = styled.form`
    input {
      border-color: ${props => props.theme.primaryColor};
      box-shadow: none;
      :hover {
        border-color: ${props => props.theme.primaryColor};
      }
    }
    .columns {
      margin-top: 1.5rem;
    }
  `;

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup
        fullWidth
        isWidth
        border
        label="Project Name"
        placeholder="Project Arden"
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
        label="Default URL"
        name="defaultUrl"
        value={values.defaultUrl}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.defaultUrl && touched.defaultUrl
            ? errors.defaultUrl
            : undefined
        }
      />
      <InputGroup
        fullWidth
        border
        type="text"
        label="Custom Domain Name"
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
      {/* later on this field will be replaced with select field */}
      <InputGroup
        fullWidth
        isWidth
        border
        label="Project Plan"
        placeholder="Monthly | £30 | 6Months (£180) | Annually (£360)"
        name="percentage"
        value={values.percentage}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.percentage && touched.percentage
            ? errors.percentage
            : undefined
        }
      />
      <div className="columns">
        <div className="column">
          <Subtitle>Amount due today</Subtitle>
        </div>
        <div className="column">
          <p className="is-size-3 is-pulled-right has-text-weight-bold">£30</p>
        </div>
      </div>
      <div className="field">
        <div className="is-pulled-right">
          <Button disabled={isSubmitting}>Continue</Button>
        </div>
      </div>
    </Form>
  );
};

ProjectSetupForm.propTypes = {
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
    defaultUrl: '',
    customUrl: '',
    plan: '',
  }),
  validationSchema: yup.object().shape({
    name: yup.string().required('Name is required!'),
    defaultUrl: yup.string().required('Default URL is required!'),
    customUrl: yup.string().required('Custom URL is required!'),
    plan: yup.string().required('This field is required!'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit(values).finally(() => {
      setSubmitting(false);
    });
  },
  displayName: 'ProjectSetupForm', // helps with React DevTools
})(ProjectSetupForm);
