import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components';

import { InputGroup, Button, SelectGroup } from './elements';

const Form = styled.form`
  input {
    border-color: ${propsInput => propsInput.theme.primaryColor};
    box-shadow: none;
    :hover {
      border-color: ${propsInput => propsInput.theme.primaryColor};
    }
  }
  .columns {
    margin-top: 1.5rem;
  }
`;

const ProjectSetupForm = props => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    packages,
  } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup
        fullWidth
        isWidth
        border
        label="Project Name"
        placeholder="Project Arden"
        name="name"
        type="text"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.name && touched.name ? errors.name : undefined}
      />
      <InputGroup
        fullWidth
        isWidth
        border
        label="Default URL"
        name="slug"
        value={values.slug}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.slug && touched.slug ? errors.slug : undefined}
      />
      <InputGroup
        fullWidth
        border
        type="text"
        label="Custom Domain Name"
        placeholder="www.projectname.co.uk"
        name="customUrl"
        value={values.customUrl}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.customUrl && touched.customUrl ? errors.customUrl : undefined
        }
      />
      {/* later on this field will be replaced with select field */}
      <SelectGroup
        fullWidth
        isWidth
        border
        label="Project Plan"
        placeholder="Monthly | £30 | 6Months (£180) | Annually (£360)"
        name="subscriptionId"
        value={values.subscriptionId}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.subscriptionId && touched.subscriptionId
            ? errors.subscriptionId
            : undefined
        }
        options={
          packages
            ? packages.map(item => ({
                value: item.id,
                title: `${item.name} - ${item.durationInMonths} months (£${item.price})`,
              }))
            : []
        }
      />
      <div className="field">
        <div className="is-pulled-right">
          <Button disabled={isSubmitting}>Continue</Button>
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
    name: '',
    slug: '',
    customUrl: '',
    subscriptionId: '',
  }),
  validationSchema: yup.object().shape({
    name: yup.string().required('Name is required!'),
    slug: yup.string().required('Default URL is required!'),
    customUrl: yup.string().required('Custom URL is required!'),
    subscriptionId: yup.string().required('Subscription is required!'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit(values);
    setSubmitting(false);
  },
  displayName: 'ProjectSetupForm', // helps with React DevTools
})(ProjectSetupForm);
