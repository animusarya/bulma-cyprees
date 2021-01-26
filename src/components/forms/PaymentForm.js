/* eslint-disable eqeqeq */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components';
import Cleave from 'cleave.js/react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

import { InputGroup, Button, SelectGroup, Subtitle } from '../elements';
import theme from '../../utils/theme';
import stripe from '../../assets/images/Secure-by-Stripe.png';

const Form = styled.form`
  input {
    border-color: ${theme.primaryColor};
    box-shadow: none;
    :hover {
      border-color: ${theme.primaryColor};
    }
  }
  .columns {
    margin-top: -0.5rem;
  }
  .notify {
    display: inline-flex;
    font-size: 10px;
  }
  .button {
    border-radius: 0 !important;
  }
  .field.is-grouped {
    align-items: flex-end;
  }
`;

const CvvContainer = styled.div`
  margin-top: -8px;
`;

const ButtonContainer = styled.div`
  display: grid;
  justify-content: flex-end;
`;

const countries = [
  {
    key: 1,
    title: 'United Kingdom',
    value: 'united-kingdom',
  },
];

const discountQuery = gql`
  query discounts {
    discounts {
      id
      name
      percentage
      code
      status
    }
  }
`;

const PaymentForm = (props) => {
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

  const [couponCode, setCouponCode] = useState(false);
  const [subscriptionPrice, setSubscriptionPrice] = useState(
    subscription.price,
  );
  const { data } = useQuery(discountQuery, {
    fetchPolicy: 'cache-and-network',
  });
  const couponCodes = data && data.discounts ? data.discounts : [];

  // eslint-disable-next-line consistent-return
  const applyCoupon = () => {
    if (!couponCode) {
      return null;
    }
    let discountPercentage = 0;
    // eslint-disable-next-line array-callback-return
    couponCodes.map((item) => {
      // eslint-disable-next-line eqeqeq
      if (item.code == couponCode) {
        discountPercentage = item.percentage;
      }
    });

    if (discountPercentage !== 0) {
      const price = (subscription.price * discountPercentage) / 100;
      setSubscriptionPrice(subscription.price - price);
    } else {
      setCouponCode('invalid');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="columns">
        <div className="column">
          <Subtitle>Billing Address</Subtitle>
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
            placeholder="County"
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
          <SelectGroup
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
            options={countries}
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
            errors={
              errors.paymentCardNumber && touched.paymentCardNumber
                ? errors.paymentCardNumber
                : undefined
            }>
            <Cleave
              placeholder="4242 4242 4242 4242"
              name="paymentCardNumber"
              id="paymentCardNumber"
              value={values.paymentCardNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              options={{ creditCard: true }}
              className="input is-shadowless"
            />
          </InputGroup>
          <div className="columns">
            <div className="column">
              <InputGroup
                fullWidth
                isWidth
                border
                errors={
                  errors.paymentCardExpiryMonth &&
                  touched.paymentCardExpiryMonth
                    ? errors.paymentCardExpiryMonth
                    : undefined
                }>
                <Cleave
                  placeholder="12"
                  name="paymentCardExpiryMonth"
                  id="paymentCardExpiryMonth"
                  value={values.paymentCardExpiryMonth}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  options={{ date: true, datePattern: ['m'] }}
                  className="input is-shadowless"
                />
              </InputGroup>
            </div>
            <div className="column">
              <InputGroup
                fullWidth
                isWidth
                border
                errors={
                  errors.paymentCardExpiryYear && touched.paymentCardExpiryYear
                    ? errors.paymentCardExpiryYear
                    : undefined
                }>
                <Cleave
                  placeholder="2022"
                  name="paymentCardExpiryYear"
                  id="paymentCardExpiryYear"
                  value={values.paymentCardExpiryYear}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  options={{ date: true, datePattern: ['Y'] }}
                  className="input is-shadowless"
                />
              </InputGroup>
            </div>
          </div>
          <CvvContainer>
            <InputGroup
              type="number"
              maxLength={3}
              fullWidth
              isWidth
              border
              errors={
                errors.paymentCardCvv && touched.paymentCardCvv
                  ? errors.paymentCardCvv
                  : undefined
              }>
              <Cleave
                placeholder="123"
                name="paymentCardCvv"
                id="paymentCardCvv"
                value={values.paymentCardCvv}
                onChange={handleChange}
                onBlur={handleBlur}
                options={{ numeral: true }}
                className="input is-shadowless"
              />
            </InputGroup>
          </CvvContainer>
        </div>
        <div className="column">
          <Subtitle>Website Name</Subtitle>
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
            label="Payment Plan"
            placeholder="Monthly | £30 | 6Months (£180) | Annually (£360)"
            name="projectPlan"
            type="text"
            value={subscription.name}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              errors.projectPlan && touched.projectPlan
                ? errors.projectPlan
                : undefined
            }
          />
          <div className="field is-grouped">
            <div className="control is-expanded">
              <InputGroup
                fullWidth
                border
                placeholder="Enter Discount code"
                label="Discount Code"
                name="discount"
                type="text"
                onChange={(e) => setCouponCode(e.target.value)}
                onBlur={handleBlur}
              />
            </div>
            <p className="control">
              <button
                type="button"
                className="button is-primary has-text-weight-bold"
                onClick={applyCoupon}>
                Apply
              </button>
            </p>
          </div>
          {couponCode == 'invalid' && (
            <p className="has-text-danger">Coupon code is invalid</p>
          )}
          <div className="columns">
            <div className="column">
              <Subtitle>Amount due today</Subtitle>
            </div>
            <div className="column">
              <p className="is-size-3 is-pulled-right has-text-weight-bold">
                £{subscriptionPrice}
              </p>
            </div>
          </div>
          <ButtonContainer className="field">
            <div className="is-pulled-right">
              <Button disabled={isSubmitting} fontWeight="bold">
                Make Payment
              </Button>
            </div>
            <div>
              <img src={stripe} alt="Payment Secured by Stripe" width="180px" />
            </div>
          </ButtonContainer>
        </div>
      </div>
    </Form>
  );
};

PaymentForm.propTypes = {
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
    postcode: yup.string().required('Post Code is required!'),
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
    props.onSubmit(values).then(() => {
      setSubmitting(false);
    });
  },
  displayName: 'PaymentForm', // helps with React DevTools
})(PaymentForm);
