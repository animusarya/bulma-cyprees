import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';
import Cleave from 'cleave.js/react';

import { InputGroup, Button, TextAreaGroup, ColorPicker } from './elements';

const ProjectSettingForm = (props) => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ height: '56px' }}>
        <div className="button-field is-pulled-right">
          <Button disabled={isSubmitting}>Update</Button>
        </div>
      </div>
      <br />
      <InputGroup
        fullWidth
        isWidth
        border
        isHorizontal
        groupWidth
        label="Project Name"
        errors={errors.name && touched.name ? errors.name : undefined}
        placeholder="colliers"
        name="name"
        id="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        className="input is-shadowless"
      />
      <InputGroup
        fullWidth
        isWidth
        border
        isHorizontal
        label="Project URL Slug"
        errors={errors.slug && touched.slug ? errors.slug : undefined}>
        <Cleave
          placeholder="colliers"
          name="slug"
          id="slug"
          value={values.slug}
          onChange={handleChange}
          onBlur={handleBlur}
          options={{ prefix: 'website-reviews.online/' }}
          className="input is-shadowless"
        />
      </InputGroup>
      <InputGroup
        fullWidth
        isWidth
        border
        isHorizontal
        label="Custom Domain"
        placeholder="www.projectname.co.uk"
        name="customDomain"
        value={values.customDomain}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.customDomain && touched.customDomain
            ? errors.customDomain
            : undefined
        }
      />
      <InputGroup
        fullWidth
        isWidth
        border
        isHorizontal
        label="Brand Colour"
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
      <TextAreaGroup
        fullWidth
        isWidth
        border
        isHorizontal
        label="Non-Disclosure Agreement"
        name="nda"
        className="textarea"
        value={values.nda}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.nda && touched.nda ? errors.nda : undefined}
      />

      <div>
        {/* <label className="label">Footer contact information</label> */}
        <div className="columns" style={{ marginTop: '1rem' }}>
          <div className="column">
            <InputGroup
              fullWidth
              isWidth
              border
              label="Contact Name"
              name="contactName"
              value={values.contactName}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={
                errors.contactName && touched.contactName
                  ? errors.contactName
                  : undefined
              }
            />
          </div>
          <div className="column">
            <InputGroup
              fullWidth
              isWidth
              border
              label="Contact Telephone"
              name="contactTelephone"
              value={values.contactTelephone}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={
                errors.contactTelephone && touched.contactTelephone
                  ? errors.contactTelephone
                  : undefined
              }
            />
          </div>
          <div className="column">
            <InputGroup
              fullWidth
              isWidth
              border
              label="Contact Email"
              name="contactEmail"
              value={values.contactEmail}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={
                errors.contactEmail && touched.contactEmail
                  ? errors.contactEmail
                  : undefined
              }
            />
          </div>
        </div>
        <div className="disclaimer-note">
          <small>
            This information will show in the client view above in the footer
            disclaimer
          </small>
        </div>
        <TextAreaGroup
          fullWidth
          isWidth
          border
          label="Footer Disclaimer"
          name="disclaimer"
          className="textarea"
          value={values.disclaimer}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={
            errors.disclaimer && touched.disclaimer
              ? errors.disclaimer
              : undefined
          }
        />
      </div>

      <div
        className="button-field is-pulled-right"
        style={{ marginTop: '2rem' }}>
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
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default withFormik({
  mapPropsToValues: ({ initialValues }) => ({
    name: initialValues.name || '',
    slug: initialValues.slug || '',
    customDomain: initialValues.customDomain || '',
    disclaimer: initialValues.disclaimer || '',
    nda: initialValues.nda || '',
    brandColor: initialValues.brandColor || '',
    contactName: initialValues.contactName || '',
    contactTelephone: initialValues.contactTelephone || '',
    contactEmail: initialValues.contactEmail || '',
  }),
  validationSchema: yup.object().shape({
    name: yup.string().required('Name is required!'),
    slug: yup.string().required('slug is required!'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit(values);
    setSubmitting(false);
  },
  displayName: 'ProjectSettingForm', // helps with React DevTools
})(ProjectSettingForm);
