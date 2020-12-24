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
      <div style={{ height: '56px' }}>
        {/* <div className="button-field is-pulled-right">
          <Button disabled={isSubmitting}>Update</Button>
        </div> */}
      </div>
      <br />
      <InputGroup
        fullWidth
        isWidth
        border
        isHorizontal
        label="Stars Colour:"
        errors={
          errors.brandColor && touched.brandColor
            ? errors.brandColor
            : undefined
        }>
        <ColorPicker
          name="brandColor"
          id="brandColor"
          label="Brand Colour"
          color={values.brandColor}
          selectBrandColor={values.brandColor}
          onChange={(val) => setFieldValue('brandColor', val)}
        />
      </InputGroup>
      <InputGroup
        fullWidth
        isWidth
        border
        isHorizontal
        label="Review Title:"
        errors={
          errors.brandColor && touched.brandColor
            ? errors.brandColor
            : undefined
        }>
        <Container className="is-flex">
          <div className="dropdown">
            <ReactDropdown />
          </div>
          <ColorContainer>
            <ColorPicker
              name="brandColor"
              id="brandColor"
              label="Brand Colour"
              color={values.brandColor}
              selectBrandColor={values.brandColor}
              onChange={(val) => setFieldValue('brandColor', val)}
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
          errors.brandColor && touched.brandColor
            ? errors.brandColor
            : undefined
        }>
        <Container className="is-flex">
          <div className="dropdown">
            <ReactDropdown />
          </div>
          <ColorContainer>
            <ColorPicker
              name="brandColor"
              id="brandColor"
              label="Brand Colour"
              color={values.brandColor}
              selectBrandColor={values.brandColor}
              onChange={(val) => setFieldValue('brandColor', val)}
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
          errors.brandColor && touched.brandColor
            ? errors.brandColor
            : undefined
        }>
        <Container className="is-flex">
          <div className="dropdown">
            <ReactDropdown />
          </div>
          <ColorContainer>
            <ColorPicker
              name="brandColor"
              id="brandColor"
              label="Brand Colour"
              color={values.brandColor}
              selectBrandColor={values.brandColor}
              onChange={(val) => setFieldValue('brandColor', val)}
            />
          </ColorContainer>
        </Container>
      </InputGroup>

      <InputGroup
        fullWidth
        isWidth
        border
        isHorizontal
        label="Buttons Colour:"
        errors={
          errors.brandColor && touched.brandColor
            ? errors.brandColor
            : undefined
        }>
        <ColorPicker
          name="brandColor"
          id="brandColor"
          label="Brand Colour"
          color={values.brandColor}
          selectBrandColor={values.brandColor}
          onChange={(val) => setFieldValue('brandColor', val)}
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
    brandColor: initialValues.brandColor || '',
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
