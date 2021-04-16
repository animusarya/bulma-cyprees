import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { Select, Heading } from '../elements';

const FormWrapper = styled.form`
  border: 1px solid ${(props) => props.theme.borderColor};
  box-shadow: none !important;
`;

const riskAssessmentList = [
  { id: 1, value: '-- Select --' },
  { id: 2, value: 'Access & Egress From Site' },
  {
    id: 3,
    value:
      'Acceptable Unlikely to cause injury, risk to health or property damage.',
  },
  {
    id: 4,
    value:
      'Acceptable Unlikely to cause injury, risk to health or property damage but adhere to all control measures.',
  },
  {
    id: 5,
    value:
      'Acceptable, but possible risk, strict control measures must be in place and supervision',
  },
];

const RiskAssessment = (props) => {
  const {
    values,
    touched,
    errors,
    // isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;

  return (
    <FormWrapper className="box" onSubmit={handleSubmit}>
      <Heading>Risk Assessment</Heading>
      <Select
        label="Access & Egress From Site"
        name="accessSiteEgress"
        options={riskAssessmentList}
        type="text"
        value={values.accessSiteEgress}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.accessSiteEgress && touched.accessSiteEgress
            ? errors.accessSiteEgress
            : undefined
        }
      />
      <Select
        label="Working At Height"
        name="workingAtHeight"
        options={riskAssessmentList}
        type="text"
        value={values.workingAtHeight}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          errors.workingAtHeight && touched.workingAtHeight
            ? errors.workingAtHeight
            : undefined
        }
      />
      <Select
        label="Use Of Lifting/pulling Gear"
        name="gears"
        options={riskAssessmentList}
        type="text"
        value={values.gears}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.gears && touched.gears ? errors.gears : undefined}
      />
    </FormWrapper>
  );
};

RiskAssessment.propTypes = {
  values: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  // isSubmitting: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default withFormik({
  mapPropsToValues: () => ({
    accessSiteEgress: '',
    workingAtHeight: '',
    gears: '',
  }),
  validationSchema: yup.object().shape({
    accessSiteEgress: yup.string(),
    workingAtHeight: yup.string(),
    gears: yup.string(),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    props.onSubmit(values).then(() => {
      setSubmitting(false);
    });
  },
  displayName: 'RiskAssessment', // helps with React DevTools
})(RiskAssessment);
