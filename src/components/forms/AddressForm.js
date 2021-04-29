import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

// import { InputGroup, GoogleMap } from '../elements';
import { InputGroup, Button } from '../elements';

const AddressForm = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        label="Name"
        name="name"
        type="text"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.name && touched.name ? errors.name : undefined}
      />
      <InputGroup
        label="Store Number:"
        name="number"
        type="text"
        value={values.number}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.number && touched.number ? errors.number : undefined}
      />

      {/* <InputGroup
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
      */}
      <div className="mt-5">
        <Button primary onClick={handleSubmit}>
          <span className="has-text-weight-bold">Submit</span>
        </Button>
      </div>
    </form>
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
  mapPropsToValues: ({ initialValues }) => ({
    name: initialValues ? initialValues.name : '',
    number: initialValues ? initialValues.number : '',

    // addressLine1: '',
    // addressLine2: '',
    // city: '',
    // state: '',
    // postcode: '',
    // country: '',
  }),
  validationSchema: yup.object().shape({
    name: yup.string().required('Name is required!'),
    number: yup.string().required('Number is required!'),

    // addressLine1: yup.string().required('Address Line 1 is required!'),
    // addressLine2: yup.string(),
    // city: yup.string().required('City is required!'),
    // state: yup.string().required('State is required!'),
    // postcode: yup.string().required('Postcode is required!'),
    // country: yup.string().required('Country is required!'),
  }),

  handleSubmit: (values, { setSubmitting, resetForm, props }) => {
    // console.log('handle submit', values, props);
    props
      .onSubmit(values)
      .then(() => {
        setSubmitting(false);
        resetForm();
      })
      .catch(() => {
        setSubmitting(false);
      });
  },
  displayName: 'AddressForm', // helps with React DevTools
})(AddressForm);
