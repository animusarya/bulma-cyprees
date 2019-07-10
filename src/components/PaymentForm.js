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
    subscription,
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
            name="address"
            type="text"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              errors.address && touched.address ? errors.address : undefined
            }
          />
          <InputGroup
            fullWidth
            isWidth
            border
            placeholder="Address Line 2"
            name="secondaryAddress"
            type="text"
            value={values.secondaryAddress}
            onChange={handleChange}
            onBlur={handleBlur}
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
          <Subtitle>Payment Method</Subtitle>
          <InputGroup
            fullWidth
            isWidth
            border
            placeholder="Name on card"
            name="cardName"
            type="text"
            value={values.cardName}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              errors.cardName && touched.cardName ? errors.cardName : undefined
            }
          />
          <InputGroup
            fullWidth
            isWidth
            border
            placeholder="Credit Card Number"
            name="creditCard"
            type="number"
            value={values.creditCard}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              errors.creditCard && touched.creditCard
                ? errors.creditCard
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
                name="expiry"
                type="text"
                value={values.expiry}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={
                  errors.expiry && touched.expiry ? errors.expiry : undefined
                }
              />
            </div>
            <div className="column">
              <InputGroup
                fullWidth
                isWidth
                border
                placeholder="CVV"
                name="cvv"
                type="number"
                value={values.cvv}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.cvv && touched.cvv ? errors.cvv : undefined}
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
  mapPropsToValues: () => ({
    country: '',
    address: '',
    city: '',
    state: '',
    postcode: '',
    cardName: '',
    creditCard: '',
    expiry: '',
    cvv: '',
    projectName: '',
    projectPlan: '',
  }),
  validationSchema: yup.object().shape({
    country: yup.string().required('Country is required!'),
    address: yup.string().required('Address is required!'),
    city: yup.string().required('City is required!'),
    state: yup.string().required('State is required!'),
    postcode: yup.number().required('Post Code is required!'),
    cardName: yup.string().required('Name is required!'),
    creditCard: yup.number().required('Credit Card Number is required!'),
    expiry: yup.string().required('This field is required!'),
    cvv: yup.number().required('CVV is required!'),
    projectName: yup.string().required('Project Summary is required!'),
    projectPlan: yup.string().required('This field is required!'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit(values).finally(() => {
      setSubmitting(false);
    });
  },
  displayName: 'ProjectSetupForm', // helps with React DevTools
})(ProjectSetupForm);
