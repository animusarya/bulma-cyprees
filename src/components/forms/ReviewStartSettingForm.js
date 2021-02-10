import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components';

import { InputGroup, Button } from '../elements';
import StartsDropdown from '../StartsDropdown';

const Container = styled.div`
  .dropdown {
    width: 20px;
  }
`;

const ReviewStarSettingForm = (props) => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    // handleChange,
    // handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;
  // console.log(values, 'values');

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        fullWidth
        isWidth
        border
        isHorizontal
        label="Select rating"
        errors={
          errors.displayRating && touched.displayRating
            ? errors.displayRating
            : undefined
        }>
        <Container className="is-flex">
          <div className="dropdown">
            <StartsDropdown
              starts
              onChange={(value) => setFieldValue('displayRating', value.value)}
              value={values.displayRating || '1'}
            />
          </div>
        </Container>
      </InputGroup>
      <p className="is-size-7">
        * This will display review above selected rating
      </p>

      <div className="button-field" style={{ marginTop: '2rem' }}>
        <Button disabled={isSubmitting}>Update</Button>
      </div>
    </form>
  );
};

ReviewStarSettingForm.propTypes = {
  values: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  // handleChange: PropTypes.func.isRequired,
  // handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default withFormik({
  mapPropsToValues: ({ initialValues }) => ({
    displayRating: initialValues.displayRating || '',
  }),
  validationSchema: yup.object().shape({
    // name: yup.string().required('Name is required!'),
    // slug: yup.string().required('slug is required!'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit({
      displayRating: parseFloat(values.displayRating),
    });
    setSubmitting(false);
  },
  displayName: 'ReviewStarSettingForm', // helps with React DevTools
})(ReviewStarSettingForm);
