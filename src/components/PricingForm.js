import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { InputGroup, Button } from './elements';

const PricingForm = props => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        name="name"
        label="Duration"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.name && touched.name ? errors.name : undefined} />
      <InputGroup
        name="price"
        label="price"
        value={values.price}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.price && touched.price ? errors.price : undefined} />
      <div className="field">
        <div className="is-pulled-right">
          <Button disabled={isSubmitting}>
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};

PricingForm.propTypes = {
  values: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default withFormik({
  mapPropsToValues: () => ({
    name: '',
    price: ''
  }),
  validationSchema: yup.object().shape({
    name: yup.string().required('Duration is required!'),
    price: yup.string().required('Price is required!')
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit(values).finally(() => {
      setSubmitting(false);
    });
  },
  displayName: 'PricingForm' // helps with React DevTools
})(PricingForm);
