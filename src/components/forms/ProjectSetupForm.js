import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components';

import { InputGroup, Button, SelectGroup } from '../elements';
import { formatCurrency } from '../../utils/helpers';

const Form = styled.form`
  input {
    /* border-color: ${(propsInput) => propsInput.theme.primaryColor}; */
    box-shadow: none;
    :hover {
      /* border-color: ${(propsInput) => propsInput.theme.primaryColor}; */
    }
  }
  .columns {
    margin-top: 1.5rem;
  }
`;

// const infoIcon = <i className="fas fa-info-circle" />;

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
    me,
  } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup
        fullWidth
        isWidth
        border
        label="Website Name"
        placeholder="My Website"
        name="name"
        type="text"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.name && touched.name ? errors.name : undefined}
      />
      <InputGroup
        fullWidth
        border
        type="text"
        label="Domain"
        placeholder="www.reviewourservices.co.uk"
        name="customDomain"
        value={me}
        disabled
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
        label="Select Plan"
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
    subscriptionPlanId: '',
  }),
  validationSchema: yup.object().shape({
    name: yup.string().required('Name is required!'),
    subscriptionPlanId: yup.string().required('Subscription is required!'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit(values);
    setSubmitting(false);
  },
  displayName: 'ProjectSetupForm', // helps with React DevTools
})(ProjectSetupForm);
