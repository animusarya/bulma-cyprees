import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { InputGroup, Button, Select } from '../elements';

const groupList = [
  { id: 1, value: 'Company One' },
  { id: 2, value: 'Company Two' },
  { id: 3, value: 'Company Three' },
  { id: 4, value: 'Company Four' },
];

const AddUserForm = (props) => {
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
        label="Username"
        name="userName"
        type="text"
        value={values.userName}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.userName && touched.userName ? errors.userName : undefined
        }
      />
      <Select
        label="Group"
        name="group"
        options={groupList}
        type="text"
        value={values.group}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.group && touched.group ? errors.group : undefined}
      />
      <InputGroup
        label="Email Address"
        name="email"
        type="text"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.email && touched.email ? errors.email : undefined}
      />

      <InputGroup
        label="Screen Name"
        name="screenName"
        type="text"
        value={values.screenName}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.screenName && touched.screenName
            ? errors.screenName
            : undefined
        }
      />

      <InputGroup
        label="Telephone"
        name="telephone"
        type="text"
        value={values.telephone}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.telephone && touched.telephone ? errors.telephone : undefined
        }
      />
      <InputGroup
        label="Registration Number"
        name="registrationNumber"
        type="text"
        value={values.registrationNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.registrationNumber && touched.registrationNumber
            ? errors.registrationNumber
            : undefined
        }
      />
      <InputGroup
        label="VAT Number"
        name="vatNumber"
        type="text"
        value={values.vatNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.vatNumber && touched.vatNumber ? errors.vatNumber : undefined
        }
      />
      <InputGroup
        label="Accounts Name"
        name="accountName"
        type="text"
        value={values.accountName}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.accountName && touched.accountName
            ? errors.accountName
            : undefined
        }
      />
      <InputGroup
        label="Password"
        name="password"
        type="text"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.password && touched.password ? errors.password : undefined
        }
      />
      <div className="mb-3 mt-5">
        <Button primary type="submit" disabled={isSubmitting}>
          <span className="has-text-weight-bold">Submit</span>
        </Button>
      </div>
    </form>
  );
};

AddUserForm.propTypes = {
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
    userName: '',
    group: '',
    email: '',
    password: '',
    screenName: '',
    telephone: '',
    registrationNumber: '',
    vatNumber: '',
    accountName: '',
  }),
  validationSchema: yup.object().shape({
    userName: yup.string().required('UserName is required!'),
    group: yup.string().required('Group is required!'),
    email: yup.string().required('Email is required!'),
    password: yup.string().required('Password is required!'),
    screenName: yup.string().required('Screen Name is required!'),
    telephone: yup.string().required('telephone is required!'),
    registrationNumber: yup
      .string()
      .required('Registration Number is required!'),
    vatNumber: yup.string().required('VAT Number is required!'),
    accountName: yup.string().required('Account Name is required!'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    props.onSubmit(values).then(() => {
      setSubmitting(false);
    });
  },
  displayName: 'AddUserForm', // helps with React DevTools
})(AddUserForm);
