import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { InputGroup, Button } from '../elements';

const DiscountForm = (props) => {
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
    <form onSubmit={handleSubmit}>
      <InputGroup
        isWidth
        fullWidth
        border
        isHorizontal
        label="Discount Title"
        placeholder="Summer Discount"
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.name && touched.name ? errors.name : undefined}
      />
      <InputGroup
        fullWidth
        isWidth
        border
        isHorizontal
        label="Discount Code"
        placeholder="SAVE50"
        name="code"
        value={values.code}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.code && touched.code ? errors.code : undefined}
      />
      <InputGroup
        fullWidth
        isWidth
        border
        isHorizontal
        type="number"
        label="Percentage"
        placeholder="50"
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
      <div className="field">
        <div className="is-pulled-right">
          <Button disabled={isSubmitting}>Submit</Button>
        </div>
      </div>
    </form>
  );
};

DiscountForm.propTypes = {
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
    code: '',
    percentage: '',
  }),
  validationSchema: yup.object().shape({
    name: yup.string().required('Name is required!'),
    code: yup.string().required('Code is required!'),
    percentage: yup.string().required('Percentage is required!'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit(values).then(() => {
      setSubmitting(false);
    });
  },
  displayName: 'DiscountForm', // helps with React DevTools
})(DiscountForm);
