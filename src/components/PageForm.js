import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { InputGroup, SelectGroup, Button } from './elements';

const PageForm = props => {
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
        isHorizontal
        isWidth
        border
        fullWidth
        name="name"
        label="Page Name"
        placeholder=""
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.name && touched.name ? errors.name : undefined}
      />
      <SelectGroup
        isHorizontal
        fullWidth
        isWidth
        border
        label="Page Type"
        placeholder=""
        name="type"
        value={values.type}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.type && touched.type ? errors.type : undefined}
        options={[
          { value: 'dataroom', title: 'Dataroom' },
          { value: 'content', title: 'Content' },
        ]}
      />
      <div className="field">
        <div className="is-pulled-right">
          <Button disabled={isSubmitting}>Create Page</Button>
        </div>
      </div>
    </form>
  );
};

PageForm.propTypes = {
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
    type: '',
  }),
  validationSchema: yup.object().shape({
    name: yup.string().required('Duration is required!'),
    type: yup.string().required('Type is required!'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit(values).finally(() => {
      setSubmitting(false);
    });
  },
  displayName: 'PageForm', // helps with React DevTools
})(PageForm);
