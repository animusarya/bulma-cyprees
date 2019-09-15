import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components';

import { InputGroup, Button } from './elements';
import theme from '../utils/theme';
import Subtitle from './elements/Subtitle';

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

const ProjectSetupForm = props => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    subscription,
  } = props;

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
            name="country"
            type="text"
            value={values.country}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              errors.country && touched.country ? errors.country : undefined
            }
          />
          <InputGroup
            fullWidth
            isWidth
            border
            placeholder="Address Line 1"
            name="addressLine1"
            type="text"
            value={values.addressLine1}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              errors.addressLine1 && touched.addressLine1
                ? errors.addressLine1
                : undefined
            }
          />
          <InputGroup
            fullWidth
            isWidth
            border
            placeholder="Address Line 2"
            name="addressLine2"
            type="text"
            value={values.addressLine2}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              errors.addressLine2 && touched.addressLine2
                ? errors.addressLine2
                : undefined
            }
          />
          <InputGroup
            fullWidth
            isWidth
            border
            placeholder="City"
            name="city"
            type="text"
            value={values.city}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.city && touched.city ? errors.city : undefined}
          />
          <InputGroup
            fullWidth
            isWidth
            border
            placeholder="State"
            name="state"
            type="text"
            value={values.state}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.state && touched.state ? errors.state : undefined}
          />
          <InputGroup
            fullWidth
            isWidth
            border
            placeholder="Postcode"
            name="postcode"
            type="text"
            value={values.postcode}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              errors.postcode && touched.postcode ? errors.postcode : undefined
            }
          />
          <Subtitle>Payment Info</Subtitle>
          <InputGroup
            fullWidth
            isWidth
            border
            placeholder="Name on card"
            name="paymentCardName"
            value={values.paymentCardName}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              errors.paymentCardName && touched.paymentCardName
                ? errors.paymentCardName
                : undefined
            }
          />
          <InputGroup
            fullWidth
            isWidth
            border
            placeholder="Credit Card Number"
            name="paymentCardNumber"
            type="number"
            maxLength={12}
            value={values.paymentCardNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              errors.paymentCardNumber && touched.paymentCardNumber
                ? errors.paymentCardNumber
                : undefined
            }
          />
          <div className="columns">
            <div className="column">
              <InputGroup
                fullWidth
                isWidth
                border
                placeholder="Expiry Month"
                name="paymentCardExpiryMonth"
                type="number"
                maxLength={2}
                value={values.paymentCardExpiryMonth}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={
                  errors.paymentCardExpiryMonth &&
                  touched.paymentCardExpiryMonth
                    ? errors.paymentCardExpiryMonth
                    : undefined
                }
              />
              <InputGroup
                type="number"
                maxLength={3}
                fullWidth
                isWidth
                border
                placeholder="CVV"
                name="paymentCardCvv"
                value={values.paymentCardCvv}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={
                  errors.paymentCardCvv && touched.paymentCardCvv
                    ? errors.paymentCardCvv
                    : undefined
                }
              />
            </div>
            <div className="column">
              <InputGroup
                fullWidth
                isWidth
                border
                placeholder="Expiry Year"
                name="paymentCardExpiryYear"
                type="number"
                maxLength={4}
                value={values.paymentCardExpiryYear}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={
                  errors.paymentCardExpiryYear && touched.paymentCardExpiryYear
                    ? errors.paymentCardExpiryYear
                    : undefined
                }
              />
            </div>
          </div>
        </div>
        <div className="column">
          <Subtitle>Project Summary</Subtitle>
          <InputGroup
            readOnly
            fullWidth
            isWidth
            border
            placeholder="Project Arden"
            name="projectName"
            type="text"
            value={values.projectName}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              errors.projectName && touched.projectName
                ? errors.projectName
                : undefined
            }
          />
          <InputGroup
            readOnly
            fullWidth
            isWidth
            border
            label="Project Plan"
            placeholder="Monthly | £30 | 6Months (£180) | Annually (£360)"
            name="projectPlan"
            type="text"
            value={values.projectPlan}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              errors.projectPlan && touched.projectPlan
                ? errors.projectPlan
                : undefined
            }
          />
          <InputGroup
            fullWidth
            border
            label="Do you have a discount code?"
            name="discount"
            type="text"
            value={values.discount}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className="columns">
            <div className="column">
              <Subtitle>Amount due today</Subtitle>
            </div>
            <div className="column">
              <p className="is-size-3 is-pulled-right has-text-weight-bold">
                £{subscription.price}
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
  mapPropsToValues: ({ initialValues }) => ({
    country: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postcode: '',
    paymentCardName: '',
    paymentCardNumber: '',
    paymentCardExpiryMonth: '',
    paymentCardExpiryYear: '',
    paymentCardCvv: '',
    projectName: initialValues.name || '',
    projectPlan: '',
  }),
  validationSchema: yup.object().shape({
    country: yup.string().required('Country is required!'),
    addressLine1: yup.string().required('Address is required!'),
    city: yup.string().required('City is required!'),
    state: yup.string().required('State is required!'),
    postcode: yup.number().required('Post Code is required!'),
    paymentCardName: yup.string().required('Card Name is required!'),
    paymentCardNumber: yup.number().required('Card Number is required!'),
    paymentCardExpiryMonth: yup
      .number()
      .required('Card Expiry Month is required!'),
    paymentCardExpiryYear: yup
      .number()
      .required('Card Expiry Year is required!'),
    paymentCardCvv: yup.number().required('Card CVV is required!'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit(values).finally(() => {
      setSubmitting(false);
    });
  },
  displayName: 'ProjectSetupForm', // helps with React DevTools
})(ProjectSetupForm);
