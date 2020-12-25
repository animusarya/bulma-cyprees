import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components';

import { InputGroup, Button, ColorPicker, ReactDropdown } from '../elements';

const Container = styled.div`
  .dropdown {
    width: 20px;
  }
`;

const ColorContainer = styled.div`
  margin-left: 80px;
  padding-top: 10px;
`;

const ProjectSettingForm = (props) => {
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

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ height: '56px' }} />
      <br />
      <InputGroup
        fullWidth
        isWidth
        border
        isHorizontal
        label="Stars Colour:"
        errors={
          errors.starsColor && touched.starsColor
            ? errors.starsColor
            : undefined
        }>
        <ColorPicker
          name="starsColor"
          id="starsColor"
          label="Stars Colour"
          color={values.starsColor}
          selectColor={values.starsColor}
          onChange={(val) => setFieldValue('starsColor', val)}
        />
      </InputGroup>
      <InputGroup
        fullWidth
        isWidth
        border
        isHorizontal
        label="Review Title:"
        errors={
          errors.reviewTitleColor && touched.reviewTitleColor
            ? errors.reviewTitleColor
            : undefined
        }>
        <Container className="is-flex">
          <div className="dropdown">
            <ReactDropdown
              onChange={(value) =>
                setFieldValue('reviewTitleSize', value.value)
              }
              value={values.reviewTitleSize || '16'}
            />
          </div>
          <ColorContainer>
            <ColorPicker
              name="reviewTitleColor"
              id="reviewTitleColor"
              label="Review Title Colour"
              color={values.reviewTitleColor}
              selectColor={values.reviewTitleColor}
              onChange={(val) => setFieldValue('reviewTitleColor', val)}
            />
          </ColorContainer>
        </Container>
      </InputGroup>
      <InputGroup
        fullWidth
        isWidth
        border
        isHorizontal
        label="Review Body:"
        errors={
          errors.reviewBodyColor && touched.reviewBodyColor
            ? errors.reviewBodyColor
            : undefined
        }>
        <Container className="is-flex">
          <div className="dropdown">
            <ReactDropdown
              onChange={(value) => console.log('reviewBodySize', value.value)}
              value={values.reviewBodySize || '16'}
            />
          </div>
          <ColorContainer>
            <ColorPicker
              name="reviewBodyColor"
              id="reviewBodyColor"
              label="Review Body Colour"
              color={values.reviewBodyColor}
              selectColor={values.reviewBodyColor}
              onChange={(val) => setFieldValue('reviewBodyColor', val)}
            />
          </ColorContainer>
        </Container>
      </InputGroup>
      <InputGroup
        fullWidth
        isWidth
        border
        isHorizontal
        label="Author:"
        errors={
          errors.reviewAuthorColor && touched.reviewAuthorColor
            ? errors.reviewAuthorColor
            : undefined
        }>
        <Container className="is-flex">
          <div className="dropdown">
            <ReactDropdown
              onChange={(value) =>
                setFieldValue('reviewAuthorSize', value.value)
              }
              value={values.reviewAuthorSize || '16'}
            />
          </div>
          <ColorContainer>
            <ColorPicker
              name="reviewAuthorColor"
              id="reviewAuthorColor"
              label="Review Author Colour"
              color={values.reviewAuthorColor}
              selectColor={values.reviewAuthorColor}
              onChange={(val) => setFieldValue('reviewAuthorColor', val)}
            />
          </ColorContainer>
        </Container>
      </InputGroup>

      <InputGroup
        fullWidth
        isWidth
        border
        isHorizontal
        label="Buttons Background:"
        errors={
          errors.buttonsColor && touched.buttonsColor
            ? errors.buttonsColor
            : undefined
        }>
        <ColorPicker
          name="buttonsColor"
          id="buttonsColor"
          label="Buttons Colour"
          color={values.buttonsColor}
          selectColor={values.buttonsColor}
          onChange={(val) => setFieldValue('buttonsColor', val)}
        />
      </InputGroup>
      <InputGroup
        fullWidth
        isWidth
        border
        isHorizontal
        label="Buttons Text Colour:"
        errors={
          errors.buttonsTextColor && touched.buttonsTextColor
            ? errors.buttonsTextColor
            : undefined
        }>
        <ColorPicker
          name="buttonsTextColor"
          id="buttonsTextColor"
          label="Buttons Text Colour"
          color={values.buttonsTextColor}
          selectColor={values.buttonsTextColor}
          onChange={(val) => setFieldValue('buttonsTextColor', val)}
        />
      </InputGroup>

      <div className="button-field" style={{ marginTop: '2rem' }}>
        <Button disabled={isSubmitting}>Update</Button>
      </div>
    </form>
  );
};

ProjectSettingForm.propTypes = {
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
    starsColor: initialValues.starsColor || '',
    reviewTitleColor: initialValues.reviewTitleColor || '',
    reviewBodyColor: initialValues.reviewBodyColor || '',
    reviewAuthorColor: initialValues.reviewAuthorColor || '',
    buttonsColor: initialValues.buttonsColor || '',
    buttonsTextColor: initialValues.buttonsTextColor || '',
    reviewAuthorSize: initialValues.reviewAuthorSize || '',
    reviewTitleSize: initialValues.reviewTitleSize || '',
    reviewBodySize: initialValues.reviewBodySize || '',
  }),
  validationSchema: yup.object().shape({
    // name: yup.string().required('Name is required!'),
    // slug: yup.string().required('slug is required!'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit(values);
    setSubmitting(false);
  },
  displayName: 'ProjectSettingForm', // helps with React DevTools
})(ProjectSettingForm);
