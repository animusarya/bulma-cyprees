import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components';
import Cleave from 'cleave.js/react';

import { InputGroup, Button, SelectGroup } from './elements';
import { formatCurrency } from '../utils/helpers';

const Form = styled.form`
  input {
    border-color: ${(propsInput) => propsInput.theme.primaryColor};
    box-shadow: none;
    :hover {
      border-color: ${(propsInput) => propsInput.theme.primaryColor};
    }
  }
  .columns {
    margin-top: 1.5rem;
  }
`;

const infoIcon = <i className="fas fa-info-circle"></i>;

const ProjectSetupForm = (props) => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    packages,
  } = props;

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
        label="Project URL Slug"
        errors={errors.slug && touched.slug ? errors.slug : undefined}
      >
        <Cleave
          placeholder="colliers"
          name="slug"
          id="slug"
          value={values.slug}
          onChange={handleChange}
          onBlur={handleBlur}
          options={{ prefix: 'intellishare.online/' }}
          className="input is-shadowless"
        />
      </InputGroup>
      <InputGroup
        fullWidth
        border
        type="text"
        label="Custom Domain Name"
        infoIcon={infoIcon}
        iconLabel="Please contact us to help you with this"
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
      <SelectGroup
        fullWidth
        isWidth
        border
        label="Project Plan"
        name="subscriptionPlanId"
        value={values.subscriptionPlanId}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.subscriptionPlanId && touched.subscriptionPlanId
            ? errors.subscriptionPlanId
            : undefined
        }
        options={
          packages
            ? packages.map((item) => ({
                value: item.subscriptionPlanId,
                title: `${item.name} - ${formatCurrency(item.price)} per ${
                  item.durationInMonths
                } month`,
              }))
            : []
        }
      />
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
    slug: '',
    customDomain: '',
    subscriptionPlanId: '',
  }),
  validationSchema: yup.object().shape({
    name: yup.string().required('Name is required!'),
    slug: yup
      .string()
      .required('Default URL is required! e.g: intellishare.online/colliners'),
    customDomain: yup.string(),
    subscriptionPlanId: yup.string().required('Subscription is required!'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit(values);
    setSubmitting(false);
  },
  displayName: 'ProjectSetupForm', // helps with React DevTools
})(ProjectSetupForm);
