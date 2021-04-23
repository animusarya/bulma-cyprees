import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { InputGroup, GoogleMap } from '../elements';

const AddressForm = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    onChange,
    handleSubmit,
  } = props;
  useEffect(() => {
    onChange(values);
    handleSubmit();
  }, [values]);

  return (
    <div>
      <InputGroup
        label="Address Line 1"
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
        label="Address Line 2"
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
        label="City"
        name="city"
        type="text"
        value={values.city}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.city && touched.city ? errors.city : undefined}
      />
      <InputGroup
        label="State"
        name="state"
        type="text"
        value={values.state}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.state && touched.state ? errors.state : undefined}
      />
      <InputGroup
        label="Post Code"
        name="postcode"
        type="text"
        value={values.postcode}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.postcode && touched.postcode ? errors.postcode : undefined
        }
      />
      <InputGroup
        label="Country"
        name="country"
        type="text"
        value={values.country}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.country && touched.country ? errors.country : undefined}
      />

      <GoogleMap label="Location" />
    </div>
  );
};

AddressForm.propTypes = {
  values: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};

export default withFormik({
  mapPropsToValues: () => ({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postcode: '',
    country: '',
  }),
  validationSchema: yup.object().shape({
    addressLine1: yup.string().required('Address Line 1 is required!'),
    addressLine2: yup.string(),
    city: yup.string().required('City is required!'),
    state: yup.string().required('State is required!'),
    postcode: yup.string().required('Postcode is required!'),
    country: yup.string().required('Country is required!'),
  }),

  displayName: 'AddressForm', // helps with React DevTools
})(AddressForm);
