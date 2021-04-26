import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { withFormik, FieldArray } from 'formik';
import * as yup from 'yup';

import { InputGroup, Button, TextArea, Heading } from '../elements';
import { AddLocationModal } from '../modal';

const AddCustomerForm = (props) => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;

  const [locationVariant, setLocationVariant] = useState('');

  const [openModel, setOpenModel] = useState(false);
  console.log(values.locations);
  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        label="Company Name:"
        name="name"
        type="text"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.name && touched.name ? errors.name : undefined}
      />
      <InputGroup
        label="Account Email"
        name="accountsEmail"
        type="text"
        value={values.accountsEmail}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.accountsEmail && touched.accountsEmail
            ? errors.accountsEmail
            : undefined
        }
      />
      <InputGroup
        label="Jobs Email"
        name="jobsEmail"
        type="text"
        value={values.jobsEmail}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.jobsEmail && touched.jobsEmail ? errors.jobsEmail : undefined
        }
      />

      {/* Add Location Section */}

      <div className="box box-wrapper">
        <Heading small>Add Location</Heading>
        <button
          onClick={() => setOpenModel(!openModel)}
          className="button is-small is-primary mb-4"
          type="button">
          Add Location
        </button>
        <FieldArray
          name="locations"
          render={(arrayHelpers) => (
            <>
              <AddLocationModal
                locationVariant={locationVariant}
                handleBlur={handleBlur}
                values={values}
                arrayHelpers={arrayHelpers}
                setLocationVariant={setLocationVariant}
              />
              <div className="table-container">
                <table className="table is-fullwidth">
                  <tbody>
                    {values.locations.map((val, { index }) => (
                      <tr key={index}>
                        <td> {val.name}</td>
                        <td> {val.number}</td>
                        <td> {val.name}</td>
                        <td> {val.name}</td>
                        <td> {val.name}</td>
                        <td> {val.name}</td>

                        <td>
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                            className="button is-small is-danger is-outlined">
                            <span>Delete</span>
                            <span className="icon is-small">
                              <i className="fas fa-times" />
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        />

        <FieldArray
          name="locations"
          render={(arrayHelpers) => (
            <AddLocationModal
              isActive={openModel}
              onClose={() => setOpenModel(!openModel)}
              onSubmit={(data) => {
                arrayHelpers.push(data);
                setOpenModel(!openModel);
              }}
            />
          )}
        />
      </div>
      <InputGroup
        label="Payment Terms"
        name="paymentTerms"
        type="text"
        value={values.paymentTerms}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.paymentTerms && touched.paymentTerms
            ? errors.paymentTerms
            : undefined
        }
      />
      <TextArea
        label="Internal Notes"
        name="internalNotes"
        type="text"
        value={values.internalNotes}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.internalNotes && touched.internalNotes
            ? errors.internalNotes
            : undefined
        }
      />
      <div className="mb-3 mt-4">
        <Button primary type="submit" loading={isSubmitting}>
          <span className="has-text-weight-bold">Submit</span>
        </Button>
      </div>
    </form>
  );
};

AddCustomerForm.propTypes = {
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
    name: initialValues ? initialValues.name : '',
    accountsEmail: initialValues ? initialValues.accountsEmail : '',
    jobsEmail: initialValues ? initialValues.jobsEmail : '',
    internalNotes: initialValues ? initialValues.internalNotes : '',
    paymentTerms: initialValues ? initialValues.paymentTerms : '',
    locations: [],
  }),
  validationSchema: yup.object().shape({
    name: yup.string().required('Company Name is required!'),
    accountsEmail: yup
      .string()
      .email('Invalid email address')
      .required('Account Email is required!'),
    jobsEmail: yup
      .string()
      .email('Invalid email address')
      .required('Jobs Email is required!'),
    paymentTerms: yup.string().required('Payment Terms is required!'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    console.log(values);
    props.onSubmit(values).then(() => {
      setSubmitting(false);
    });
  },
  displayName: 'AddCustomerForm', // helps with React DevTools
})(AddCustomerForm);
