import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components';

import { InputGroup, Button } from './elements';
import theme from '../utils/theme';
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
      border-color: ${theme.primaryColor};
      box-shadow: none;
      :hover {
        border-color: ${theme.primaryColor};
      }
    }
    .columns {
      margin-top: 1.5rem;
    }
    .notify {
      display: inline-flex;
      font-size: 10px;
    }
  `;

  return (
    <Form onSubmit={handleSubmit}>
      <div className="columns">
        <div className="column">
          <Subtitle>Billing Address</Subtitle>
          <InputGroup
            fullWidth
            isWidth
            border
            placeholder="Country"
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
            placeholder="Address Line 1*"
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
            placeholder="Address Line 2"
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
            placeholder="City*"
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
            placeholder="State"
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
            placeholder="Postcode"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.name && touched.name ? errors.name : undefined}
          />
          <Subtitle>Payment Method</Subtitle>
          <InputGroup
            fullWidth
            isWidth
            border
            placeholder="Name on card"
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
            placeholder="Credit Card Number"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.name && touched.name ? errors.name : undefined}
          />
          <div className="columns">
            <div className="column">
              <InputGroup
                fullWidth
                isWidth
                border
                placeholder="Expiry Month"
                name="name"
                type="text"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.name && touched.name ? errors.name : undefined}
              />
            </div>
            <div className="column">
              <InputGroup
                fullWidth
                isWidth
                border
                placeholder="CVC"
                name="name"
                type="text"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.name && touched.name ? errors.name : undefined}
              />
            </div>
          </div>
        </div>
        <div className="column">
          <Subtitle>Project Summary</Subtitle>
          <InputGroup
            fullWidth
            isWidth
            border
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
            label="Project Plan"
            placeholder="Monthly | £30 | 6Months (£180) | Annually (£360)"
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
            label="Do you have a discount code?"
            placeholder="1S50"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.name && touched.name ? errors.name : undefined}
          />
          <div className="columns">
            <div className="column">
              <Subtitle>Amount due today</Subtitle>
            </div>
            <div className="column">
              <p className="is-size-3 is-pulled-right has-text-weight-bold">
                £30
              </p>
            </div>
          </div>
          <div className="field">
            <div className="is-pulled-right">
              <Button disabled={isSubmitting}>Make Payment</Button>
            </div>
          </div>
          <div className="notify">
            <p>
              <strong>Source checkout</strong> For your convenience intellishare
              will store your encrypted payment for your future orders. Manage
              your payment information in My Account
            </p>
          </div>
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
